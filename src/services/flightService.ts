import api from "../utils/apiUtils";

export const getAllFlights = (aggFlight) => {
   if(aggFlight){
        return  api.get(`/flight?type=${aggFlight}`);
   }
   else{
        return api.get("/flight");
   }
    
};

export const updateFlight = (id, flightData) => {
    console.log("new id", id)
    return api.put(`/flight/${id}`, { 
            "arrivalTime" : flightData.arrivalTime, 
            "departureTime"  : flightData.departureTime, 
            "routeCostPerKilo": flightData.routeCostPerKilo
        
    });
};

export const deleteFlight = (id) => {
    return api.delete(`/flight/${id}`);
};


