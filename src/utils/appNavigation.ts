import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastUtil from './toastUtil';
import { canAccess } from "@app_services/employeeService";
export function useAppNavigation() {
    const navigate = useNavigate();

    const handleAppNavigation = async (eventKey, accessToken) => {
        if (accessToken) {
            const route = eventKey;
            const accessData = {
                token: accessToken,
                destination: route
            }
            toastUtil.info("Waiting For Access!");
            await canAccess(accessData);
            navigate(route);
        } else {
            toastUtil.error("Access Denied!");
        }
    };

    return { handleAppNavigation };
}
