import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';
import { useTema } from './src/tema';

const Stack = createNativeStackNavigator();

export default function App() {
  const tema = useTema();
  const cabecalho = {
    headerStyle: { backgroundColor: tema.cabecalho },
    headerTintColor: tema.textoCabecalho,
    headerTitleStyle: { fontWeight: 'bold' },
    headerTitleAlign: 'center',
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Home" screenOptions={cabecalho}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Calculadora Mobile' }} />
        <Stack.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Histórico' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
