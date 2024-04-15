import { IPackageType } from "@app_interfaces/IPackageType";
import api from "@app_utils/apiUtils";

export const getAllPackageTypes = () => {
        return api.get<IPackageType>("/packageType")
                .then((response) => response.data)
                .catch((error) => error.message);
};