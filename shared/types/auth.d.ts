// shared/types/auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
    createdAt: Date;
  }
}

export {};