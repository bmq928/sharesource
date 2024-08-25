import { TaskEntity, typeormConfig, UserEntity } from '@libs/be-core'
import { DataSource } from 'typeorm'
import { Initial1724387182901 } from '../migrations/1724387182901-Initial'
import { ChangeDefaultTimestamp1724569767660 } from '../migrations/1724569767660-ChangeDefaultTimestamp'

export const entities = [TaskEntity, UserEntity]
export const migrations = [
  Initial1724387182901,
  ChangeDefaultTimestamp1724569767660,
]
export default new DataSource({
  ...typeormConfig(),
  entities,
  migrations,
})
