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

function Profile() {
    const isFocus = useIsFocused();
    const props = useContext(context);
    const setLoading = props?.setLoading;
    const navigate = useNavigation();
    const translate= props?.language;

    const schema = yup.object().shape({
        contactName: yup.string().required(translate?.USERSETTINGS?.NAMEISREQUIRED),
        email: yup.string().required(translate?.LOGINGPAGE?.EMAILISREQUIRED).email(translate?.LOGINGPAGE?.INVALIDEMAILID),
    })

    // use states
    const [userData, setUserData] = useState();
    const [countryList, setCountryList] = useState([]);
    const [locations, setLocations] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [floors, setFloors] = useState([{ label: translate?.REPORT?.SELECTFLOOR, value: null }]);
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
                locationId: Templocation,
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
                setBuildings([{ label: translate?.ROOMBOOKING?.SELECTBUILDING, value: null }, ...res.buildings.map(item => ({
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
                setFloors([{ label: translate?.REPORT?.SELECTFLOOR, value: null }, ...res?.floors.map(item => ({ label: item?.name, value: item?.id }))])
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
        console.log("postData", postData);
        updateUserProfile(postData).then(res => {
            if (res?.status) {
                Toast.showWithGravity(res?.information?.description, Toast.SHORT, Toast.BOTTOM);
                if (res?.user?.email !== userData?.user?.email) {
                    AsyncStorage.clear();
                    props?.setActive(1);
                    props?.setHeaderProps({});
                    navigate.navigate('LoginScreen');
                } else {
                    getUserData();
                }
            } else {
                console.log("Error update", res);
                Toast.showWithGravity(res?.information?.description, Toast.SHORT, Toast.BOTTOM);
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
                <Image style={styles.img} source={userData?.user?.profileImg ? { uri: userData?.user?.profileImg } : require('../../assets/user.png')} />
                <Text style={{ marginTop: 8, marginBottom: 4, fontWeight: 'bold' }}>{userData?.user?.firstName}</Text>
                <Text>{userData?.user?.role?.role}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>{translate?.MYPROFILE?.NAME} <Text style={styles.error}>*</Text></Text>
                <Controller
                    name='contactName'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder={translate?.VISITSETTING?.VISITOR?.PLACEHOLDER?.ENTERNAME}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors?.contactName && <Text style={styles.error}>{errors.contactName?.message}</Text>}
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>{translate?.MYPROFILE?.EMAIL} <Text style={styles.error}>*</Text></Text>
                <Controller
                    name='email'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder={translate?.VISITSETTING?.VISITOR?.PLACEHOLDER?.ENTEREMAIL}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors?.email && <Text style={styles.error}>{errors.email?.message}</Text>}
            </View>
            <View style={styles.rowcontainer}>
                {userData?.user?.role?.role !== 'USER' && <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{translate?.MYPROFILE?.COUNTRY}</Text>
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
                                placeholderStyle ={{color: '#a8a8a8'}}
                                selectedTextStyle={{ color: 'black' }}
                            />
                        )}
                    />
                </View>}
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{translate?.MYPROFILE?.LOCATION}</Text>
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
                                placeholderStyle ={{color: '#a8a8a8'}}
                                selectedTextStyle={{ color: 'black' }}
                            />
                        )}
                    />
                </View>
            </View>

            <View style={styles.rowcontainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{translate?.MYPROFILE?.BUILDING}</Text>
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
                                placeholder={translate?.ROOMBOOKING?.SELECTBUILDING}
                                placeholderStyle ={{color: '#a8a8a8'}}
                                selectedTextStyle={{ color: 'black' }}
                            />
                        )}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{translate?.MYPROFILE?.FLOOR}</Text>
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
                                placeholder={translate?.REPORTS?.SELECTFLOOR}
                                placeholderStyle ={{color: '#a8a8a8'}}
                                selectedTextStyle={{ color: 'black' }}
                            />
                        )}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>{translate?.MYPROFILE?.LANGUAGE}</Text>
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
                            placeholder='Select language'
                            placeholderStyle ={{color: '#a8a8a8'}}
                            selectedTextStyle={{ color: 'black' }}
                        />
                    )}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(updateProfile)}>
                <Text style={styles.buttonText}>{translate?.MYPROFILE?.SAVECHANGES}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f8f8'
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
        // borderWidth: 0.1,
        // borderColor: '#8a8a8a',
        borderRadius: 4,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        color: '#000',
        padding: 9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    dropdown: {
        // borderWidth: 1,
        // borderColor: '#8a8a8a',
        borderRadius: 4,
        padding: 10,
        shadowColor: "#000",
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    button: {
        marginTop: 30,
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