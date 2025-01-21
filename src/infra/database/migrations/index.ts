import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'
import { add_environments } from './2_add_environments'

export const databaseMigrations = schemaMigrations({
  migrations: [
    add_environments
  ],
})