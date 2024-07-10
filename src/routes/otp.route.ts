import { sendOTP } from "@/controllers/otp.controller";
import validateToken from "@/middleware/rbac.middleware";
import validateRequest from "@/middleware/validate.middleware ";
import { sendOtpSchema } from "@/middleware/validators";
import { Router } from "express";

const otpRoutes = Router();

otpRoutes.post('/send-otp', validateRequest(sendOtpSchema), sendOTP);

export default otpRoutes;
