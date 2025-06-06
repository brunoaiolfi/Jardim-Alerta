import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from "../views/welcome";
import { UserNameForm } from "../views/userNameForm";
import { Confirmation } from '../views/confirmation';
import { NavigationContainer } from '@react-navigation/native';
import { AlarmSave } from '../views/alarmSave';
import { DashboardRoutes } from './tabs';

const StackRoutes = createStackNavigator();

export function Routes() {

    return (
        <NavigationContainer>
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
                    component={DashboardRoutes}
                />
                
                <StackRoutes.Screen
                    name="AlarmSave"
                    component={AlarmSave}
                />
            </StackRoutes.Navigator>
        </NavigationContainer>
    )
}