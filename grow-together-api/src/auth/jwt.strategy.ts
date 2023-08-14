import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor()
    {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'c72bcc9a4835e854ba6c0c172cd96062bfc2f563aa45700f05a8971b90c0eb2f'
        });
    }

    async validate(payload:any)
    {
        return {
            id: payload.sub,
			name:payload.name,
			surname:payload.surname,
            username: payload.username,
            email: payload.email,
            role: payload.role,
			skill:payload.skill,
			createdAt:payload.createdAt,
			profileImagePath:payload.profileImagePath
        }
    }
}