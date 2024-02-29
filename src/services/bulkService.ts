import api from "../utils/apiUtils";

export const getAllBulks = () => {
    return api.get("/bulk");
};

