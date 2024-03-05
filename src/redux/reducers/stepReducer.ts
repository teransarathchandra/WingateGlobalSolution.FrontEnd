import { SET_CURRENT_STEP } from "../constants/stepConstants";

const initialState = {
    currentStep: 0,
};

const stepReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: action.payload,
            };
        default:
            return state;
    }
};

export default stepReducer;
