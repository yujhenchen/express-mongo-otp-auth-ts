import { model, Schema, Model } from 'mongoose';
import { sendOTP } from '../util/opt';

export interface IOtp {
    email: string;
    otp: string;
    createdAt: Date;
}

const otpSchema: Schema = new Schema<IOtp, Model<IOtp>>({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    },
});

otpSchema.pre<IOtp>('save', async function (next): Promise<void> {
    // console.log("New document saved to the database");
    // if (this.isNew) {
    //     await sendOTP(this.email, this.otp);
    // }
    await sendOTP(this.email, this.otp);
    next();
});

const OtpModel = model<IOtp>('OTP', otpSchema);

export default OtpModel;