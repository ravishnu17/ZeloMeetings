import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-paper';
import { context } from '../navigation/Appnav';

const Footer = () => {
    const props= useContext(context);
    const active= props?.active;
    const setActive= props?.setActive;
    const translate= props?.language;
    
    const navigation = useNavigation();
    const menu = [
        {
            id: 1,
            name: translate?.MENU?.DASHBOARD,
            icon: 'home',
            link: 'DashboardScreen'
        },
        {
            id: 2,
            name: translate?.MENU?.CALENDAR,
            icon: 'calendar',
            link: 'CalendarScreen'
        },
        {
            id: 3,
            name: translate?.MENU?.ROOMS,
            icon: 'door',
            link: 'RoomScreen'
        },
        {
            id: 4,
            name: translate?.MENU?.REPORT,
            icon: 'alert',
            link: 'ReportScreen'
        },
        {
            id: 5,
            name: '...',
            icon: 'dots-horizontal',
            link: 'MenuScreen'
        },
    ];
    const color=(id)=>{
        return active === id || (id === 5 && active > id) ? "#fff" : "#1586b3";
    };

    const handleClick = (id) => {
        setActive(id);
        navigation.navigate(menu[id - 1].link);
    }
    return (
        <View style={style.container}>
            {
                menu.map((item, index) =>
                    <TouchableOpacity key={index} style={{ flex: 1, alignItems: 'center' }} onPress={() => handleClick(item.id)}>
                        <Icon source={item.icon} size={23} color={color(item.id)} />
                        <Text style={{ color: color(item.id), fontSize: 11, marginTop: 5 }}>{item.name}</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        columnGap: 15,
        backgroundColor: '#035676',
        padding: 7,
        paddingBottom: 15,
        paddingLeft: 12
    }
})

export default Footer
