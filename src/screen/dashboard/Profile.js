import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { findBuildingListBasedonLocationId, floorListbyBuildingId, getCountryList, getCustomerLoationByCountryId, loginHomeAccess, updateUserProfile } from '../../apiservices/Apiservices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { context } from '../../navigation/Appnav';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';

function Profile() {
    const isFocus = useIsFocused();
    const props = useContext(context);
    const setLoading = props?.setLoading;
    const navigate = useNavigation();

    const schema = yup.object().shape({
        contactName: yup.string().required('Name is required'),
        email: yup.string().required('Email is required').email('Invalid email'),
    })

    // use states
    const [userData, setUserData] = useState();
    const [countryList, setCountryList] = useState([]);
    const [locations, setLocations] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [floors, setFloors] = useState([{ label: '-- Select Floor --', value: null }]);
    const language = [
        {
            label: 'English',
            value: 'en'
        },
        {
            label: 'Portuguese',
            value: 'pt'
        },
        {
            label: 'Spanish',
            value: 'es'
        }
    ];

    const { formState: { errors }, handleSubmit, reset, control } = useForm({ resolver: yupResolver(schema) });

    // get user data
    const getUserData = async () => {
        setLoading(true);
        let userId = await AsyncStorage.getItem('userId');
        let res = await loginHomeAccess(userId);
        if (res?.status) {
            let Templocation = res?.user?.location?.id ? res?.user?.location?.id : res?.customerDetails?.user?.location?.id ? res?.customerDetails?.user?.location?.id : res?.customerDetails?.location?.id
            setUserData(res);
            getLocations(res?.user?.role?.role === 'USER' ? res?.customerDetails?.user?.country?.id : res?.user?.country?.id);
            getBuildings(Templocation);
            res?.user?.buildingId && getFloors(res?.user?.buildingId);
            reset({
                id: res?.user?.id,
                contactName: res?.user?.firstName,
                email: res?.user?.email,
                countryId: res?.user?.country?.id,
                locationId: res?.user?.location?.id,
                buildingId: res?.user?.buildingId,
                floorId: res?.user?.floorId || null,
                language: res?.user?.language,
                endUserRoleId: userData?.user?.endUserRole?.id ? userData?.user?.endUserRole?.id : null
            })
        } else {
            console.log("Error user data", res);
        }
    }
    // get country list
    const getCountry = async () => {
        setLoading(true);
        getCountryList().then(res => {
            if (res?.status) {
                setCountryList(res?.countries?.map(item => ({ label: item?.name, value: item?.id })));
            } else {
                console.log("Error country", res);
                setCountryList([]);
            }
        }).catch(err => {
            console.log("Error country", err);
        }).finally(() => {
            setLoading(false);
        })
    }
    //get locations by country
    const getLocations = async (country) => {
        setLoading(true);
        getCustomerLoationByCountryId(country).then(res => {
            if (res?.status) {
                setLocations(res?.customerLocations?.map(item => ({
                    label: item.location,
                    value: item.id
                })));
            } else {
                console.log("Error location", res);
                setLocations([]);
            }
        }).catch(err => {
            console.log("Error location", err);
        }).finally(() => {
            setLoading(false);
        })
    }

    // get buildings by location
    const getBuildings = async (location) => {
        setLoading(true);
        findBuildingListBasedonLocationId(location).then(res => {
            if (res?.status) {
                setBuildings([{ label: '-- Select Building --', value: null }, ...res.buildings.map(item => ({
                    label: item.name,
                    value: item.id
                }))]
                );
            } else {
                console.log("Error building", res);
                setBuildings([]);
            }
        }).catch(err => {
            console.log("Error building", err);
        }).finally(() => {
            setLoading(false);
        })
    }
    // get floors by building
    const getFloors = async (building) => {
        setLoading(true);
        floorListbyBuildingId(building).then(res => {
            if (res?.status) {
                setFloors([{ label: '-- Select Floor --', value: null }, ...res?.floors.map(item => ({ label: item?.name, value: item?.id }))])
            } else {
                console.log("Error floor data", res);
                setFloors([]);
            }
        }).catch(err => {
            console.log("Error floor data", err);
        }).finally(() => {
            setLoading(false);
        })
    }
    // update profile
    const updateProfile = (data) => {
        // Add required Data
        let postData = {}
        if (userData?.user?.role?.role === 'USER') {
            postData = data
        } else {
            postData = {
                ...data,
                contactNumber: userData?.user?.contactNo,
                enableMrCars: userData?.customerDetails?.enableMrCars,
                enableMrVisit: userData?.customerDetails?.enableMrVisit,
                enablePayment: userData?.customerDetails?.enablePayment,
                noOfCars: userData?.customerDetails?.noOfCars,
                noOfChargingCar: userData?.customerDetails?.noChargingCar,
                noOfDeskDisplay: userData?.customerDetails?.noDesksDisplay,
                noOfDesks: userData?.customerDetails?.noDesks,
                noOfKiosks: userData?.customerDetails?.noKiosks,
                noOfParkingSpaces: userData?.customerDetails?.noParkingSpaces,
                noOfRooms: userData?.customerDetails?.noRooms,
                noOfRoomsDisplay: userData?.customerDetails?.noRoomsDisplay,
                noOfService: userData?.customerDetails?.noViewPoints,
                noOfSpaces: userData?.customerDetails?.noSpaces,
                noOfVisits: userData?.customerDetails?.noOfVisits,
                profileImg: userData?.user?.profileImg,
                endUserRoleId: userData?.user?.endUserRole?.id ? userData?.user?.endUserRole?.id : null

            }
        }
        setLoading(true);
        updateUserProfile(postData).then(res => {
            if (res?.status) {
                getUserData();
                Toast.showWithGravity(res?.information?.description, Toast.SHORT, Toast.CENTER);
                if (postData?.email !== userData?.customerDetails?.user?.email) {
                    props?.setActive(1);
                    props?.setHeaderProps({});
                    AsyncStorage.clear();
                    navigate.navigate('LoginScreen');
                }
            } else {
                console.log("Error update", res);
                Toast.showWithGravity(res?.information?.description, Toast.SHORT, Toast.CENTER);
            }
        }).catch(err => {
            console.log("Error update", err);
        })
    }

    useEffect(() => {
        if (isFocus) {
            getUserData();
            getCountry();
        }
    }, [isFocus])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.img} source={userData?.customerDetails?.user?.profileImg ? { uri: userData?.customerDetails?.user?.profileImg } : require('../../assets/user.png')} />
                <Text style={{ marginTop: 8, marginBottom: 4, fontWeight: 'bold' }}>{userData?.customerDetails?.user?.firstName}</Text>
                <Text>{userData?.customerDetails?.user?.role?.role}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Name <Text style={styles.error}>*</Text></Text>
                <Controller
                    name='contactName'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder='Enter Name'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors?.contactName && <Text style={styles.error}>{errors.contactName?.message}</Text>}
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Email <Text style={styles.error}>*</Text></Text>
                <Controller
                    name='email'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder='Enter Email'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors?.email && <Text style={styles.error}>{errors.email?.message}</Text>}
            </View>
            {/* <View style={styles.row}>
                <Text style={styles.label}>User Role</Text>
                <TextInput style={styles.input} value={userData?.customerDetails?.user?.role?.role} readOnly />
            </View> */}
            <View style={styles.rowcontainer}>
                {userData?.user?.role?.role !== 'USER' && <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Country</Text>
                    <Controller
                        name='countryId'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Dropdown
                                style={styles.dropdown}
                                data={countryList}
                                labelField='label'
                                valueField='value'
                                onChange={(event) => { onChange(event?.value); getLocations(event?.value) }}
                                onBlur={onBlur}
                                value={value}
                                search={true}
                                searchPlaceholder='search'
                                inputSearchStyle={{ borderRadius: 3 }}
                                selectedTextStyle={{ color: 'black' }}
                            />
                        )}
                    />
                </View>}
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Location</Text>
                    <Controller
                        name='locationId'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Dropdown
                                style={styles.dropdown}
                                data={locations}
                                labelField='label'
                                valueField='value'
                                onChange={(event) => { onChange(event?.value); getBuildings(event?.value) }}
                                onBlur={onBlur}
                                value={value}
                                selectedTextStyle={{ color: 'black' }}
                            />
                        )}
                    />
                </View>
            </View>

            <View style={styles.rowcontainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Building</Text>
                    <Controller
                        name='buildingId'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Dropdown
                                style={styles.dropdown}
                                data={buildings}
                                labelField='label'
                                valueField='value'
                                onChange={(event) => { onChange(event?.value); event?.value ? getFloors(event?.value) : setFloors([]) }}
                                onBlur={onBlur}
                                value={value}
                                placeholder='Select Building'
                                selectedTextStyle={{ color: 'black' }}
                            />
                        )}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Floor</Text>
                    <Controller
                        name='floorId'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Dropdown
                                style={styles.dropdown}
                                data={floors}
                                labelField='label'
                                valueField='value'
                                onChange={(event) => onChange(event?.value)}
                                onBlur={onBlur}
                                value={value}
                                placeholder='Select Floor'
                                selectedTextStyle={{ color: 'black' }}
                            />
                        )}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Language</Text>
                <Controller
                    name='language'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Dropdown
                            style={styles.dropdown}
                            data={language}
                            labelField='label'
                            valueField='value'
                            onChange={(event) => onChange(event?.value)}
                            onBlur={onBlur}
                            value={value}
                            selectedTextStyle={{ color: 'black' }}
                        />
                    )}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(updateProfile)}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

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
        marginBottom: 15
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    row: {
        rowGap: 5,
        marginBottom: 15
    },
    rowcontainer: {
        flexDirection: 'row',
        columnGap: 10,
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
        color: '#000',
        padding: 9
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 4,
        padding: 10
    },
    button: {
        marginBottom: 30,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        backgroundColor: '#26a73c',
        paddingHorizontal: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    error: {
        color: 'red'
    },
})
export default Profile