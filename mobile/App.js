import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


import Navigation from './app/Navigation';


export default function App() {
  return (
    <SafeAreaProvider>
     
      <Navigation/>
       <StatusBar style="auto" />      
  
    </SafeAreaProvider>
  );
}

