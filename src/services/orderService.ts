import api from "@app_utils/apiUtils";

export const getAllOrders = (aggType?) => {
  if (aggType) {
    return api
      .get(`/order?type=${aggType}`)
      .then((response) => response.data)
      .catch((error) => error.message);
  } else {
    return api
      .get("/order")
      .then((response) => response.data)
      .catch((error) => error.message);
  }
};

export const getAllOrderTransport = (aggType) => {
  if (aggType) {
    return api
      .get(`/order/orderTransport?type=${aggType}`)
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
  } else {
    return api
      .get("/order/orderTransport")
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
  }
};

export const getAllOrderInfo = (aggType) => {
  if (aggType) {
    return api
      .get(`/order/orderInfo?type=${aggType}`)
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
  } else {
    return api
      .get("/order/orderInfo")
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
  }
};

export const getOrderById = (id) => {
  return api
    .get(`/order/byObjectId/${id}`)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const getOrderByOrderId = (orderId) => {
    return api.get(`/order/byOrderId`, { params: { orderId } })
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const createOrder = (orderData) => {
  return api
    .post("/order", orderData)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const updateOrder = (id, orderData) => {
  return api
    .put(`/order/${id}`, orderData)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const updateOrderAndItem = (id, orderData) => {
  return api
    .put(`/order/updateOrderAndItem/${id}`, orderData)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const deleteOrder = (id) => {
  return api
    .delete(`/order/${id}`)
    .then((response) => response.data)
    .catch((error) => error.message);
};
