import api from "../utils/apiUtils";

export const getAllStocks = (aggType) => {
   if(aggType){
        return  api.get(`/stock?type=${aggType}`);
   }
   else{
        return api.get("/stock");
   }
    
};

export const updateStock = (id, stockData) => {
    console.log("new id", id)
    return api.put(`/stock/${id}`, { 
            "stockId" : stockData.stockId,
            "driverId"  : stockData.driverId
        
    });
};

export const deleteStock = (id) => {
    return api.delete(`/stock/${id}`);
};


