import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Map from './Map'
import Profile from './Profile'
import Register from './Register'
import Logout from './Logout'
import Login from './Login'
import { useAuthStore } from '../store/authStore'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <NavigationContainer >
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Profile' : 'Register'}
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Profile" component={Profile} />
      
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
