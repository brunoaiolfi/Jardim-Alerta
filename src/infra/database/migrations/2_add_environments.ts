import { createTable } from "@nozbe/watermelondb/Schema/migrations";

export const add_environments = {
    toVersion: 2,
    steps: [
        createTable({
            name: 'environments',
            columns: [
                { name: 'title', type: 'string' }
            ]
        })
    ]
}