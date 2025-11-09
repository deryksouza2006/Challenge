// services/authService.ts
const API_BASE_URL = "https://api-completa-fexc.onrender.com";

export interface LoginRequest {
    email: string;
    senha: string;
}

export interface RegisterRequest {
    nome: string;
    email: string;
    senha: string;
}

export interface AuthResponse {
    token: string;
    user: UserDTO;
}

export interface UserDTO {
    id: number;
    nome: string;
    email: string;
}

class AuthService {
    
    async login(request: LoginRequest): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao fazer login");
        }

        return response.json();
    }

    async register(request: RegisterRequest): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao fazer cadastro");
        }

        return response.json();
    }
}

export const authService = new AuthService();