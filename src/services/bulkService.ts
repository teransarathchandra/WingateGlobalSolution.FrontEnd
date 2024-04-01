import api from "../utils/apiUtils";

export const getAllBulks = (aggType) => {
   if(aggType){
        return  api.get(`/bulk?type=${aggType}`);
   }
   else{
        return api.get("/bulk");
   }
    
};

export const updateBulk = (id, bulkData) => {
    console.log("new id", id)
    return api.put(`/bulk/${id}`, { 
            "flightId" : bulkData.flightId,
            "masterAirwayBillId"  : bulkData.masterAirwayBillId
        
    });
};

export const deleteBulk = (id) => {
    return api.delete(`/bulk/${id}`);
};


