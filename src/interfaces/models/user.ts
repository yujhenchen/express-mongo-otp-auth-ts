export interface Tokens {
    kind: string;
    accessToken: string;
    tokenSecret?: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'visitor';
}

export default IUser;
