import crypto from 'crypto';


function generateJwtSecret(): void {
    const secret = crypto.randomBytes(64).toString('hex');
    console.log(secret);
}

export default generateJwtSecret;
