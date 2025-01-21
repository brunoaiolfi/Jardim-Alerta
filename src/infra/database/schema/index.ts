import { appSchema, tableSchema } from '@nozbe/watermelondb'
import { tables } from '../tables'

export const dataBaseSchema = appSchema({
    version: 2,
    tables,
})