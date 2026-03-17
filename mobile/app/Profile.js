import { Text, View, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigation } from '@react-navigation/native'

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profil</Text>
      <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold', textAlign: 'center', lineHeight: 50, color: '#5760a5' }}>{`Bienvenue\n${userEmail}`}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: '#006948', marginTop: 20 }}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile


