import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Table from '../Table';

const Dashboard = () => {
    const items = ['Rooms', 'Desk', 'Parking'];
    const cols = ['Type', 'Room / Desk', 'Requester', 'Start Time', 'End Time'];
    return (
        <ScrollView style={style.container}>
            <View style={style.row}>
                {
                    items.map((item, index) => 
                        <View key={index} style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }} >
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{item} (0.0%)</Text>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>0/0</Text>
                            </View>
                            <View style={style.progressContainer}>
                                <View style={[style.filler, { width: `${90}%` }]} />
                            </View>
                        </View>
                    )
                }
            </View>
            <View style={{ ...style.row, marginTop: 15, alignItems: 'center' }}>
                <View style={{ width: 25, height: 25, backgroundColor: 'green' }} />
                <Text>Available</Text>

                <View style={{ width: 25, height: 25, backgroundColor: '#c40404' }} />
                <Text>Full</Text>
            </View>

            <View style={{ marginTop: 25 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Room / Desk booking requests</Text>
                <Table cols={cols} rows={[]} />
            </View>

        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 15,
        backgroundColor: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        columnGap: 15
    },
    progressContainer: {
        height: 50,
        width: '100%',
        backgroundColor: '#c40404',
        borderRadius: 5,
        overflow: 'hidden',
    },
    filler: {
        height: '100%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Dashboard
