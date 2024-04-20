import api from "@app_utils/apiUtils";

export const getAllWarehouse = (aggType) => {
  if (aggType) {
      return api.get(`/warehouse?type=${aggType}`)
      .then((result) => result.data)
      .catch((error) => {console.log(error); });
  } else {
      return api.get("/warehouse")
      .then((result) => result.data)
      .catch((error) => {console.log(error); });
  }
};

export const getWarehouseById = (id) => {
  return api.get(`/warehouse/${id}`);
};

export const createWarehouse = (warehouseData) => {
  return api.post("/warehouse", warehouseData);
};

export const updateWarehouse = async (id, warehouseData) => {
       const { data } = await api
      .patch(`/warehouse/${id}`, { storageCapacity: warehouseData.storageCapacity, availability: warehouseData.availability, location: warehouseData.location })
      .then((result) => result.data)
      .catch((error) => {
          console.log(error);});
          return data;
        };

export const deleteWarehouse = (id) => {
  return api.delete(`/warehouse/${id}`)
  .then((result) => result.data)
  .catch((error) => {console.log(error); });

};
