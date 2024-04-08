import api from "../utils/apiUtils";

export const getAllAirlines = () => {
        return api.get("/airline");
    
};

export const updateAirline = (id, airlineData) => {
    console.log("new id", id)
    return api.put(`/airline/${id}`, { 
            "code" : airlineData.code,
            "name"  : airlineData.name
        
    });
};

export const deleteAirline = (id) => {
    return api.delete(`/airline/${id}`);
};


