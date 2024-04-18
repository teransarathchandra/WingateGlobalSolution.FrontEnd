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
import { useState } from "react";
import { getOrderByOrderId } from "@app_services/orderService";

const TrackOrder = () => {

    const [orderId, setOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    //const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setOrderId(event.target.value);
    };

    const fetchOrderbyOrderId = async () => {
        if (!orderId) { // Check if orderId is empty
            setError("Please enter an order ID to track.");
            return;
        }
        try {
            const response = await getOrderByOrderId(orderId);
            setOrderDetails(response); // Store the order details from response
            setError(''); // Clear any existing error
        } catch (error) {
            setError("Failed to fetch order details."); // Set error message
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
                    value={orderId}
                    onChange={handleInputChange}
                />
                <Button onClick={fetchOrderbyOrderId}>Track</Button>

                <DetailsDiv>
                    <p style={{fontSize: "25px", marginLeft: "50px", marginBottom: "40px",}}>Order Id  :  </p>
                    <p style={{fontSize: "20px", marginLeft: "50px", marginBottom :"25px"}}>Current Location : </p>
                    <p style={{fontSize: "20px", marginLeft: "50px" ,marginBottom :"25px"}}>Arrived Time : </p>
                </DetailsDiv>
                </div>
                

                
            </FlexRow>
           
        </>
    );
};

export default TrackOrder;
