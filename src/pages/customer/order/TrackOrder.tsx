import welcomeImage from "@app_assets/images/man-carrying-a-package.png";
import logo from "@app_assets/images/logo-min.jpg";
import {
    DetailsDiv,
    Logo,
    WelcomeImage,
    Button,
} from "@app_styles/trackOrder.styles";
import { Div } from "@app_styles/trackOrder.styles";
import { TextField } from "@mui/material";
import { FlexRow } from "@app_styles/signForm.styles";
import { useEffect, useState } from "react";
import { getOrderByOrderId } from "@app_services/orderService";
import { useLocation } from "react-router-dom";

interface OrderDetails {
    _id: string;
    orderId: string;
    currentLocation: string;
    arrivedTime: string;
}

const TrackOrder = () => {

    const location = useLocation(); // Hook to get location object
    const [inputOrderId, setInputOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const orderIdFromQuery = queryParams.get('orderId');
        if (orderIdFromQuery) {
            fetchOrderbyOrderId(orderIdFromQuery);
        }
    }, [location]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputOrderId(event.target.value);
    };

    const fetchOrderbyOrderId = async (id: string) => {
        if (!id) {
            setError("Please enter an order ID to track.");
            return;
        }
        try {
            const { data } = await getOrderByOrderId(id);
            setOrderDetails(data);
            setError('');
        } catch (error: any) {
            setError("Failed to fetch order details.");
            console.error("Failed to fetch orders", error);
        }
    };

    return (
        <>
            <FlexRow>
                <Div>
                    <Logo src={logo} alt="logo" />
                    <WelcomeImage src={welcomeImage} alt="Man carrying a package" />
                </Div>
                <div>
                    <TextField
                        style={{ width: "350px", marginLeft: "270px", marginTop: "130px" }}
                        label="Track your order"
                        value={inputOrderId}
                        onChange={handleInputChange}
                    />
                    <Button onClick={() => fetchOrderbyOrderId(inputOrderId)}>Track</Button>

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
                </div>
            </FlexRow>
        </>
    );
};

export default TrackOrder;
