import jwt from 'jsonwebtoken';
import User from '../db/models/User';
import dotenv from 'dotenv';

dotenv.config();

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

class GenerateToken {
    public async generate(data: any): Promise<string> {
        const token = await jwt.sign(data, process.env.JWT_SECRET_KEY as string, {  expiresIn: '7d' });
        return token;
    }

    public async refresh(data: any): Promise<string> {
        const token = await jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {  expiresIn: '7d' });
        return token;
    }

    public async verify(token: string): Promise<UserData | null> {
        let resData: any;
        const res = jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
            if(err) {
                resData = null;
            } else{
                resData = decoded;
            }
        });

        if(resData){
            const result: UserData = <UserData>(resData);
            return result;
        }
        return null;
    }

    public async verifyRefresh(token: string): Promise<UserData | null> {
        let resData: any;
        const res = await jwt.verify(token, process.env.JWT_REFRESH_TOKEN as string, (err, decoded) => {
            if(err) {
                resData = null;
            } else{
                resData = decoded;
            }
        });


        if(resData){
            const result: UserData = <UserData>(resData);
            return result;
        }
        return null;
    }


}

export default GenerateToken;