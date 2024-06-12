import { IUser } from '@src/models/userModel';
import { IReq, IRes } from '@src/routes/types/express/misc';

export default function signup(req: IReq<{ user: IUser }>, res: IRes) {

    try {
        // sign up
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: JSON.stringify(error),
        });
    }
}
