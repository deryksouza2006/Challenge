// hooks/useLembretes.ts - VERSÃO CORRIGIDA
import { useState, useEffect } from 'react';
import { lembreteService, type LembreteRequestDTO, type LembreteResponseDTO } from '../service/lembreteService';
import { useAuth } from '../context/AuthContext';

export const useLembretes = () => {
  const [lembretes, setLembretes] = useState<LembreteResponseDTO[]>([]);
  const [lembretesAtivos, setLembretesAtivos] = useState<LembreteResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const carregarLembretes = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      const todosLembretes = await lembreteService.listarPorUsuario(user.id);
      
      setLembretes(todosLembretes);
      
      // Filtrar ativos (concluido = false)
      const ativos = todosLembretes.filter(l => !l.concluido);
      setLembretesAtivos(ativos);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar lembretes');
      console.error('Erro ao carregar lembretes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Interface para os dados do formulário (sem usuarioId e titulo)
  interface FormData {
    nomeMedico: string;
    especialidade: string;
    dataConsulta: string;
    horaConsulta: string;
    localConsulta: string;
    observacoes?: string;
  }

  const adicionarLembrete = async (dados: FormData) => {
    if (!user) throw new Error('Usuário não autenticado');
    
    setLoading(true);
    try {
      // Cria o lembrete com título gerado automaticamente
      const lembreteCompleto: LembreteRequestDTO = {
        ...dados,
        titulo: `Consulta com ${dados.nomeMedico}`,
        usuarioId: user.id
      };

      console.log('Criando lembrete:', lembreteCompleto);
      
      const novoLembrete = await lembreteService.criarLembrete(lembreteCompleto);
      
      console.log('Lembrete criado:', novoLembrete);
      
      // RECARREGAR a lista completa do servidor
      await carregarLembretes();
      
      return novoLembrete;
    } catch (err) {
      console.error('Erro ao criar lembrete:', err);
      throw new Error(err instanceof Error ? err.message : 'Erro ao criar lembrete');
    } finally {
      setLoading(false);
    }
  };

  const excluirLembrete = async (id: number) => {
    setLoading(true);
    try {
      await lembreteService.excluirLembrete(id);
      
      await carregarLembretes();
      
    } catch (err) {
      console.error('Erro ao excluir lembrete:', err);
      throw new Error(err instanceof Error ? err.message : 'Erro ao excluir lembrete');
    } finally {
      setLoading(false);
    }
  };

  const marcarComoConcluido = async (id: number) => {
    setLoading(true);
    try {
      await lembreteService.marcarComoConcluido(id);
      
      await carregarLembretes();
      
    } catch (err) {
      console.error('Erro ao marcar lembrete como concluído:', err);
      throw new Error(err instanceof Error ? err.message : 'Erro ao marcar lembrete como concluído');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarLembretes();
  }, [user]);

  return {
    lembretes,
    lembretesAtivos,
    loading,
    error,
    adicionarLembrete,
    excluirLembrete,
    marcarComoConcluido,
    recarregarLembretes: carregarLembretes
  };
};
