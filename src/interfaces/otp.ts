import { Document, Model } from "mongoose";

export interface IOtp {
    email: string;
    otp: string;
    createdAt: Date;
}

export interface IOtpDoc extends IOtp, Document { };

export interface IOtpModel extends Model<IOtpDoc> { };
