import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import * as crypto from 'node:crypto'
import { pbkdf2Config } from '../config'

@Injectable()
export class CryptoService {
  constructor(
    @Inject(pbkdf2Config.KEY)
    private readonly pbkdf2Env: ConfigType<typeof pbkdf2Config>
  ) {}

  hash(raw: string): Promise<string> {
    return new Promise((resolve, reject) =>
      crypto.pbkdf2(
        raw,
        this.pbkdf2Env.pbkdf2Salt,
        this.pbkdf2Env.pbkdf2Iterations,
        this.pbkdf2Env.pbkdf2KeyLens,
        this.pbkdf2Env.pbkdf2Digest,
        (err: Error | null, buf: Buffer) =>
          err
            ? reject(new InternalServerErrorException(err))
            : resolve(buf.toString('hex'))
      )
    )
  }
}
