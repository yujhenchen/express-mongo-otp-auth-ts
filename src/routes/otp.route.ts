import { sendOTP } from "@/controllers/otp.controller";
import { Router } from "express";

const otpRoutes = Router();

otpRoutes.post('/send-otp', sendOTP);

export default otpRoutes;
