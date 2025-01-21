import { dataBaseSchema } from './schema/index';
import { Alert, Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { databaseMigrations } from './migrations';
import Environment from './models/Environment';

// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema: dataBaseSchema,
    migrations: databaseMigrations,
    jsi: false,
    // (optional, but you should implement this method)
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
        Alert.alert(error.message);
    }
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [
        Environment
    ],
});

export { database }