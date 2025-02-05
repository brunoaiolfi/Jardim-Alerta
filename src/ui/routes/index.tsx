import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from "../views/welcome";
import { UserNameForm } from "../views/userNameForm";
import { Confirmation } from '../views/confirmation';
import { AddPlant } from '../views/addPlant';
import { NavigationContainer } from '@react-navigation/native';
import { PlantSave } from '../views/plantSave';
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
                    name="PlantSave"
                    component={PlantSave}
                />
            </StackRoutes.Navigator>
        </NavigationContainer>
    )
}