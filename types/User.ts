import type { Comment } from "./Comment";
import type { Project } from "./Project";

type Role = 'ADMIN' | 'USER';

type User = {
    id: string;
    username: string;
    email: string;
    role: Role;
    // comments: Comment[];
    // projects: Project[];
    createdAt: Date;
}


type FormData = {
    username: string;
    email: string;
    role: Role
}

export type { User , FormData };