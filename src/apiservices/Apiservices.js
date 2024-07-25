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


// export const loginHomeAccess = async (id) => {
//   const num= Number(id);
//   try {
//     const response = await axiosInstance.get(`/user/find?id=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };



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


// export const getLocationlist = async (type) => {
//   try {
//     const response = await axiosInstance.get(`/customerlocation/listactiveandvisitstatus?type=${type}`);
//     // const response = await axiosInstance.get(`/visitDisplay/commondataslist?type=${type}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const findBuildingListBasedonLocationId = async (id, type) => {
//   const num = Number(id);
//   try {
//     const response = await axiosInstance.get(`/building/listactivevisitstatus?id=${num}&type=${type}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const sendDisplayData = async (osType,serialNumber,udids) => {
//   // console.log("findVisitorDetails",id);
//   // const num= Number(id)
// ;
//   try {
//     const response = await axiosInstance.get(`/display/visit/setDetails?os=${osType}&serialNo=${serialNumber}&udid=${udids}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


// export const getDisplayInformations = async (id) => {
//   try {
//     const response = await axiosInstance.get(`/display/find?id=${id}`);
//     let path = response.data?.display?.imagePath?response.data?.display?.imagePath:'';
//     AsyncStorage.setItem('bgImagePath',path);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const intervalTime = ()=>{
//   return 10000
// }


// export const createVisitANDupdateVisit = async (id) => {
//   // const num= Number(id);
//   try {
//     const response = await axiosInstance.post(`/visit/create?id=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


// export const visitorCreateAndUpdate = async (data) => {
//   // const num = Number(id);
//   try {
//     const response = await axiosInstance.post('/visitor/createorupdate',data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };
// export const createVisit = async (visitData) => {
//   // const num= Number(id);
//   try {
//     const response = await axiosInstance.post('/visit/mobilevisit/create',visitData);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };
// export const updateVisit = async (visitData) => {
//   // const num= Number(id);
//   try {
//     const response = await axiosInstance.put('/visit/update',visitData);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };



// export const checkInFirstlevel = async (id) => {
//   // console.log("findVisitorDetails",id);
//   const num = Number(id);
//   try {
//     const response = await axiosInstance.get(`/visit/firstLevelCheckIn?visitId=${num}`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


// export const checkInSecondlevel = async (id) => {
//   // console.log("findVisitorDetails",id);
//   const num = Number(id);
//   try {
//     const response = await axiosInstance.get(`/visit/secondLevelCheckIn?visitId=${num}`);
//     console.log("response",response);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const visitCheckOut = async (id,removeDataStatus) => {
//   const num = Number(id);
//   try {
//     const response = await axiosInstance.get('/visit/checkout', {
//       params: {
//         id: num,
//         removeDataStatus: removeDataStatus,
//       },
//     })
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };





// export const getVisitorList = async () => {
//   try {
//     const response = await axiosInstance.get(`/visitor/nameList`);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const AddOrder = async (data) => {
//   try {
//     const response = await axiosInstance.post(`order/create`,data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };