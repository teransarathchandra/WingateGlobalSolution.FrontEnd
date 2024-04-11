import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import shipmentDetailsSchema from "@app_schemas/shipmentDetailsSchema";
import { StyledForm } from "@app_styles/shared/form.styles";
import LorryImg from '@app_assets/images/customer/Lorry.png'
import { HeadingSection } from "@app_styles/shared/heading.styles";
import { } from "@app_styles/signForm.styles";
import { FlexRow, ImageContainer } from "@app_styles/shared/commonStyles.style";
import { getAllCategory } from "@app_services/categoryService";
import { ICategory } from "@app_interfaces/ICategory";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import useSessionStorage from '@app_hooks/useSessionStorage'

const ShipmentDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shipmentDetailsSchema), // Define your validation schema
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useSessionStorage('order-sending-country-code')

  const onSubmit = (data) => {
    console.log("Shipment Data", data);
  };
  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      const categories = response.data.data.map((category: ICategory) => ({
        name: category.name,
        _id: category._id
      }));
      setCategories(categories);
    } catch (error) {
      console.error('Failed to fetch category', error);
    }
  };
  const handleCategorySelect = (id: any) => {
    console.log("Selected Category ID:", id);
    setSelectedCategory(id);


  };

  useEffect(() => {
    fetchCategories();
  }, []);


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
      <FormControl sx={{ marginTop: 1, marginBottom: 1, minWidth: "100%" }} size="small">
      <Select
        fullWidth
        defaultValue=""
        {...register("category")}
        value={selectedCategory || ''}
        onChange={(e) => handleCategorySelect(e.target.value)}
      >
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
        ))}
      </Select>
      </FormControl>
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
