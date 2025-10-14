export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // In a real application, avoid storing plain passwords
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}