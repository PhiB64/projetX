import { Text, View, Alert, TouchableOpacity } from 'react-native'
import Button from '../components/Button'
import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

const Profile = () => {
  const navigation = useNavigation()
  const { logout, user } = useAuthStore()
  const userEmail = user?.email || 'utilisateur non trouvé'
  

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Oui', onPress: async () => {
        try {
          await logout()
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
        } catch (error) {
          Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion.')
        }
      }}
    ])
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 30 }}>
      <LottieView
        source={require('../assets/animation.json')}
        autoPlay
        loop
        style={{ width: 150, height: 150, alignSelf: 'center', marginBottom: 80 }}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' , textAlign: 'center'}}>Profil</Text>
      <Text style={{ backgroundColor: '#bbdbc0', fontSize: 18, marginTop: 10, fontWeight: 'bold', textAlign: 'center', lineHeight: 40, color: '#056500', padding: 10, borderRadius: 5 }}>{`Bienvenue\n${userEmail}`}</Text>
      <TouchableOpacity style={{ marginTop: 20 }}>
        <Button title="Voir la carte"  onPress={() => navigation.navigate('Map')}/>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 20 }} >
        <Button title="Se déconnecter" onPress={handleLogout}/>
      </TouchableOpacity>
    </View>
  )
}

export default Profile


