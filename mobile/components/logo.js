import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'


const logo = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , padding: 30}}>
      <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100 }} />
    </View>
  )
}

export default logo

const styles = StyleSheet.create({})