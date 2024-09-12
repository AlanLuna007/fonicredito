import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="screens/LoginScreen">
        <Stack.Screen name="screens/LoginScreen" component={LoginScreen} options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="screens/PokemonListScreen" component={PokemonListScreen} options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="screens/PokemonDetailScreen" component={PokemonDetailScreen} options={{
          headerShown: true,
          title:'Detalles Pokemon'
        }}/>
      </Stack.Navigator>
  );
};

export default App;
