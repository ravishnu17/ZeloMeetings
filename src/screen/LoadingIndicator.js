import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoadingIndicator = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#00f7ff" />
        <Text>Loading...</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000052f',
    },
});

export default LoadingIndicator;
