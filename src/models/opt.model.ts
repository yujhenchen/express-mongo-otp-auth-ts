import { IOtpDoc, IOtpModel } from "@/interfaces/otp";
import { Schema, model } from "mongoose";

const otpSchema = new Schema<IOtpDoc, IOtpModel>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email',
        ],
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

const OTP = model<IOtpDoc, IOtpModel>('otps', otpSchema);

export default OTP;
