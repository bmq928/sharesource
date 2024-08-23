import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IdDto } from '../common'
import { CryptoService } from '../crypto'
import { LoginDto, RegisterDto } from './dto'
import { UserEntity } from './user.entity'
import { UserAuthTokenResponse } from './user.response'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService
  ) {}

  async findOne({ id }: IdDto): Promise<UserEntity> {
    const founded = await this.usersRepo.findOneBy({ id })
    if (!founded)
      throw new NotFoundException([`user with id="${id}" is not found`])
    return founded
  }

  async login({ email, password }: LoginDto): Promise<UserAuthTokenResponse> {
    const founded = await this.usersRepo.findOneBy({
      email,
      password: await this.cryptoService.hash(password),
    })
    if (!founded) throw new BadRequestException(['email or password is wrong'])
    return { accessToken: this.jwtService.sign({ id: founded.id, email }) }
  }

  async register({
    email,
    password,
  }: RegisterDto): Promise<UserAuthTokenResponse> {
    const founded = await this.usersRepo.findOneBy({ email })
    if (founded) throw new BadRequestException(['email is existed'])

    const created = await this.usersRepo.save(
      this.usersRepo.create({
        email,
        password: await this.cryptoService.hash(password),
      })
    )

    return { accessToken: this.jwtService.sign({ id: created.id, email }) }
  }
}
