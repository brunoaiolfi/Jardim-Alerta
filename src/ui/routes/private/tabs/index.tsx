import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyPlants } from '../../../views/private/myPlants';
import Ionicons from "react-native-vector-icons/Ionicons"
import { Alarms } from '../../../views/private/alarms';
import Feather from "react-native-vector-icons/Feather";

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
                name="Alarms"
                component={Alarms}
                options={{
                    tabBarLabel: "Meus Alarmes",
                    tabBarIcon: ({ color }) => <Feather name="bell" size={20} color={color} />
                }}
            />
        </BottomTabsRoutes.Navigator>
    )
}