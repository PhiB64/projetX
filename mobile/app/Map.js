import { Text, View, StyleSheet, Alert, ActivityIndicator} from 'react-native'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/Button'
import MapView, { Marker, Callout} from 'react-native-maps'
import { useAuthStore } from '../store/authStore'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { userService } from '../services/userService'

const Map = () => {

  const navigation = useNavigation()

  const insets = useSafeAreaInsets()

  const [regions, setRegions] = useState(null)

  const [activeUsers, setActiveUsers] = useState([])

  const [myId, setMyId] = useState(null)

  const {user} = useAuthStore()

  const mapRef = useRef(null)

  useEffect(() => {

    let subscription
    let intervalId

    const initLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à votre localisation.')
        return
      }

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 10},
        async (loc) => {
          const { latitude, longitude } = loc.coords       
          setRegions({ latitude, longitude, latitudeDelta:0.01, longitudeDelta:0.01 })
          try {
            await userService.update({ latitude, longitude })
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la localisation :', error)
          }
        }
      )
    }

    const fetchActiveUsers = async () => {
      try {
        const users = await userService.getActiveUsers()
        setActiveUsers(users)
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs actifs :', error)
      }
    }

    initLocation()
    fetchActiveUsers()
    intervalId = setInterval(fetchActiveUsers, 30000)

    return () => {
      if (subscription) subscription.remove()
      clearInterval(intervalId)
    }

  }, []);
     
  // afficher un indicateur de chargement tant que la localisation n'est pas disponible  
  if (!regions) { 
    return (     
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> 
         )
  }

  return (
     <View style={styles.container}>
       
    
       <MapView
       ref={mapRef}
       style={styles.map}
       region={regions}
       showsUserLocation={true}
       followsUserLocation={true}
      >
        {activeUsers.map(activeUser => {
          const lat=parseFloat(activeUser.latitude)
          const lon=parseFloat(activeUser.longitude)
          if (!isNaN(lat) && !isNaN(lon)) {
            const isMe = activeUser.email === user?.email

          return (   
          <Marker
            key={`${activeUser.id}-${isMe ? 'red' : 'yellow'}`}
            coordinate={{ latitude: lat, longitude: lon }}
            pinColor={isMe ? 'red' : 'yellow'}
          >
            <Callout tooltip>
              <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, borderColor: '#ccc', borderWidth: 1 }}>
              <Text style={{ fontWeight: 'bold', color: isMe ? 'red' : 'yellow' }}>{isMe ? 'C\'est moi' : `Utilisateur ${activeUser.email}`}</Text>
              </View>
            </Callout>
            </Marker>
          );
          }
          return null
        })}
          
       </MapView>
       
     <View style={{ position: 'absolute', bottom: insets.bottom + 20, left: 20, right: 20 }}>
      <Button style={styles.button} title="Retour au Profil" onPress={() => navigation.navigate('Profile')} />
    </View>

    </View>
  )

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#006948',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',


}})


export default Map

