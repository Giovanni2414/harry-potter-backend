import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private jwtService: JwtService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            let token = req.headers.authorization;
            if(!token)
                return res.status(401).json({message: "Not Authorized"})

            token = token.replace('Bearer ','');

            let decoded = null

            try{
                decoded = await this.jwtService.verifyAsync(token, {
                        secret: jwtConstants.secret
                    }
                )
            }catch {
                throw new UnauthorizedException();
            }
            console.log(decoded)
            if(decoded.role !== "client")
                return res.status(401).json({message: "Role not Authorized"})
            next()
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

