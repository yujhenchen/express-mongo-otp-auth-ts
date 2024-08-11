import { APIRequest, APIResponse } from '../src/interfaces/express';
import { Request, Response } from 'express';

describe('APIRequest and APIResponse Interfaces', () => {
    it('should correctly type the body of APIRequest', () => {
        interface ExampleBody {
            testName: string;
            age: number;
        }

        const req: APIRequest<ExampleBody> = {
            body: {
                testName: 'John Doe',
                age: 30,
            },
        } as APIRequest<ExampleBody>;

        expect(req.body.testName).toBe('John Doe');
        expect(req.body.age).toBe(30);
    });

    it('should correctly type the body of APIResponse', () => {
        interface ExampleResponseBody {
            success: boolean;
            data: string;
        }

        const res: APIResponse<ExampleResponseBody> = {
            body: {
                success: true,
                data: 'Operation successful',
            },
        } as APIResponse<ExampleResponseBody>;

        expect(res.body.success).toBe(true);
        expect(res.body.data).toBe('Operation successful');
    });

    it('should allow APIRequest and APIResponse without generics', () => {
        const req: APIRequest = {
            body: undefined, 
        } as APIRequest;

        const res: APIResponse = {
            body: undefined, 
        } as APIResponse;

        expect(req.body).toBeUndefined();
        expect(res.body).toBeUndefined();
    });
});
