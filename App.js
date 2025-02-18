import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './Start';
import Home from './HomePage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='HomePage' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ed313e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 48,
  }
});
