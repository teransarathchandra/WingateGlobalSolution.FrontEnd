import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import shipmentDetailsSchema from "@app_schemas/shipmentDetailsSchema";
import { StyledForm } from "@app_styles/shared/form.styles";
import LorryImg from '@app_assets/images/customer/Lorry.png'
import { HeadingSection } from "@app_styles/shared/heading.styles";
import {
} from "@app_styles/signForm.styles";
import { FlexRow, ImageContainer } from "@app_styles/shared/commonStyles.style";

const ShipmentDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shipmentDetailsSchema), // Define your validation schema
  });

  const onSubmit = (data) => {
    console.log("Shipment Data", data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} width="400px">
      <HeadingSection>
        <FlexRow justifyContent='start' alignItems='center' columnGap='1rem' margin=".2rem 0">
          <h1>Shipment Details</h1> <ImageContainer src={LorryImg} alt="" width="40px" height="40px" />
        </FlexRow>
        <p>Please enter the details of the item to be shipped.</p>
      </HeadingSection>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          {...register("itemName")}
          error={!!errors.itemName}
          helperText={errors.itemName?.message}
          margin="dense"
        />
        <TextField
          label="Description"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="dense"
        />
        <TextField
          label="Category"
          select
          variant="outlined"
          size="small"
          fullWidth
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
          margin="dense"
        >
          <option value="">Select a category</option>
        </TextField>
        <TextField
          label="Weight (KG)"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          {...register("weight")}
          error={!!errors.weight}
          helperText={errors.weight?.message}
          margin="dense"
        />
        <TextField
          label="Value (LKR)"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          {...register("value")}
          error={!!errors.value}
          helperText={errors.value?.message}
          margin="dense"
        />
        {/* <ActionButton type="submit">Submit Details</ActionButton> */}
    </StyledForm>
  );
};

export default ShipmentDetailsForm;
