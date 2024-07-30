// /* eslint-disable prettier/prettier */
// // services/apiservices.js

import axios from 'axios';
import axiosInstance from '../auth/Authcontent';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const loginUser = async (userData) => {
  try {
    // const response = await axios.post(`${apiUrl}/user/login`, userData);
    const response = await axiosInstance.post('/user/login', userData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


export const loginHomeAccess = async (id) => {

  const num= Number(id);
 
  try {
    const response = await axiosInstance.get(`/user/find?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};



export const getLocationlist = async (type) => {
  try {
    const response = await axiosInstance.get(`/customerlocation/listactive`);
  
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const findBuildingListBasedonLocationId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/building/listbycustomerlocation?id=${num}&status=${true}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const findEquipmentsListBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  // /customerequipment/listactivecustomerequipmentsid?customerLocationId=6984
  try {
    const response = await axiosInstance.get(`/customerequipment/listactivecustomerequipmentsid?customerLocationId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
export const findCustomeritsupportsettingListBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  // /customeritsupportsetting/find/bycustomerlocation?id=6984
  try {
    const response = await axiosInstance.get(`/customeritsupportsetting/find/bycustomerlocation?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
export const findITSupporttBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  // /customeritsupport/listactive/bycustomerlocation?customerLocationId=6984
  try {
    const response = await axiosInstance.get(`/customeritsupport/listactive/bycustomerlocation?customerLocationId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const findMobileEquipmentsBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  // customermobileequipmentsetting/find/bycustomerlocation?id=6984
  try {
    const response = await axiosInstance.get(`customermobileequipmentsetting/find/bycustomerlocation?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const  getMeetingRoomList = async (location,building,startDate,startTime,endDate,endTime) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  // console.log("location ",locationId," building ",buildingId," start ",startDate," start time ",startTime," end ",endDate," end time ",endTime);

  try {
    const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getDeskList = async (location,building,startDate,startTime,endDate,endTime) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  try {
    const response = await axiosInstance.get(`/desk/listdesks/bylocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
 export const getParkingSeatList = async (location,building,startDate,startTime,endDate,endTime) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  //2024-07-30
  //09:59
  try {
    const response = await axiosInstance.get(`/parkingSeat/listparkingseats/bycustomerlocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

 export const getEndUserList = async () => {
  try {
    const response = await axiosInstance.get(`/user/listactiveendusersforbooking`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getVisitorList = async () => {
  try {
    const response = await axiosInstance.get(`/visitor/nameList`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

