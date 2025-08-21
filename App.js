import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/components/screen/WelcomeScreen';
import SignupScreen from './src/components/screen/SignupScreen';
import CadastroScreen from './src/components/screen/CadastroScreen';
import HomeScreen from './src/components/screen/HomeScreen';
import AddBikeScreen from './src/components/screen/AddBikeScreen';
import AtualizarMotoScreen from './src/components/screen/AtualizarMotoScreen';
import EditarMotoScreen from './src/components/screen/EditarMotoScreen';
import VerMotosScreen from './src/components/screen/VerMotosScreen';
import GestaoPatioScreen from './src/components/screen/GestaoPatioScreen';
import { BikeProvider } from './src/context/BikeContext';
import { ThemeProvider, ThemeContext } from './src/components/screen/ThemeContext';

const Stack = createStackNavigator();

function AppStack() {
  const { isDark } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#000' : '#fff',
          shadowColor: 'transparent',
        },
        headerTintColor: isDark ? '#32CD32' : '#32CD32',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          letterSpacing: 1,
        },
        headerTitleAlign: 'center',
      }}
    >
      {/* Tela inicial sem header */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      {/* Telas de Login e Cadastro */}
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />

      {/* Tela principal */}
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Página Inicial' }} />

      {/* Outras telas do app */}
      <Stack.Screen name="AddBike" component={AddBikeScreen} options={{ title: '' }} />
      <Stack.Screen name="AtualizarMoto" component={AtualizarMotoScreen} options={{ title: '' }} />
      <Stack.Screen name="EditarMoto" component={EditarMotoScreen} options={{ title: '' }} />
      <Stack.Screen name="VerMotos" component={VerMotosScreen} options={{ title: '' }} />
      <Stack.Screen name="GestaoPatio" component={GestaoPatioScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BikeProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </BikeProvider>
    </ThemeProvider>
  );
}
