import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/components/screen/WelcomeScreen';
import SignupScreen from './src/components/screen/SignupScreen';
import HomeScreen from './src/components/screen/HomeScreen';
import AddBikeScreen from './src/components/screen/AddBikeScreen';
import AtualizarMotoScreen from './src/components/screen/AtualizarMotoScreen';
import EditarMotoScreen from './src/components/screen/EditarMotoScreen';
import VerMotosScreen from './src/components/screen/VerMotosScreen';
import GestaoPatioScreen from './src/components/screen/GestaoPatioScreen';
import { BikeProvider } from './src/context/BikeContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <BikeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000', 
              height: 60,             
              shadowColor: 'transparent', 
            },
            headerTintColor: '#32CD32', 
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
              letterSpacing: 1,
            },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              title: '',
              headerLeft: () => null,
            }}
          />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Página Inicial' }} />
          <Stack.Screen name="AddBike" component={AddBikeScreen} options={{ title: '' }} />
          <Stack.Screen name="AtualizarMoto" component={AtualizarMotoScreen} options={{ title: '' }} />
          <Stack.Screen name="EditarMoto" component={EditarMotoScreen} options={{ title: '' }} />
          <Stack.Screen name="VerMotos" component={VerMotosScreen} options={{ title: '' }} />
          <Stack.Screen name="GestaoPatio" component={GestaoPatioScreen} options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </BikeProvider>
  );
}