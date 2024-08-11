import { IEmail } from '../src/interfaces/email';

function isValidEmail(email: IEmail): boolean {
    return (
        typeof email.from === 'string' &&
        typeof email.to === 'string' &&
        typeof email.subject === 'string' &&
        typeof email.text === 'string' &&
        (email.cc === undefined || typeof email.cc === 'string') &&
        (email.bcc === undefined || typeof email.bcc === 'string') &&
        (email.html === undefined || typeof email.html === 'string')
    );
}

describe('IEmail Interface', () => {
    test('should accept a valid email object', () => {
        const validEmail: IEmail = {
            from: 'test@example.com',
            to: 'recipient@example.com',
            subject: 'Test Subject',
            text: 'Test message body',
        };

        expect(isValidEmail(validEmail)).toBe(true);
    });

    test('should accept an email with optional fields', () => {
        const validEmailWithOptionalFields: IEmail = {
            from: 'test@example.com',
            to: 'recipient@example.com',
            subject: 'Test Subject',
            text: 'Test message body',
            cc: 'cc@example.com',
            bcc: 'bcc@example.com',
            html: '<p>Test message body</p>',
        };

        expect(isValidEmail(validEmailWithOptionalFields)).toBe(true);
    });

    test('should reject an email without required fields', () => {
        const invalidEmail: any = {
            from: 'test@example.com',
            subject: 'Test Subject',
            text: 'Test message body',
        };

        expect(isValidEmail(invalidEmail)).toBe(false);
    });

    test('should reject an email with invalid types', () => {
        const invalidEmail: any = {
            from: 'test@example.com',
            to: 123, 
            subject: 'Test Subject',
            text: 'Test message body',
        };

        expect(isValidEmail(invalidEmail)).toBe(false);
    });
});
