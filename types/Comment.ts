import type { Project } from "./Project";
import type { User } from "./User";

type Comment = {
    id: string;
    content: string;
    user: User;
    userId: string;
    project: Project;
    projectId: string;
    createdAt: Date;
}

type FormData = {
    content: string;
    userId: string;
    projectId: string;
}

type ErrorData = {
    content: string;
    userId: string;
    projectId: string;
}


export type { Comment, FormData, ErrorData };