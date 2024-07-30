import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native'

function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.text}>Privacy Policy</Text>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:15
    },
    text:{
        fontSize:12
    }
})

export default PrivacyPolicy