import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView , TouchableOpacity, Alert, Image } from 'react-native'
import { useForm , Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {registerSchema} from '../utils/validation'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { authService } from '../services/authService'
import Loading from '../components/Loading'
import LottieView from 'lottie-react-native'
import "../assets/animation.json"



const Register = ({navigation}) => {

const [passwordVisible, setPasswordVisible] = useState(false)

const [loading, setLoading] = useState(false)

const {control, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(registerSchema)})

const onSubmit = async (data) => {
  try {
    setLoading(true)
    await authService.register(data)
    Alert.alert('Success', 'Compte créé !')
    navigation.navigate('Login')
  } catch (error) {
    Alert.alert('Error', 'Échec de l\'inscription. Veuillez réessayer.')
  } finally {
    setLoading(false)
  }
}

  return (
  

    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', padding: 30}} behavior="padding">      

<LottieView
  source={require('../assets/animation.json')}
  autoPlay
  loop
  style={{ width: 150, height: 150, alignSelf: 'center', marginBottom: 80 }}
/>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Enregistrement</Text>

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
      <Controller control={control} name="passwordConfirm" render={({field: {onChange, value}}) => (
      <InputField style={{marginTop: 10}}
      placeholder="Confirm your password" 
      secureTextEntry={!passwordVisible}
      value={value} 
      onChangeText={onChange} 
      error={errors.passwordConfirm?.message}
      autoCapitalize='none'
      textContentType="password"
      />
      )} />

      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
        <Text style={{ color: '#006948', marginBottom: 20, textAlign: 'center' }}>
          {passwordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        </Text>
      </TouchableOpacity>

      {loading ? <Loading /> : <Button title="Enregistrer" onPress={handleSubmit(onSubmit)} />}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#006948', marginTop: 10, textAlign: 'center' }}>Déjà un compte ? Connectez-vous</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>

)}

export default Register

