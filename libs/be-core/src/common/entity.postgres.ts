import { randomUUID } from 'node:crypto'
import {
  BeforeInsert,
  CreateDateColumn,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

export abstract class EntityPostgres {
  @PrimaryColumn('uuid')
  id: string

  @Index()
  @CreateDateColumn({ type: 'timestamptz', default: 'NOW()', update: false })
  createdAt: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamptz', default: 'NOW()' })
  updatedAt: Date

  @BeforeInsert()
  genDefaultWhenInsert?() {
    this.id = randomUUID()
  }
}
