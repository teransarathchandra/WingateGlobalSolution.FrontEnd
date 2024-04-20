import logo from "@app_assets/images/logo.png";
import {
    DetailsDiv,
} from "@app_styles/trackOrder.styles";
import { Button, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getOrderByOrderId } from "@app_services/orderService";
import { useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { orderTrackingSchema } from "@app_schemas/orderTrackingSchema";
import ButtonSpinner from "@app_styles/shared/buttonSpinner.styles";
import { FlexRow } from "@app_styles/shared/commonStyles.style";
import { HomeSection } from "@app_styles/home.styles";
import { motion } from "framer-motion";
import floatAnimation from "@app_common/animations/floatAnimation";
import { HeadingSection } from "@app_styles/shared/heading.styles";

interface OrderDetails {
    _id: string;
    orderId: string;
    currentLocation: string;
    arrivedTime: string;
}

interface FormValues {
    orderId: string;
}

const TrackOrder = () => {

    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<FormValues>({
        resolver: yupResolver(orderTrackingSchema),
        mode: 'onTouched'
    });

    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

    const fetchOrderDetails = async (orderId) => {
        setIsLoading(true);
        try {
            const { data } = await getOrderByOrderId(orderId);
            setOrderDetails(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = useCallback((data) => {
        fetchOrderDetails(data.orderId);
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const orderIdFromQuery = queryParams.get('orderId');
        if (orderIdFromQuery) {
            setValue('orderId', orderIdFromQuery, { shouldValidate: true });
            trigger('orderId').then((isValid) => {
                if (isValid) {
                    handleSubmit(onSubmit)();
                }
            });
        }
    }, [location, setValue, trigger, handleSubmit, onSubmit]);

    return (
        <>
            <HomeSection>
                <motion.div className="welcome-image" {...floatAnimation}>
                    <img src={logo} alt="Winagate Logo" style={{ width: '300px', height: '300px', filter: 'drop-shadow(5px 5px 5px #222)' }} />
                </motion.div>
                <div style={{ maxWidth: '400px', minWidth: '400px', width: '100%' }}>
                    <FlexRow justifyContent="center" alignItems="center" width="100%" margin="1rem 0 0 0" flexDirection="column">
                        <HeadingSection style={{ maxWidth: '400px', minWidth: '400px', width: '100%' }}>
                            <h1>Welcome!</h1>
                            <p>Please enter your tracking order number</p>
                        </HeadingSection>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', minWidth: '400px', width: '100%', marginTop: '1rem' }}>
                                <TextField
                                    size="small"
                                    label="Order Number"
                                    fullWidth
                                    {...register("orderId")}
                                    error={!!errors.orderId}
                                    helperText={errors?.orderId?.message as string}
                                />
                                {/* <Button type="submit">Track</Button> */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    disabled={isLoading}
                                    style={{ color: '#ffffff', cursor: 'pointer', marginTop: '1rem' }}
                                    fullWidth
                                >
                                    {isLoading ? (
                                        <>
                                            <ButtonSpinner />
                                            <span style={{ paddingLeft: '5px' }}>Tracking Order...</span>
                                        </>
                                    ) : (
                                        'Track Your Order'
                                    )}
                                </Button>
                        </form>
                    </FlexRow>
                    <FlexRow justifyContent="center" alignItems="center" width="100%">
                        {orderDetails && (
                            <DetailsDiv>
                                <p style={{ fontSize: "25px", marginLeft: "50px", marginBottom: "40px", }}>
                                    Order Id  :  {orderDetails.orderId || 'N/A'}
                                </p>
                                <p style={{ fontSize: "20px", marginLeft: "50px", marginBottom: "25px" }}>
                                    Current Location : {orderDetails.currentLocation || 'N/A'}
                                </p>
                                <p style={{ fontSize: "20px", marginLeft: "50px", marginBottom: "25px" }}>
                                    Arrived Time : {orderDetails.arrivedTime || 'N/A'}
                                </p>
                            </DetailsDiv>
                        )}
                    </FlexRow>
                </div>
            </HomeSection>
        </>
    );
};

export default TrackOrder;
