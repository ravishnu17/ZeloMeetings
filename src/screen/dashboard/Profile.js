import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

function Profile() {
    const language = [
        {
            label: 'English',
            value: 'English'
        },
        {
            label: 'Hindi',
            value: 'Hindi'
        }
    ];

    const location=[
        {
            label: 'Chennai',
            value: 'Chennai'
        },
        {
            label: 'Bangalore',
            value: 'Bangalore'
        }
    ]
    return (
        <ScrollView style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.img} source={require('../../assets/user.png')} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} placeholder='Enter Name' readOnly />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder='Enter Email' readOnly />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>User Role</Text>
                <TextInput style={styles.input} value='CUSTOMER' readOnly />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Language</Text>
                <Dropdown style={styles.dropdown} data={language} labelField='label' valueField='value' onChange={(value ) => console.log( value )} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Location</Text>
                <Dropdown style={styles.dropdown} data={location} labelField='label' valueField='value' onChange={(value ) => console.log( value )} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    profile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    row:{
        rowGap: 5,
        marginBottom: 15
    },
    label: {
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#8a8a8a',
        paddingHorizontal: 10,
        color:'#000'
    },
    dropdown:{
        borderWidth:1,
        borderColor:'#8a8a8a',
        borderRadius:4,
        padding:13
    }
})
export default Profile