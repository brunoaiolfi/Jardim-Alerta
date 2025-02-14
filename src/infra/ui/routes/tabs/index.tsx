import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyPlants } from '../../views/myPlants';
import Ionicons from "react-native-vector-icons/Ionicons"
import { AddPlant } from '../../views/addPlant';
const BottomTabsRoutes = createBottomTabNavigator();

export function DashboardRoutes() {
    return (
        <BottomTabsRoutes.Navigator
            initialRouteName="MyPlants"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontSize: 16 },
                tabBarLabelPosition: 'beside-icon',
            }}
        >
            <BottomTabsRoutes.Screen
                name="MyPlants"
                component={MyPlants}
                options={{
                    tabBarLabel: "Minhas plantas",
                    tabBarIcon: ({ color }) => <Ionicons name='list' color={color} size={20} />,
                }}
            />
            <BottomTabsRoutes.Screen
                name="AddPlant"
                component={AddPlant}
                options={{
                    tabBarLabel: "Nova planta",
                    tabBarIcon: ({ color }) => <Ionicons name='add-circle-outline' color={color} size={20} />,
                }}
            />
        </BottomTabsRoutes.Navigator>
    )
}