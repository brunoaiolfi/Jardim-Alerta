import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../../views/public/login";

const StackRoutes = createStackNavigator();

export function PublicRoutes() {

    return (
        <NavigationContainer>
            <StackRoutes.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <StackRoutes.Screen
                    name="Login"
                    component={Login}
                />

            </StackRoutes.Navigator>
        </NavigationContainer>
    )
}