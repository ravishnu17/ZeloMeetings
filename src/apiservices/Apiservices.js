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
  // console.log("test user Id",num);
  try {
    const response = await axiosInstance.get(`/user/find?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};



// export const searchByEmailIdVisitor = async (email, displayId) => {
//   const num= Number(email);
//   try {
//     const response = await axiosInstance.get(`/visitDisplay/checkin/findEmail?email=${email}&displayId=${displayId}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


// export const searchByEmailIdCheckOut = async (email, displayId) => {
//   try {
//     const response = await axiosInstance.get(`/visitDisplay/checkout/findEmail?email=${email}&displayId=${displayId}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const findVisitDetails = async (id) => {
//   const num= Number(id);
//   try {
//     const response = await axiosInstance.get(`/visit/find?id=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };
// export const findVisitorDetails = async (id) => {
//   const num= Number(id);
//   try {
//     const response = await axiosInstance.get(`/visitor/find?id=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const findVisitorValidation = async () => {
//   // console.log("findVisitorDetails",id);
//   // const num= Number(id);
//   try {
//     const response = await axiosInstance.get(`/visitorfields/find`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


// export const findVisitValidationByLocation = async (id) => {
//   // console.log("findVisitorDetails",id);
//   // const num= Number(id);
//   try {
//     const response = await axiosInstance.get(`/visitFields/getbycustomerlocation?id=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const findVisitValidationBuilding = async (id) => {
//   // console.log("findVisitorDetails",id);
//   // const num= Number(id);
//   try {
//     const response = await axiosInstance.get(`/visitFields/getbycustomerbuilding?id=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const findUserANDLocationAndCarrierList = async () => {
//   // console.log("findVisitorDetails",id);
//   // const num= Number(id);
//   try {
//     const response = await axiosInstance.get('/visitDisplay/commondataslist');
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


export const getLocationlist = async (type) => {
  try {
    const response = await axiosInstance.get(`/customerlocation/listactive`);
    // const response = await axiosInstance.get(`/visitDisplay/commondataslist?type=${type}`);
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



export const getVisitorList = async () => {
  try {
    const response = await axiosInstance.get(`/visitor/nameList`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

