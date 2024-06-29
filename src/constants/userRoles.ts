export const UserRole = {
    ADMIN: 'admin',
    visitor: 'user',
    GUEST: 'guest'
} as const;

export type TUserRole = typeof UserRole[keyof typeof UserRole];
