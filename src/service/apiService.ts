// services/apiService.ts - Versão simplificada
const API_BASE_URL = "https://api-completa-fexc.onrender.com";

// Função para obter o token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Interceptador para adicionar token
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

// Mantendo a função handleResponse original
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData = { message: `Erro HTTP: ${response.status} ${response.statusText}` };
    try {
      errorData = await response.json();
    } catch (e) {
      // Ignora se não for JSON
    }
    throw new Error(errorData.message || `Erro na requisição: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }
  
  return {} as T;
}

// Atualizando as funções para usar fetchWithAuth
export async function get<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetchWithAuth(url, {
    method: "GET",
  });
  return handleResponse<T>(response);
}

export async function post<T>(endpoint: string, data: any): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

export async function put<T>(endpoint: string, data: any): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetchWithAuth(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

export async function del<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetchWithAuth(url, {
    method: "DELETE",
  });
  return handleResponse<T>(response);
}