import api from "@app_utils/apiUtils";

export const verifyUser = (token) => {
    return api.get(`/user/verify-email/${token}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};