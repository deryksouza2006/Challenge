const API_BASE_URL = "https://api-completa-fexc.onrender.com";

// Definição do DTO para o envio de dados ao backend
export interface LembreteRequestDTO {
    usuarioId: number;
    titulo: string;
    nomeMedico: string;
    especialidade: string;
    dataConsulta: string;
    horaConsulta: string;
    localConsulta: string;
    observacoes?: string;
}

// Definição da resposta do backend para o lembrete criado
export interface LembreteResponseDTO {
    id: number;
    usuarioId: number;
    titulo: string;
    nomeMedico: string;
    especialidade: string;
    dataConsulta: string;
    horaConsulta: string;
    localConsulta: string;
    observacoes?: string;
    concluido: boolean;
    dataCriacao: string;
}

class LembreteService {
    
    // Função para pegar o token de autenticação armazenado no localStorage
    private getAuthToken(): string | null {
        const token = localStorage.getItem('authToken');
        return token;
    }

    // Função que lida com requisições HTTP, incluindo autenticação
    private async fetchWithAuth(url: string, options: RequestInit = {}) {
        const token = this.getAuthToken();
        
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                let errorText = '';
                try {
                    errorText = await response.text();
                } catch (e) {
                    errorText = `Não foi possível ler resposta: ${e}`;
                }
                throw new Error(errorText || `Erro HTTP: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    // Função para listar todos os lembretes de um usuário
    async listarPorUsuario(usuarioId: number): Promise<LembreteResponseDTO[]> {
        const response = await this.fetchWithAuth(
            `${API_BASE_URL}/lembretes/usuario/${usuarioId}`
        );
        
        return response;
    }

    // Função para listar lembretes ativos (não concluídos) de um usuário
    async listarAtivosPorUsuario(usuarioId: number): Promise<LembreteResponseDTO[]> {
        const response = await this.fetchWithAuth(
            `${API_BASE_URL}/lembretes/usuario/${usuarioId}/ativos`
        );
        
        return response;
    }

    // Função para criar um novo lembrete
    async criarLembrete(lembrete: LembreteRequestDTO): Promise<LembreteResponseDTO> {
        const bodyData = {
            titulo: lembrete.titulo,
            nomeMedico: lembrete.nomeMedico,
            especialidade: lembrete.especialidade,
            dataConsulta: lembrete.dataConsulta,
            horaConsulta: lembrete.horaConsulta,
            localConsulta: lembrete.localConsulta,
            observacoes: lembrete.observacoes || "",
            usuarioId: lembrete.usuarioId
        };

        console.log('Enviando lembrete:', bodyData);

        const response = await this.fetchWithAuth(`${API_BASE_URL}/lembretes`, {
            method: "POST",
            body: JSON.stringify(bodyData),
        });

        console.log('Resposta do servidor:', response);
        return response;
    }

    // Função para atualizar um lembrete existente
    async atualizarLembrete(id: number, lembrete: LembreteRequestDTO): Promise<LembreteResponseDTO> {
        const bodyData = {
            titulo: lembrete.titulo,
            nomeMedico: lembrete.nomeMedico,
            especialidade: lembrete.especialidade,
            dataConsulta: lembrete.dataConsulta,
            horaConsulta: lembrete.horaConsulta,
            localConsulta: lembrete.localConsulta,
            observacoes: lembrete.observacoes || "",
            usuarioId: lembrete.usuarioId
        };

        const response = await this.fetchWithAuth(`${API_BASE_URL}/lembretes/${id}`, {
            method: "PUT",
            body: JSON.stringify(bodyData),
        });

        return response;
    }

    // Função para excluir um lembrete
    async excluirLembrete(id: number): Promise<void> {
        await this.fetchWithAuth(`${API_BASE_URL}/lembretes/${id}`, {
            method: "DELETE",
        });
    }

    // Função para marcar um lembrete como concluído
    async marcarComoConcluido(id: number): Promise<void> {
        await this.fetchWithAuth(`${API_BASE_URL}/lembretes/${id}/concluir`, {
            method: "PUT",
        });
    }
}

export const lembreteService = new LembreteService();
