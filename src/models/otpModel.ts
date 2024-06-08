import { model, Schema, Model } from 'mongoose';
import { sendVerificationEmail } from '../util/optHelper';

type Otp = {
    email: string;
    otp: string;
    createdAt: Date;
};

const otpSchema: Schema = new Schema<Otp, Model<Otp>>({
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

otpSchema.pre<Otp>('save', async function (next): Promise<void> {
    console.log("New document saved to the database");
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const OtpModel = model<Otp>('OTP', otpSchema);

export default OtpModel;