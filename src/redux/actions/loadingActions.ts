import { START_LOADING, STOP_LOADING } from '@app_redux/constants/loadingConstants';

export const startLoading = () => ({
    type: START_LOADING,
});

export const stopLoading = () => ({
    type: STOP_LOADING,
});