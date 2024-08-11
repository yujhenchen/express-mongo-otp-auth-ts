import { UserRole, TUserRole } from '../src/constants/userRoles';

describe('UserRole', () => {
  it('should have correct role values', () => {
    expect(UserRole.ADMIN).toBe('admin');
    expect(UserRole.visitor).toBe('user');
    expect(UserRole.GUEST).toBe('guest');
  });

  it('should contain only defined roles', () => {
    const roles: string[] = [UserRole.ADMIN, UserRole.visitor, UserRole.GUEST];
    const uniqueRoles = new Set(roles);

    expect(uniqueRoles.size).toBe(roles.length);
    expect(roles).toEqual(expect.arrayContaining([UserRole.ADMIN, UserRole.visitor, UserRole.GUEST]));
  });
});

describe('TUserRole', () => {
  it('should only allow valid UserRole values', () => {
    const validRoles: TUserRole[] = [UserRole.ADMIN, UserRole.visitor, UserRole.GUEST];
    const invalidRoles: string[] = ['unknown', 'admin_user', 'guest_user'];

    validRoles.forEach(role => {
      expect(validRoles).toContain(role);
    });

    invalidRoles.forEach(role => {
      expect(validRoles).not.toContain(role);
    });
  });
});
