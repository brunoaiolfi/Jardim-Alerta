import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { PrivateRoutes } from './private/privateRoutes';
import { PublicRoutes } from './public/publicRoutes';
import { getAplicAuth } from '../../application/auth/factory';
import { LoadingView } from '../views/public/loading';
import { getDatabaseContextImplementation } from '../../infra/implementations/database/context/factory';
import { getNotificationImplementation } from '../../infra/implementations/notifications/factory';
import { AppDataSource } from '../../infra/database';
import { Alert } from 'react-native';


export function Routes() {
    const aplicAuth = getAplicAuth();

    const { user, saveUser } = useUser();

    const [isLoading, setIsLoading] = useState(true);

    const databaseContext = getDatabaseContextImplementation();
    const notificationsImplementation = getNotificationImplementation();

    useEffect(() => {
        handleInitialize();
    }, [])

    async function handleInitialize() {
        try {
            setIsLoading(true);
            await initializeDatabase();
            await initializeNotifications();
            await checkUser();
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function checkUser() {
        try {
            setIsLoading(true);

            const res = await aplicAuth.getUser();

            saveUser(res.Content);
        } catch (error: any) {
            console.error("Error checking user:", error.message);
        } finally {
            setIsLoading(false);
        }
    }


    async function initializeNotifications() {
        try {
            await notificationsImplementation.createChannel();
        } catch (error) {
            throw new Error(`Could not initialize notifications. ${error.message}`);
        }
    }

    async function initializeDatabase() {
        try {
            if (AppDataSource.isInitialized) return;

            await databaseContext.initialize();
        } catch (error: any) {
            Alert.alert("Could not initialize database", error.message);
        }
    }

    if (isLoading) {
        return <LoadingView />
    }

    return !!user?.id ? <PrivateRoutes /> : <PublicRoutes />;
}