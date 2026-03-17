import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView , TouchableOpacity,Alert} from 'react-native'
import { useForm , Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {registerSchema} from '../utils/validation'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { authService } from '../services/authService'
import Loading from '../components/Loading'


const Register = ({navigation}) => {

const [loading, setLoading] = useState(false)
const {control, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(registerSchema)})

const onSubmit = async (data) => {
  try {
    setLoading(true)
    await authService.register(data)
    Alert.alert('Success', 'Registration successful!')
    navigation.navigate('Login')
  } catch (error) {
    Alert.alert('Error', 'Registration failed. Please try again.')
  } finally {
    setLoading(false)
  }
}

  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} behavior="padding">
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
      secureTextEntry
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
      secureTextEntry
      value={value} 
      onChangeText={onChange} 
      error={errors.passwordConfirm?.message}
      autoCapitalize='none'
      textContentType="password"
      />
      )} />

      {loading ? <Loading /> : <Button title="Enregistrer" onPress={handleSubmit(onSubmit)} />}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#006948', marginTop: 10 }}>Déjà un compte ? Connectez-vous</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
)}

  
  

export default Register

