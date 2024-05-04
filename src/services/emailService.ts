import api from "@app_utils/apiUtils";

export const sendEmail = (emailData) => {
    return api.post("/email", emailData)
        .then((response) => response.data)
        .catch((error) => error.message);
};