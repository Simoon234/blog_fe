export interface BlogInterface {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    photo: string;
    author: string;
    category: string;
    user: User
}


export interface User {
    id: string;
    email: string
    avatarUrl: string;
    authorNickName: string;
}

export interface CategoryInterface {
    data: BlogInterface[];
    category: string;
}