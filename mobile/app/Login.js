
import React, { useState } from 'react'
import {loginSchema} from '../utils/validation'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { authService } from '../services/authService'
import Loading from '../components/Loading'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { useAuthStore } from '../store/authStore'
import LottieView from 'lottie-react-native'
import "../assets/animation.json"


const Login = ({navigation}) => {

const {setToken} = useAuthStore()


const [passwordVisible, setPasswordVisible] = useState(false)

const [loading, setLoading] = useState(false)



const {control, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(loginSchema)})

const onSubmit = async (data) => {
  try {

    setLoading(true)
    
    const token = await authService.login(data);
    await setToken(token, { email: data.email });
    

    Alert.alert('Success', 'Vous êtes connecté !')
    navigation.navigate('Profile')
  } catch (error) {
    Alert.alert('Error', error.message)
  } finally {
    setLoading(false)
  }
}

   return (

   
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">


      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 30 }} keyboardShouldPersistTaps="handled">

   <LottieView
     source={require('../assets/animation.json')}
     autoPlay
     loop
     style={{ width: 150, height: 150, alignSelf: 'center', marginBottom: 80 }}
   />

          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Connexion</Text>

      <Controller control={control} name="email" render={({field: {onChange, value}}) => (
        <InputField placeholder="Enter your email" value={value} onChangeText={onChange} error={errors.email?.message}
        autoCapitalize="none"
          textContentType="emailAddress"
          KeyboardType="email-address"
        />
      )} />

     <Controller control={control} name="password" render={({field: {onChange, value}}) => (
      <InputField style={{marginTop: 10 }}
      placeholder="Enter your password" 
      secureTextEntry={!passwordVisible}
      value={value} 
      onChangeText={onChange} 
      error={errors.password?.message}
      autoCapitalize='none'
      textContentType="password"
      />
      )} />
     
  

      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
        <Text style={{ color: '#006948', marginBottom: 20, textAlign: 'center' }}>
          {passwordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        </Text>
      </TouchableOpacity>

      {loading ? <Loading /> : <Button title="Se connecter" onPress={handleSubmit(onSubmit)} />}

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#006948', marginTop: 10, textAlign: 'center' }}>Pas de compte ? Inscrivez-vous</Text>
      </TouchableOpacity>

    </ScrollView>
    </KeyboardAvoidingView>
   
)}
    
    


export default Login
