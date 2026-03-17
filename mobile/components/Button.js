import React from 'react'
import { Pressable, Text, StyleSheet} from 'react-native'

export const Button = ({title, onPress}) => {
  return (
   <Pressable style={styles.button} onPress={onPress}><Text style={styles.text}>{title}</Text></Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#006948',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Button