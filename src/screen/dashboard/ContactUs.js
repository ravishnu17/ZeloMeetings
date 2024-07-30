import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-paper';

function ContactUs() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.itemContainer}>
                <Icon
                    source='account'
                    color='#035676'
                    size={25}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Nuno Almeida</Text>
                    <Text style={styles.subTitle}>Name</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <Icon
                    source='phone'
                    color='#035676'
                    size={25}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>+351 961 890 849</Text>
                    <Text style={styles.subTitle}>Mobile</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <Icon
                    source='email-outline'
                    color='#035676'
                    size={25}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>nuno.almeida@zelo2000.pt</Text>
                    <Text style={styles.subTitle}>Email</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <Icon
                    source='web'
                    color='#035676'
                    size={25}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>www.zelo2000.pt</Text>
                    <Text style={styles.subTitle}>Website</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    textContainer: {
        flex: 1,
        borderBottomWidth: 1,
        marginLeft: 8,
        borderBottomColor: '#bdbdbd'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    subTitle: {
        fontSize: 12,
        marginBottom: 5
    }
})
export default ContactUs