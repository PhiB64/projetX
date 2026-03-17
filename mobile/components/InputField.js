import React from 'react'
import { TextInput, Text, StyleSheet, View} from 'react-native'

const InputField = ({value, onChangeText, placeholder, error, secureTextEntry, autoCapitalize, autoComplete, textContentType}) => {
  return (
    <View style={styles.container}><TextInput 
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      textContentType={textContentType}
      style={styles.input}
    />
    {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    padding: 10,
    borderRadius: 5
,
    borderWidth: 1,
    borderColor: '#334155',
  },
  error: {
    color: '#FF0000',
    marginTop: 4,
  },
});