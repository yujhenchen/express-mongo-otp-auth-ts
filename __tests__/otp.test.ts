import { Model } from "mongoose";
import { IOtpDoc, IOtpModel } from "../src/interfaces/otp";

const OtpModel: IOtpModel = {
    create: jest.fn(),
    findOne: jest.fn(),
} as any;

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Otp Model Tests', () => {
    it('should create an OTP correctly', async () => {
        const otpData = {
            email: "test@example.com",
            otp: "123456",
            createdAt: new Date(),
        };

        (OtpModel.create as jest.Mock).mockResolvedValueOnce(otpData);

        const result = await OtpModel.create(otpData);

        expect(OtpModel.create).toHaveBeenCalledWith(otpData);
        
        expect(result).toEqual(otpData);
    });

    it('should validate an OTP correctly', async () => {
        const email = "test@example.com";
        const otp = "123456";
        const otpData = {
            email,
            otp,
            createdAt: new Date(),
        };

        (OtpModel.findOne as jest.Mock).mockResolvedValueOnce(otpData);

        const result = await OtpModel.findOne({ email, otp });

        expect(OtpModel.findOne).toHaveBeenCalledWith({ email, otp });
        expect(result).toEqual(otpData);
    });
});
