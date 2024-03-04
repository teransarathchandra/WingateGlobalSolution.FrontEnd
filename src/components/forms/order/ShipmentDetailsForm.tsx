import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import shipmentDetailsSchema from "../../../schemas/shipmentDetailsSchema"; // Ensure to create this schema
import { StyledForm } from "../../../styles/shared/form.styles";
import LorryImg from '../../../assets/images/customer/Lorry.png'
import { HeadingSection } from "../../../styles/shared/heading.styles";
import {
  FieldGroup,
  // ActionButton, // This should be styled similarly to SignButton
} from "../../../styles/signForm.styles"; // Ensure to create and style this
import { FlexRow, ImageContainer } from "../../../styles/shared/commonStyles.style";

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
    // Handle the submission to your backend or state management
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <HeadingSection>
        <FlexRow justifyContent='start' alignItems='center' columnGap='1rem' margin=".2rem 0">
          <h1>Shipment Details</h1> <ImageContainer src={LorryImg} alt="" width="40px" height="40px" />
        </FlexRow>
        <p>Please enter the details of the item to be shipped.</p>
      </HeadingSection>
      <FieldGroup>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          {...register("itemName")}
          error={!!errors.itemName}
          helperText={errors.itemName?.message}
        />
      </FieldGroup>
      <FieldGroup>
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
        />
      </FieldGroup>
      <FieldGroup>
        <TextField
          label="Category"
          select
          variant="outlined"
          size="small"
          fullWidth
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
        >
          <option value="">Select a category</option>
        </TextField>
      </FieldGroup>
      <FieldGroup>
        <TextField
          label="Weight (KG)"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          {...register("weight")}
          error={!!errors.weight}
          helperText={errors.weight?.message}
        />
      </FieldGroup>
      <FieldGroup>
        <TextField
          label="Value (LKR)"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          {...register("value")}
          error={!!errors.value}
          helperText={errors.value?.message}
        />
      </FieldGroup>
      <FieldGroup>
        {/* <ActionButton type="submit">Submit Details</ActionButton> */}
      </FieldGroup>
    </StyledForm>
  );
};

export default ShipmentDetailsForm;
