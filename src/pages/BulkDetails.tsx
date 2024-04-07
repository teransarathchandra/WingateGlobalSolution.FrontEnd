import {
    HeaderDiv,
    Form,
    FieldGroup,
    UpdateBtn,
    Div,
} from "@app_styles/bulkDetails.styles";
import { MenuItem, Select, TextField } from "@mui/material";
import { getLastAddedBulk, updateBulk } from "@app_services/bulkService";
import { useEffect, useState } from "react";
import { IBulk } from "@app_interfaces/IBulk";
import { separateDateTime } from "@app_utils/separateDateTime";
import { useForm } from "react-hook-form";
import { updateBulkSchema } from "@app_schemas/bulk/updateBulk";
import { yupResolver } from "@hookform/resolvers/yup";

const BulkDetails = () => {
    const [bulkData, setBulkData] = useState<IBulk | null>(null);
    const [bulkCreatedDate, setBulkCreatedDate] = useState();
    const [bulkCreatedTime, setBulkCreatedTime] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updateBulkSchema),
    });

    useEffect(() => {
        async function fetchLastBulk() {
            try {
                const aggType = "lastBulkIds";
                const response = await getLastAddedBulk(aggType);
                if (response) {
                    setBulkData(response.data[0]);
                    const formattedDate = await separateDateTime(
                        response.data[0].createdAt,
                        "YYYY-MM-DD"
                    );
                    setBulkCreatedDate(formattedDate.date);
                    setBulkCreatedTime(formattedDate.time);
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
            <HeaderDiv>Bulk Details</HeaderDiv>

            <Form onSubmit={handleSubmit(handleUpdate)}>
                Assign Flight For Bulk
                <br/><br/>
                <Div>
                    Bulk ID : {bulkId}
                    <br /><br />
                    Destination Country : {bulkData?.destinationCountry}
                    <br /><br />
                    Created Date : {bulkCreatedDate}
                    <br /><br />
                    Created Time : {bulkCreatedTime}
                    <br /><br />
                    Master Airway Bill ID : {bulkData && bulkData.masterAirwayBillId}
                    <br /><br />
                    Flight No : {bulkData && bulkData.flightId}
                    <br /><br />
                    <FieldGroup>
                    <TextField
                        label="Master Airway Bill ID"
                        defaultValue=""
                        placeholder=""
                        type="text"
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            margin: "20px",
                            width: "250px",
                            marginRight: "50px",
                        }}
                        {...register("masterAirwayBillId")}
                        error={Boolean(errors.masterAirwayBillId)}
                        helperText={errors.masterAirwayBillId?.message}
                    />
                
                <Select
                    defaultValue=""
                    placeholder="Flight No"
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        margin: "20px",
                        width: "250px",
                        marginRight: "50px",
                    }}
                    {...register("flightId")}
                    error={Boolean(errors.flightId)}
                >
                    <MenuItem value="">Select Flight</MenuItem>
                    <MenuItem value="6608e3cd3f01685b847abe04">UL101</MenuItem>
                    <MenuItem value="66094259a85978a562cc526b">UE107</MenuItem>
                </Select>
                
                </FieldGroup>
                </Div>
                <UpdateBtn type="submit">Update</UpdateBtn>
            </Form>
        </>
    );
};

export default BulkDetails;
