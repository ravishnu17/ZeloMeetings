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

//find By Buildings List based on location

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

//find By floors List based on building

export const findFloorsListBasedonBuildingId = async (id) => {
  const num = Number(id); 
  // /floor/listbybuilding?id=5214&status=true
  try {
    const response = await axiosInstance.get(`/floor/listbybuilding?id=${num}&status=${true}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// find customer Equipment List  based on location
export const findEquipmentsListBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customerequipment/listactivecustomerequipmentsid?customerLocationId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// find customer Equipment List  based on location
export const findEquipmentsListBasedonBuildingId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customerequipment/listactivecustomerequipmentsid?buildingId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


  // find customer It support Status  based on location
export const findCustomeritsupportsettingListBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customeritsupportsetting/find/bycustomerlocation?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

 // find customer It support List  based on location
 export const findITSupporttBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customeritsupport/listactive/bycustomerlocation?customerLocationId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


// find customer It support Status  based on building
export const findCustomeritsupportsettingListBasedonBuildingId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customeritsupportsetting/find/bybuilding?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


// find customer It support List  based on building
export const findITSupporttBasedonBuildingId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customeritsupport/listactive/bycustomerlocation?buildingId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}



// find catering customer setting Status  based on location

export const findCateringStatusBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customercateringsetting/find/bycustomerlocation?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}




// find catering List  based on location
export const findCateringListBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  // /customercatering/listactive/bycustomerlocation?customerLocationId=
  try {
    const response = await axiosInstance.get(`/customercatering/listactive/bycustomerlocation?customerLocationId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// find catering customer setting Status  based on building
export const findCateringStatusBasedonBasedonBuildingId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customercateringsetting/find/bybuilding?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// find catering List based on building
export const findCateringListBasedonBuildingId = async (id) => {
  const num = Number(id);
  // /customercatering/listactive/bycustomerlocation?customerLocationId=
  try {
    const response = await axiosInstance.get(`/customercatering/listactive/bycustomerlocation?buildingId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// find customer cleaning Status  based on location
export const findCustomerCleaningStatusBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  
  try {
    const response = await axiosInstance.get(`/customercleaning/find/bycustomerlocation?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
// find customer cleaning Status  based on building
export const findCustomerCleaningSattusBasedonBuildingId = async (id) => {
  const num = Number(id);
  // /customercleaning/find/bybuilding?id
  try {
    const response = await axiosInstance.get(`/customercleaning/find/bybuilding?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
// find customer mobile equipment Status  based on location
export const findCustomerMobileEquipmentStatusBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  // console.log("num ",num);
  try {
    const response = await axiosInstance.get(`/customermobileequipmentsetting/find/bycustomerlocation?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}



//find  customer mobile equipment List  based on location
export const findCustomerMobileEquipmentListBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customermobileequipment/listactive/bycustomerlocation?customerLocationId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


// find customer mobile equipment Status  based on building
export const findCustomerMobileEquipmentStatusBasedonBuildingId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customermobileequipmentsetting/find/bybuilding?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


//find  customer mobile equipment List  based on building  listactive/bybuilding

export const findCustomerMobileEquipmentListBasedonBuildingId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`customermobileequipment/listactive/bycustomerlocation?buildingId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

//find  customer special setting  based on location
export const findCustomerSpecialSettingBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customerspecialservicesetting/find/bycustomerlocation?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}



// find customer special setting List  based on location
export const findCustomerSpecialSettingListBasedonCustomerLocationId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customerspecialservice/listactive/bycustomerlocation?customerLocationId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

//find  customer special setting  based on building
export const findCustomerSpecialSettingBasedonBuildingId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customerspecialservicesetting/find/bybuilding?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


// find customer special setting List  based on building
export const findCustomerSpecialSettingListBasedonBuildingId = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/customerspecialservice/listactive/bycustomerlocation?buildingId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

//location and Building based

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

//Equiments and capacity and other 
export const getMeetingRoomListForEquipmentAndCapacity = async (location,building,startDate,startTime,endDate,endTime,equipment,capacity) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  // const equipmentId = Object.keys(equipment).filter(key=> equipment[key] === true).join(',');
  // Extract keys where value is true
const equipmentId = Object.keys(equipment).filter(key => equipment[key] === true).join(',');
  // console.log('equipment123456 ', equipmentId);

  // console.log("capacity ",capacity);

  const capacityId = Number(capacity);
  // console.log("Api inside" , "location ",locationId," building ",buildingId," start ",startDate," start time ",startTime," end ",endDate," end time ",endTime," equipment ",equipmentId," capacity ",capacityId);

  // console.log(" Object.Keys(equipmentId).length > 0",Object.Keys(equipmentId).length > 0);
  try {
    if(capacityId > 0 && equipmentId){
      // console.log("equipment",equipmentId ,"capacity",capacityId);
      const response=await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId :0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=${capacityId}`);
      return response.data;
    }else if(equipmentId){
      // console.log("equipment",equipmentId );
      const response=await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId :0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
      return response.data;
    }else if(capacityId > 0|| capacity === 0){
      // console.log("capacity",capacityId);

      const response=await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId :0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=${capacityId ? capacityId : capacity}`);
      return response.data;
      
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

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
export const visitorCreateAndUpdate = async (data) => {
  // const num = Number(id);
  try {
    const response = await axiosInstance.post('/visitor/createorupdate',data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
//find capacity location based
export const findCapacityLocationBased = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/booking/findcapacity?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

//find capacity building based
export const findCapacityBuildingBased = async (id) => {
  const num = Number(id);
  // /booking/findcapacity?buildingId=5214
  try {
    const response = await axiosInstance.get(`/booking/findcapacity?buildingId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


// Dashboard APIs
export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get(`/dashboardEndUser/dashboardenduserservice`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const updateBookingRequest = (id, status) => {
  try {
    const response = axiosInstance.put(`/booking/allowbookingbyenduser?id=${id}&status=${status}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Add Booking APIs

 export const addBookingApi = async (data) => {
  try {
    const response = await axiosInstance.post('/mrroom/booking/create', data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};