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

  const num = Number(id);

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

export const getMeetingRoomList = async (location, building, startDate, startTime, endDate, endTime) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  // const editBookingId = Number(bookingId);
  // console.log("location ",locationId," building ",buildingId," start ",startDate," start time ",startTime," end ",endDate," end time ",endTime);

  try {
    const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getEditMeetingRoomList = async (location, building, startDate, startTime, endDate, endTime, bookingId) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  const editBookingId = Number(bookingId);
  // console.log("location ",locationId," building ",buildingId," start ",startDate," start time ",startTime," end ",endDate," end time ",endTime);

  try {
    const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

//Equiments and capacity and other  Edit

export const getEditMeetingRoomListForEquipmentAndCapacity = async (location, building, startDate, startTime, endDate, endTime, equipment, capacity, floorList,bookingId) => {
//  console.log("Api intials stage  ","location ",location, " building ",building,"start ",startDate," start time ",startTime," end ",endDate," end time ",endTime," equipment ",equipment,"capacity", capacity,"floorList" ,floorList);
  const locationId = Number(location);
  const buildingId = Number(building);
  // const equipmentId = Object.keys(equipment).filter(key=> equipment[key] === true).join(',');
  // Extract keys where value is true
  const equipmentId = Object.keys(equipment).filter(key => equipment[key] === true).join(',');
  // console.log('equipment123456 ', equipmentId);

  // console.log("capacity ",capacity);

  const floorIds = Object.keys(floorList).filter(key => floorList[key] === true).join(',');
  // console.log("floor ",floorIds);

  const capacityId = Number(capacity);
  const editBookingId =Number(bookingId);
  

 
  // console.log("Api inside" , "location ",locationId," building ",buildingId," start ",startDate," start time ",startTime," end ",endDate," end time ",endTime," equipment ",equipmentId," capacity ",capacityId);

  // console.log(" Object.Keys(equipmentId).length > 0",Object.Keys(equipmentId).length > 0);
  try {
    if (capacityId > 0 && equipmentId && floorIds) {
      // console.log("API CALL",  "capacity",capacityId ,"equipment",equipmentId ,"floor",floorIds);
      // http://192.168.1.143:9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&floorId=5227&customerEquipmentIds=5320&startDate=2024-08-07&startTime=15:43&endDate=2024-08-07&endTime=16:13&editBookingId=0&capacityNumber=2
      const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=${capacityId}`);
      // const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=${capacityId}`);
      return response.data;
    }
    else if (capacityId > 0 && equipmentId) {
      // console.log("API CALL", "equipment",equipmentId ,"capacity",capacityId);
      // http://192.168.1.143:9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&customerEquipmentIds=5319&startDate=2024-08-07&startTime=15:43&endDate=2024-08-07&endTime=16:13&editBookingId=0&capacityNumber=
      // const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=${capacityId}`);
      const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=${capacityId}`);
      return response.data;
    } else if (equipmentId && floorIds) {
      // console.log("API CALL", "equipment",equipmentId ,"floor",floorIds,"start ",startDate," start time ",startTime," end ",endDate," end time ",endTime);
      const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds ? floorIds : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=0`);
      // const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
      return response.data;
    } else if (equipmentId) {
      // console.log("API CALL", "equipment",equipmentId);
      // http://192.168.1.143:9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&floorId=5227&customerEquipmentIds=5319&startDate=2024-08-07&startTime=15:43&endDate=2024-08-07&endTime=16:13&editBookingId=0&capacityNumber=0
      // 9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&customerEquipmentIds=5319&startDate=2024-08-07&startTime=15:43&endDate=2024-08-07&endTime=16:13&editBookingId=0&capacityNumber
      const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=0`);
     
      // const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
      return response.data;
    } else if ( capacityId > 0 ||  capacity === 0 && floorIds) {
      // console.log("floor and capacity" ,"capacity 0",capacityId ,"floor",floorIds);
      const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=${capacityId ? capacityId : capacity}`);
      return response.data;


    } else if (capacityId > 0 || capacity === 0) {
      // console.log("capacity",capacityId);

      const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=${capacityId ? capacityId : capacity}`);
      return response.data;

    } else if (floorIds) {
      // console.log(" only  floor ",floorIds);

      ///meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=6984&buildingId=176019&floorId=176050&startDate=2024-08-05&startTime=12:52&endDate=2024-08-05&endTime=13:22&editBookingId=0&capacityNumber=0
      const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId}&floorId=${floorIds}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=0`);
      return response.data;
    }else if(buildingId){
      // console.log(" only  building ",buildingId);
      // http://192.168.1.143:9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&startDate=2024-08-07&startTime=17:29&endDate=2024-08-07&endTime=17:59&editBookingId=0&capacityNumber=0
      const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=0`);
      return response.data;
    }else if(editBookingId){
      const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=0`);
      return response.data;
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

//Equiments and capacity and other 
export const getMeetingRoomListForEquipmentAndCapacity = async (location, building, startDate, startTime, endDate, endTime, equipment, capacity, floorList) => {
  //  console.log("Api intials stage  ","location ",location, " building ",building,"start ",startDate," start time ",startTime," end ",endDate," end time ",endTime," equipment ",equipment,"capacity", capacity,"floorList" ,floorList);
    const locationId = Number(location);
    const buildingId = Number(building);
    // const equipmentId = Object.keys(equipment).filter(key=> equipment[key] === true).join(',');
    // Extract keys where value is true
    const equipmentId = Object.keys(equipment).filter(key => equipment[key] === true).join(',');
    // console.log('equipment123456 ', equipmentId);
  
    // console.log("capacity ",capacity);
  
    const floorIds = Object.keys(floorList).filter(key => floorList[key] === true).join(',');
    // console.log("floor ",floorIds);
  
    const capacityId = Number(capacity);
  
  
    // console.log("Api inside" , "location ",locationId," building ",buildingId," start ",startDate," start time ",startTime," end ",endDate," end time ",endTime," equipment ",equipmentId," capacity ",capacityId);
  
    // console.log(" Object.Keys(equipmentId).length > 0",Object.Keys(equipmentId).length > 0);
    try {
      if (capacityId > 0 && equipmentId && floorIds) {
        // console.log("API CALL",  "capacity",capacityId ,"equipment",equipmentId ,"floor",floorIds);
        // http://192.168.1.143:9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&floorId=5227&customerEquipmentIds=5320&startDate=2024-08-07&startTime=15:43&endDate=2024-08-07&endTime=16:13&editBookingId=0&capacityNumber=2
        const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}&capacityNumber=0`);
        // const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=${capacityId}`);
        return response.data;
      }
      else if (capacityId > 0 && equipmentId) {
        // console.log("API CALL", "equipment",equipmentId ,"capacity",capacityId);
        // http://192.168.1.143:9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&customerEquipmentIds=5319&startDate=2024-08-07&startTime=15:43&endDate=2024-08-07&endTime=16:13&editBookingId=0&capacityNumber=
        // const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=${capacityId}`);
        const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=0`);
        return response.data;
      } else if (equipmentId && floorIds) {
        // console.log("API CALL", "equipment",equipmentId ,"floor",floorIds,"start ",startDate," start time ",startTime," end ",endDate," end time ",endTime);
        const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds ? floorIds : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=0`);
        // const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
        return response.data;
      } else if (equipmentId) {
        // console.log("API CALL", "equipment",equipmentId);
        // http://192.168.1.143:9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&floorId=5227&customerEquipmentIds=5319&startDate=2024-08-07&startTime=15:43&endDate=2024-08-07&endTime=16:13&editBookingId=0&capacityNumber=0
        // 9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&customerEquipmentIds=5319&startDate=2024-08-07&startTime=15:43&endDate=2024-08-07&endTime=16:13&editBookingId=0&capacityNumber
        const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=0`);
       
        // const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&customerEquipmentIds=${equipmentId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
        return response.data;
      } else if ( capacityId > 0 ||  capacity === 0 && floorIds) {
        // console.log("floor and capacity" ,"capacity 0",capacityId ,"floor",floorIds);
        const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=${capacityId ? capacityId : capacity}`);
        return response.data;
  
  
      } else if (capacityId > 0 || capacity === 0) {
        // console.log("capacity",capacityId);
  
        const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=${capacityId ? capacityId : capacity}`);
        return response.data;
  
      } else if (floorIds) {
        // console.log(" only  floor ",floorIds);
  
        ///meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=6984&buildingId=176019&floorId=176050&startDate=2024-08-05&startTime=12:52&endDate=2024-08-05&endTime=13:22&editBookingId=0&capacityNumber=0
        const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId}&floorId=${floorIds}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=0`);
        return response.data;
      }else if(buildingId){
        // console.log(" only  building ",buildingId);
        // http://192.168.1.143:9092/mrroom/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=3128&buildingId=5104&startDate=2024-08-07&startTime=17:29&endDate=2024-08-07&endTime=17:59&editBookingId=0&capacityNumber=0
        const response = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&capacityNumber=0`);
        return response.data;
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

export const getDeskList = async (location, building, startDate, startTime, endDate, endTime, checkedFloors) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  const floorIds = Object.keys(checkedFloors).filter(key => checkedFloors[key] === true).join(',');
  // const editBookingId = Number(bookingId);
  try {
    if (floorIds) {
      // console.log("Desk floor ",floorIds);
      const response = await axiosInstance.get(`/desk/listdesks/bylocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds} &startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
      return response.data;
    } else {
      // console.log("Desk Building ",buildingId);
      const response = await axiosInstance.get(`/desk/listdesks/bylocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
      return response.data;
    }

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


export const getEditDeskList = async (location, building, startDate, startTime, endDate, endTime, checkedFloors,bookingId) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  const floorIds = Object.keys(checkedFloors).filter(key => checkedFloors[key] === true).join(',');
  const editBookingId = Number(bookingId);
  try {
    if (floorIds) {
      // console.log("Desk floor ",floorIds);
      const response = await axiosInstance.get(`/desk/listdesks/bylocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds} &startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}`);
      return response.data;
    } else {
      // console.log("Desk Building ",buildingId);
      const response = await axiosInstance.get(`/desk/listdesks/bylocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}`);
      return response.data;
    }

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
export const getParkingSeatList = async (location, building, startDate, startTime, endDate, endTime, checkedFloors) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  const floorIds = Object.keys(checkedFloors).filter(key => checkedFloors[key] === true).join(',');
  try {
    if (floorIds) {
      // console.log("parking seat floor ",floorIds);
      const response = await axiosInstance.get(`/parkingSeat/listparkingseats/bycustomerlocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
      return response.data;
    } else {
      const response = await axiosInstance.get(`/parkingSeat/listparkingseats/bycustomerlocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
      return response.data;
    }

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
export const getEditParkingSeatList = async (location, building, startDate, startTime, endDate, endTime, checkedFloors,bookingId) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  const editBookingId = Number(bookingId);
  const floorIds = Object.keys(checkedFloors).filter(key => checkedFloors[key] === true).join(',');
  try {
    if (floorIds) {
      // console.log("parking seat floor ",floorIds);
      const response = await axiosInstance.get(`/parkingSeat/listparkingseats/bycustomerlocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&floorId=${floorIds}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}`);
      return response.data;
    } else {
      const response = await axiosInstance.get(`/parkingSeat/listparkingseats/bycustomerlocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId ? buildingId : 0}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}`);
      return response.data;
    }

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

//charging car Add booking Api LOcation Based
export const getChargingCarListGetLocationBased = async (location, startDate, startTime, endDate, endTime) => {
  const locationId = Number(location);
  
  try {
    const response = await axiosInstance.get(`/chargingcar/listchargingcars/bycustomerlocationandtime/v1?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

//charging car Add booking Apis  Building Based
export const getChargingCarListGetBuildingBased = async (location, building, startDate, startTime, endDate, endTime) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  try {   
    const response = await axiosInstance.get(`/chargingcar/listchargingcars/bycustomerlocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
  }

  //charging car Add booking Apis  Floor Based

export const getChargingCarListGetFloorBased = async (location, building, checkedFloors, startDate, startTime, endDate, endTime) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  const floorIds = Object.keys(checkedFloors).filter(key => checkedFloors[key] === true).join(',');
  try {
    const response = await axiosInstance.get(`/chargingcar/listchargingcars/bycustomerlocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId}&floorId=${floorIds}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


// Edit Charging car Apis
//charging car Add booking Api LOcation Based
export const getChargingCarListGetLocationBasedEdit = async (location, startDate, startTime, endDate, endTime, bookingId) => {
  const locationId = Number(location);
  const editBookingId = Number(bookingId);
  
  try {
    const response = await axiosInstance.get(`/chargingcar/listchargingcars/bycustomerlocationandtime/v1?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

//charging car Add booking Apis  Building Based
export const getChargingCarListGetBuildingBasedEdit = async (location, building, startDate, startTime, endDate, endTime, bookingId) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  const editBookingId = Number(bookingId);
  try {   
    const response = await axiosInstance.get(`/chargingcar/listchargingcars/bycustomerlocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
  }

  //charging car Add booking Apis  Floor Based

export const getChargingCarListGetFloorBasedEdit = async (location, building, checkedFloors, startDate, startTime, endDate, endTime, bookingId) => {
  const locationId = Number(location);
  const buildingId = Number(building);
  const floorIds = Object.keys(checkedFloors).filter(key => checkedFloors[key] === true).join(',');
  const editBookingId = Number(bookingId);
  try {
    const response = await axiosInstance.get(`/chargingcar/listchargingcars/bycustomerlocationandtime/v1?customerLocationId=${locationId}&buildingId=${buildingId}&floorId=${floorIds}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${editBookingId}`);
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
    const response = await axiosInstance.post('/visitor/createorupdate', data);
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

// Update Booking Request
export const updateBookingRequest = async (id, status) => {
  try {
    const response = await axiosInstance.get(`/booking/allowbookingbyenduser?id=${id}&status=${status}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


// Add Booking APIs

export const addBookingApi = async (data) => {
  // console.log("data Api");
  try {
    const response = await axiosInstance.post('/booking/create', data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// find booking by id
export const findBookingById = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/booking/find?id=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


//calender fiter Api

// /booking/listbyfilters?bookingType=meetingRoom&customerLocationId=6984&startDate=2024-08-01&endDate=2024-08-01&buildingList=0&floorList=0

export const getCalenderData = async (bookingType, customerLocationId, startDate, endDate, buildingList, floorList) => {
  // console.log("calenderApi Filter",    "bookingType ",bookingType," customerLocationId ",customerLocationId," startDate ",startDate," endDate ",endDate," buildingList ",buildingList," floorList ",floorList);
  if (bookingType && customerLocationId && startDate && endDate) {
    try {
      const response = await axiosInstance.get(`/booking/listbyfilters?bookingType=${bookingType}&customerLocationId=${customerLocationId}&startDate=${startDate}&endDate=${endDate}&buildingList=${buildingList ? buildingList : 0}&floorList=${floorList ? floorList : 0}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }

  }

}

// filter calender for resource based

export const getCalenderResourceData = async (resource) => {

  try {
    const response = await axiosInstance.post(`/booking/listbyfilterswithresource`, resource);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


//list of meeting room  based on location /meetingRoom/listmeetingroomsbylocation?customerLocationId=4540
export const locationBasedCalenderMeetingRoom = async (id) => {
  const num = Number(id);
  try {
    const response = await axiosInstance.get(`/meetingRoom/listmeetingroomsbylocation?customerLocationId=${num}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Rooms APIs

// get meeting rooms
export const getMeetingRoomsByLocationId = async (customerLocationId) => {
  try {
    const response = await axiosInstance.get(`/meetingRoom/listmeetingroomsbylocation?customerLocationId=${customerLocationId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
  }
}

// get desks
export const getDesksByLocationId = async (customerLocationId) => {
  try {
    const response = await axiosInstance.get(`/desk/listdesksbylocation?customerLocationId=${customerLocationId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
  }
}

// get Parling Seat
export const getParkingSeatByLocationId = async (customerLocationId) => {
  try {
    const response = await axiosInstance.get(`/parkingSeat/listparkingseats/bycustomerlocation?customerLocationId=${customerLocationId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
  }
}

//new api
// /meetingRoom/listMeetingRoom?buildingId=5104&floorId=0

export const getMeetingRoomListBuildingAndFloor = async (buildingId, floorId) => {

  try {
    const response = await axiosInstance.get(`/meetingRoom/listMeetingRoom?buildingId=${buildingId}&floorId=${floorId ? floorId : 0}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }

}

export const getDeskListBuildingAndFloor = async (buildingId, floorId) => {

  try {
    const response = await axiosInstance.get(`/desk/desklistbyBuildingFloor?buildingId=${buildingId}&floorId=${floorId ? floorId : 0}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }

}

export const getParkingSeatListBuildingAndFloor = async (buildingId, floorId) => {

  try {
    const response = await axiosInstance.get(`/parkingSeat/parkingSeatbyBuildingFloor?buildingId=${buildingId}&floorId=${floorId ? floorId : 0}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }

}

// Room filters API

export const findMeetingRoomsbyFilters = async (locationId, equipmentIds, startDate, startTime, endDate, endTime, buildingId, floorId) => {
  try {
    const res = await axiosInstance.get(`/meetingRoom/listmeetingrooms/bylocationandequipmentandtime?customerLocationId=${locationId}&customerEquipmentIds=${equipmentIds}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0${buildingId ? `&buildingId=${buildingId}` : ''}${floorId ? `&floorId=${floorId}` : ''}`);
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const findDesksbyFilters = async (locationId, startDate, startTime, endDate, endTime, buildingId, floorId) => {
  try {
    const res = await axiosInstance.get(`/desk/listdesks/bylocationandtime?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0${buildingId ? `&buildingId=${buildingId}` : ''}${floorId ? `&floorId=${floorId}` : ''}`);
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const findParkingSeatbyFilters = async (locationId, startDate, startTime, endDate, endTime, buildingId, floorId) => {
  try {
    const res = await axiosInstance.get(`/parkingSeat/listparkingseats/bycustomerlocationandtime?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0${buildingId ? `&buildingId=${buildingId}` : ''}${floorId ? `&floorId=${floorId}` : ''}`);
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const findAllResourceByBuildingId= async (buildingId)=>{
  try{
    const res= await axiosInstance.get(`/building/filterallresourcebybuilding?id=${buildingId}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const findEquipmentByBuildingId= async (buildingId)=>{
  try{
    const res= await axiosInstance.get(`/customerequipment/listactivecustomerequipmentsbybuilding?id=${buildingId}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const floorListbyBuildingId =async (buildingId)=>{
  try{
    const res=await axiosInstance.get(`/floor/listactive?id=${buildingId}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const FloorBasedFilter=async (floorID)=>{
  try{
    const res=await axiosInstance.get(`/floor/floorBasedFilter?id=${floorID}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

// Report screen API
export const EquipmentByRoomId=async (roomId)=>{
  try{
    const res=await axiosInstance.get(`/meetingRoomEquipment/listmeetingroomequipmentsbymeetingroom?meetingRoomId=${roomId}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

// Report module API
export const reportEquipment = async (data)=>{
  try{
    const res=await axiosInstance.post(`/reportEquipment/reportbyenduser`,data);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const ResolveEquipmentReport = async (data)=>{
  try{
    const res=await axiosInstance.post(`/reportEquipment/fixbycustomeradmin`,data);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

// Profile screen API
export const getCountryList = async ()=>{
  try{
    const res=await axiosInstance.get(`/country/listactivecountries`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const getCustomerLoationByCountryId= async (countryId)=>{
  try{
    const res=await axiosInstance.get(`/customerlocation/listactive/bycountry?id=${countryId}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const updateUserProfile = async (data)=>{
  try{
    const res= await axiosInstance.put(`/user/update`,data);
    return res.data
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

// Dashboard screen charging car
export const getChargingCarList = async (locationId)=>{
  try{
    const res=await axiosInstance.get(`chargingcar/listchargings/bycustomerlocation?customerLocationId=${locationId}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

// Rooms API charging car
export const getChargingCarListWithFilter = async (locationId, startDate,startTime, endDate, endTime, buildingId, floorId)=>{
  try{
    const res=await axiosInstance.get(`/chargingcar/listchargingcars/bycustomerlocationandtime?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0${buildingId ? '&buildingId='+buildingId:''}${floorId ? '&floorId='+floorId:''}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

// charging car in calendar view
export const getChargingCarByBuildingFloor =async (buildingId, floorId) =>{
  try{
    const res=await axiosInstance.get(`/chargingcar/chargingCarlistbyBuildingFloor?buildingId=${buildingId}&floorId=${floorId ? floorId : 0}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

// Calendar 
// Cars
export const getCarListByLocation = async (locationId)=>{
  try{
    const res=await axiosInstance.get(`/car/list/bycustomerlocationId?customerLocationId=${locationId}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const getCarByBuildingFloor = async (buildingId, floorId)=>{
  try{
    const res=await axiosInstance.get(`/car/listCarbyBuilding?buildingId=${buildingId}&floorId=${floorId ? floorId : 0}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

//car Booking  filter Apis

export const getLocationbasedCars = async (location, startDate,startTime, endDate, endTime) =>{
  const locationId = Number(location);
  try{
    const res =await axiosInstance.get(`/car/list/bylocationandtime?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&buildingId=0&floorId=`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const getBuildingbasedCars = async (location,building, startDate,startTime, endDate, endTime) =>{
  const locationId = Number(location);
  const buildingId = Number(building);

  try{
    const res =await axiosInstance.get(`/car/list/bylocationandtime?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&buildingId=${buildingId}&floorId=`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const getFloorbasedCars = async (location,building,checkedFloors, startDate,startTime, endDate, endTime) =>{
  const locationId = Number(location);
  const buildingId = Number(building);
  const floorIds = Object.keys(checkedFloors).filter(key => checkedFloors[key] === true).join(',');

  try{
    const res =await axiosInstance.get(`/car/list/bylocationandtime?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=0&buildingId=${buildingId}&floorId=${floorIds}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}


//car EditBooking  filter Apis

export const getEditBookingLocationbasedCars = async (location, startDate,startTime, endDate, endTime,editBookingId) =>{
  const locationId = Number(location);
  const bookingId=Number(editBookingId);
  // console.log("locationId",locationId);
  // console.log("bookingId",bookingId);
  // console.log("startDate",startDate,"startTime",startTime,"endDate",endDate,"endTime",endTime );

  // /car/list/bylocationandtime?customerLocationId=3128&startDate=2024-08-21&startTime=21:12&endDate=2024-08-21&endTime=21:41&editBookingId=5493&buildingId=0&floorId=0
  try{
    const res =await axiosInstance.get(`/car/list/bylocationandtime?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${bookingId}&buildingId=0&floorId=0`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const getEditBookingBuildingbasedCars = async (location,building, startDate,startTime, endDate, endTime,editBookingId) =>{
  const locationId = Number(location);
  const buildingId = Number(building);
  const bookingId=Number(editBookingId);

  try{
    const res =await axiosInstance.get(`/car/list/bylocationandtime?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${bookingId}&buildingId=${buildingId}&floorId=0`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const getEditBookingFloorbasedCars = async (location,building,checkedFloors, startDate,startTime, endDate, endTime,editBookingId) =>{
  const locationId = Number(location);
  const buildingId = Number(building);
  const floorIds = Object.keys(checkedFloors).filter(key => checkedFloors[key] === true).join(',');
  const bookingId=Number(editBookingId);

  try{
    const res =await axiosInstance.get(`/car/list/bylocationandtime?customerLocationId=${locationId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&editBookingId=${bookingId}&buildingId=${buildingId}&floorId=${floorIds}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

// QR find resource
export const resourceCheckIn = async (resourceId)=>{
  try{
    const res=await axiosInstance.get(`/checkInCheckOut/verifyCheckin?meetingRoomId=${resourceId}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}

export const AddCheckIn = async (bookingId, meetingsroomId)=>{
  try{
    const res=await axiosInstance.get(`/checkInCheckOut/doCheckin?bookingId=${bookingId}&meetingRoomId=${meetingsroomId}`);
    return res.data;
  }catch(error){
    console.error('API Error:', error);
    throw error;
  }
}