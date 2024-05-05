import { useNavigate } from 'react-router-dom';
import toastUtil from './toastUtil';
import { canAccess } from "@app_services/employeeService";
export function useAppNavigation() {
    const navigate = useNavigate();

    const handleAppNavigation = async (eventKey, accessToken) => {

        if (accessToken) {
            const route = eventKey.toString();
            const accessData = {
                token: accessToken,
                destination: route
            }
            toastUtil.info("Waiting For Access!");
            const fallback = "/app/portal-welcome"

            await canAccess(accessData).then(response => {
                if (response.data && response.data.destination) {
                    navigate(response.data.destination);
                } else {
                    console.error('No page URL found in the response');
                    navigate(fallback);
                }
            })
                .catch(error => {
                    console.error('Error accessing data:', error);
                    navigate(error.destination || fallback);
                });

        } else {
            toastUtil.error("Access Denied!");
        }
    };

    const shouldContinueAppNavigation = async (eventKey, accessToken) => {
        debugger;
        if (accessToken) {
            const route = eventKey;
            const accessData = {
                token: accessToken,
                destination: route
            }
            toastUtil.info("Waiting For Access!");
            const fallback = "app/portal-welcome"
            return await canAccess(accessData).then(response => {

                console.log('Resp:', response);
                if (response.data && response.data.destination) {
                    return true;
                } else {
                    console.error('No page URL found in the response');
                    return false;
                }
            })
                .catch(error => {
                    console.error('Error accessing data:', error);
                    return false;
                });;

        } else {
            toastUtil.error("Access Denied!");
            return false;
        }
    };

    return { handleAppNavigation, shouldContinueAppNavigation };
}
