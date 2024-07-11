import { Schema, model } from "mongoose";

const otpSchema = new Schema({});

const OTP = model('otps', otpSchema, 'otps');

export default OTP;
