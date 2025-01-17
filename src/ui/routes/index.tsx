import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from "../views/welcome";
import { UserNameForm } from "../views/userNameForm";
import { Confirmation } from '../views/confirmation';
import { Dashboard } from '../views/Dashboard';

const StackRoutes = createStackNavigator();

export function Routes() {

    
    return (
        <StackRoutes.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <StackRoutes.Screen
                name="Welcome"
                component={Welcome}
            />

            <StackRoutes.Screen
                name="UserNameForm"
                component={UserNameForm}
            />

            <StackRoutes.Screen 
                name="Confirmation"
                component={Confirmation}
            />
            
            <StackRoutes.Screen 
                name="Dashboard"
                component={Dashboard}
            />
        </StackRoutes.Navigator>
    )
}