import {
    HeaderDiv,
    Form,
    FieldGroup,
    UpdateBtn,
    Div,
} from "@app_styles/bulkDetails.styles";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getLastAddedBulk, updateBulk } from "@app_services/bulkService";
import { useEffect, useState } from "react";
import { IBulk } from "@app_interfaces/IBulk";
import { separateDateTime } from "@app_utils/separateDateTime";
import { useForm } from "react-hook-form";
import { updateBulkSchema } from "@app_schemas/bulk/updateBulk";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFlight } from "@app_interfaces/IFlight";
import { getAllFlights } from "@app_services/flightService";

const BulkDetails = () => {
    const [bulkData, setBulkData] = useState<IBulk | null>(null);
    const [flights, setFlights] = useState<IFlight[]>([]);
    const [bulkCreatedDate, setBulkCreatedDate] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updateBulkSchema),
    });

    const fetchAndPrepareFlights = async () => {
        try {
          const aggFlight = 'airlineIds';
          const response = await getAllFlights(aggFlight);
          const preparedFlights = response.data.data.map((flight: IFlight) => ({
            ...flight,
           
          }));
          setFlights(preparedFlights);
        } catch (error) {
          console.error('Failed to fetch flights', error);
        }
      };
    useEffect(() => {
        async function fetchLastBulk() {
            try {
                const aggType = "lastBulkIds";
                const response = await getLastAddedBulk(aggType);
                if (response) {
                    setBulkData(response.data[0]);
                    const formattedDate = await separateDateTime( response.data[0].createdAt, "YYYY-MM-DD" );
                    setBulkCreatedDate(formattedDate.date);
                    fetchAndPrepareFlights();
                }
            } catch (error) {
                console.error("Error fetching bulk data:", error);
            }
        }

        fetchLastBulk();
    }, []);

    const bulkId = bulkData?.bulkId;

    const handleUpdate = async (data) => {
        try {
            const bulkId = bulkData?._id;
            if (bulkId) {
                const response = await updateBulk(bulkId, data);
                console.log(response);
                console.log("Bulk updated successfully");
            }
        } catch (error) {
            console.error("Failed to update bulk", error);
        }
    };

    return (
        <>
            <HeaderDiv>Driver Assign Details</HeaderDiv>

            <Form onSubmit={handleSubmit(handleUpdate)}>
                Assign Details
                <br />
                <br />
                <Div>
                    Order ID : {bulkId}
                    <br />
                    <br />
                    Warehouse ID : {bulkData && bulkData.masterAirwayBillId}
                    <br />
                    <br />
                    Priority : {bulkData?.destinationCountry}
                    <br />
                    <br />
                    Created Date : {bulkCreatedDate}
                    <br />
                    <br />
                    <FieldGroup>

                        <InputLabel>Pick a Driver </InputLabel>
                        <Select
                            defaultValue=""
                            
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "5px",
                                width: "250px",
                                marginRight: "50px",
                            }}
                            {...register("flightId")}
                            error={Boolean(errors.flightId)}
                        >
                            <MenuItem value="">Select Flight</MenuItem>
                            {flights.map((flight) => (
                                                <MenuItem key={flight._id} value={flight._id}>
                                                    {flight.flightId}
                                                </MenuItem>
                                            ))}

                            
                        </Select>
                        <br />
                        <br />

                        <InputLabel>Pickup Date </InputLabel>
                        <TextField
                           
                            defaultValue=""
                            placeholder=""
                            type="text"
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "5px",
                                width: "250px",
                                paddingBottom: "40px",
                                marginRight: "50px",
                            }}
                            {...register("masterAirwayBillId")}
                            error={Boolean(errors.masterAirwayBillId)}
                            helperText={errors.masterAirwayBillId?.message}
                        />

                    </FieldGroup>
                    <UpdateBtn type="submit">Done</UpdateBtn>
                </Div>
                
            </Form>
        </>
    );
};

export default BulkDetails;
