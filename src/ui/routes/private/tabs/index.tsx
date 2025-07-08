import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlantsList } from '../../../views/private/plants/list';
import Ionicons from "react-native-vector-icons/Ionicons"
import { AlarmsList } from '../../../views/private/alarms/list';
import Feather from "react-native-vector-icons/Feather";

const BottomTabsRoutes = createBottomTabNavigator();

export function DashboardRoutes() {
    return (
        <BottomTabsRoutes.Navigator
            initialRouteName="PlantsList"
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
                name="PlantsList"
                component={PlantsList}
                options={{
                    tabBarLabel: "Minhas plantas",
                    tabBarIcon: ({ color }) => <Ionicons name='list' color={color} size={20} />,
                }}
            />
            <BottomTabsRoutes.Screen
                name="Alarms"
                component={AlarmsList}
                options={{
                    tabBarLabel: "Meus Alarmes",
                    tabBarIcon: ({ color }) => <Feather name="bell" size={20} color={color} />
                }}
            />
        </BottomTabsRoutes.Navigator>
    )
}