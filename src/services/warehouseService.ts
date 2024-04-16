import api from "@app_utils/apiUtils";

export const getAllWarehouse = () => {
  return api.get(`/warehouse`);
};

export const getWarehouseById = (id) => {
  return api.get(`/warehouse/${id}`);
};

export const createWarehouse = (warehouseData) => {
  return api.post("/warehouse", warehouseData);
};

export const updateWarehouse = (id, warehouseData) => {
  return api.put(`/warehouse/${id}`, warehouseData);
};

export const deleteWarehouse = (id) => {
  return api.delete(`/warehouse/${id}`);
};
