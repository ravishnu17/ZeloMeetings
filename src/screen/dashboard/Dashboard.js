import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const Dashboard = () => {
    return (
        <ScrollView style={style.container}>
            <View style={style.statusContainer}>
                <View>
                    <Text>Rooms</Text>
                </View>
                <View>
                    <Text>Desk</Text>
                </View>
                <View>
                    <Text>Parking</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#ffffff',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    status: {
        height: 50,
        backgroundColor: 'red',
        borderRadius: 10,
    },


})

export default Dashboard
