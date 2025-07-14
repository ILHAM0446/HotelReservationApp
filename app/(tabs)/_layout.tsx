import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 28,
          shadowOpacity: 0.1,
          height: 55,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#f7b500',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Piscine"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Icon name="pool" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TransportForm"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Icon name="bus" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Restaurant"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Icon name="silverware-fork-knife" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}