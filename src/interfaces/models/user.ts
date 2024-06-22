export interface Tokens {
    kind: string;
    accessToken: string;
    tokenSecret?: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    // role: 'admin' | 'visitor';
    createdAt: Date;
}

export default IUser;
