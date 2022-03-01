import { sign, verify } from 'jsonwebtoken';
import CONFIG from '../config';

export const jwtSign = (data: any) => sign(data, CONFIG.JWT_KEY);
export const jwtVerify = (data: any) => verify(data, CONFIG.JWT_KEY);
