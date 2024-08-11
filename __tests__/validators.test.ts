import {
    signUpSchema,
    signInSchema,
    signOutSchema,
    updateUserSchema,
    changeRoleSchema,
    sendOtpSchema,
  } from '../src/middleware/validators'; 
  import { UserRole } from '../src/constants/userRoles';
  
  describe('Validation Schemas', () => {
    describe('signUpSchema', () => {
      it('should validate a valid sign-up input', () => {
        const validInput = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'Password123!',
          repeatPassword: 'Password123!',
        };
  
        const { error } = signUpSchema.validate(validInput);
        expect(error).toBeUndefined();
      });
  
      it('should invalidate a sign-up input with an invalid email', () => {
        const invalidInput = {
          name: 'John Doe',
          email: 'invalidemail',
          password: 'Password123!',
          repeatPassword: 'Password123!',
        };
  
        const { error } = signUpSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
  
      it('should invalidate a sign-up input with a weak password', () => {
        const invalidInput = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'weakpass',
          repeatPassword: 'weakpass',
        };
  
        const { error } = signUpSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
  
      it('should invalidate a sign-up input when passwords do not match', () => {
        const invalidInput = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'Password123!',
          repeatPassword: 'Different123!',
        };
  
        const { error } = signUpSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
    });
  
    describe('signInSchema', () => {
      it('should validate a valid sign-in input', () => {
        const validInput = {
          email: 'johndoe@example.com',
          password: 'Password123!',
        };
  
        const { error } = signInSchema.validate(validInput);
        expect(error).toBeUndefined();
      });
  
      it('should invalidate a sign-in input with an invalid email', () => {
        const invalidInput = {
          email: 'invalidemail',
          password: 'Password123!',
        };
  
        const { error } = signInSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
  
      it('should invalidate a sign-in input with a weak password', () => {
        const invalidInput = {
          email: 'johndoe@example.com',
          password: 'weakpass',
        };
  
        const { error } = signInSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
    });
  
    describe('signOutSchema', () => {
      it('should validate a valid sign-out input', () => {
        const validInput = {
          name: 'John Doe',
          token: 'sometoken',
        };
  
        const { error } = signOutSchema.validate(validInput);
        expect(error).toBeUndefined();
      });
  
      it('should invalidate a sign-out input with a short name', () => {
        const invalidInput = {
          name: 'JD',
          token: 'sometoken',
        };
  
        const { error } = signOutSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
  
      it('should invalidate a sign-out input without a token', () => {
        const invalidInput = {
          name: 'John Doe',
        };
  
        const { error } = signOutSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
    });
  
    describe('updateUserSchema', () => {
      it('should validate a valid update user input', () => {
        const validInput = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'Password123!',
        };
  
        const { error } = updateUserSchema.validate(validInput);
        expect(error).toBeUndefined();
      });
  
      it('should invalidate an update user input with an invalid email', () => {
        const invalidInput = {
          email: 'invalidemail',
        };
  
        const { error } = updateUserSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
  
      it('should invalidate an update user input with a weak password', () => {
        const invalidInput = {
          password: 'weakpass',
        };
  
        const { error } = updateUserSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
    });
  
    describe('changeRoleSchema', () => {
      it('should validate a valid change role input', () => {
        const validInput = {
          role: UserRole.ADMIN,
        };
  
        const { error } = changeRoleSchema.validate(validInput);
        expect(error).toBeUndefined();
      });
  
      it('should invalidate a change role input with an invalid role', () => {
        const invalidInput = {
          role: 'INVALID_ROLE',
        };
  
        const { error } = changeRoleSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
    });
  
    describe('sendOtpSchema', () => {
      it('should validate a valid send OTP input', () => {
        const validInput = {
          email: 'johndoe@example.com',
        };
  
        const { error } = sendOtpSchema.validate(validInput);
        expect(error).toBeUndefined();
      });
  
      it('should invalidate a send OTP input with an invalid email', () => {
        const invalidInput = {
          email: 'invalidemail',
        };
  
        const { error } = sendOtpSchema.validate(invalidInput);
        expect(error).toBeDefined();
      });
    });
  });
  