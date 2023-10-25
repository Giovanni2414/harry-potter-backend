import {User} from "../users/user.entity";
import * as bcrypt from 'bcrypt';

export const encryptPassword = (user: User) =>{
    const userEncrypt = {...user}
    userEncrypt.password = bcrypt.hashSync(userEncrypt.password,10)
    return userEncrypt
}

export const verifyPassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
}