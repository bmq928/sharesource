import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

const AUTH_USER = '__AUTH_USER__'
const BEARER_AUTH_TYPE = 'Bearer'

export const COOKIE_ACCESS_TOKEN = 'backend.access_token'
export const COOKIE_REFRESH_TOKEN = 'backend.refresh_token'

export type AuthUserType = { id: string }

export const AuthUserId = createParamDecorator(
  (data: string, ctx: ExecutionContext): AuthUserType =>
    ctx.switchToHttp().getRequest()[AUTH_USER].id
)

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext): string | Record<string, string> => {
    const request = ctx.switchToHttp().getRequest()
    return data ? request.cookies?.[data] : request.cookies
  }
)

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest()
      const authHeader: string = req.headers['authorization'] ?? ''
      const [headerAuthType, headerToken] = authHeader.split(' ')
      const cookiesToken: string = req.cookies?.[COOKIE_ACCESS_TOKEN]

      const token = headerToken ?? cookiesToken
      const authType = authHeader ? headerAuthType : BEARER_AUTH_TYPE

      if (authType !== BEARER_AUTH_TYPE || !token)
        throw new UnauthorizedException(['authentication required'])

      const { id }: AuthUserType = await this.jwtService.verifyAsync(token)
      req[AUTH_USER] = { id }
      return true
    } catch (err) {
      throw new UnauthorizedException(['authentication required'])
    }
  }
}
