import { model, Schema } from 'mongoose';
import { sendVerificationEmail } from '../util/optHelper';

type TOtp = {
    email: string;
    otp: string;
    createdAt: Date;
};

const otpSchema: Schema = new Schema({
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

otpSchema.pre('save', async function (next) {
    console.log("New document saved to the database");
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const OtpModel = model<TOtp>('OTP', otpSchema);

export default OtpModel;