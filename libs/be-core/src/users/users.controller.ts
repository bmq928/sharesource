import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { AuthGuard, AuthUserId, COOKIE_ACCESS_TOKEN } from '../common'
import { baseConfig } from '../config'
import { LoginDto, RegisterDto } from './dto'
import { UserAuthTokenResponse, UserResponse } from './user.response'
import { UsersService } from './users.service'

type CookieResponse = {
  cookies?: (key: string, val: string, opts: Record<string, unknown>) => void // express
  setCookie?: (key: string, val: string, opts: Record<string, unknown>) => void // fastify
}
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(baseConfig.KEY)
    private readonly baseEnv: ConfigType<typeof baseConfig>
  ) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  findMe(@AuthUserId() id: string): Promise<UserResponse> {
    return this.usersService
      .findOne({ id })
      .then((entity) => plainToInstance(UserResponse, entity))
  }

  @Post('/login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: CookieResponse
  ): Promise<UserAuthTokenResponse> {
    const data = await this.usersService.login(dto)
    this.setCookie(res, COOKIE_ACCESS_TOKEN, data.accessToken)
    return plainToInstance(UserAuthTokenResponse, data)
  }

  @Post('/register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: CookieResponse
  ): Promise<UserAuthTokenResponse> {
    const data = await this.usersService.register(dto)
    this.setCookie(res, COOKIE_ACCESS_TOKEN, data.accessToken)
    return plainToInstance(UserAuthTokenResponse, data)
  }

  @HttpCode(204)
  @Put('/logout')
  logout(@Res({ passthrough: true }) res: CookieResponse): void {
    this.setCookie(res, COOKIE_ACCESS_TOKEN, '')
  }

  private setCookie(res: CookieResponse, key: string, val: string): void {
    const opts = {
      httpOnly: true,
      secure: this.baseEnv.nodeEnv === 'production',
      sameSite: 'lax',
      path: '/',
    }
    if (res.cookies) return res.cookies(key, val, opts)
    if (res.setCookie) return res.setCookie(key, val, opts)
  }
}
