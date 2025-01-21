import { tableSchema } from "@nozbe/watermelondb";

export const environmentsTable = tableSchema({
    name: 'environments',
    columns: [
        { name: 'title', type: 'string' },
    ]
});