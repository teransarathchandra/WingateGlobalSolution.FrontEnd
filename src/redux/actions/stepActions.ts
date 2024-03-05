import { SET_CURRENT_STEP } from "../constants/stepConstants";

export const setCurrentStep = (stepIndex) => {
    return {
        type: SET_CURRENT_STEP,
        payload: stepIndex,
    };
};