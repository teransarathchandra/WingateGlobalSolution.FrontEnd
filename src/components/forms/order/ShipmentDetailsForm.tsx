import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import shipmentDetailsSchema from "@app_schemas/shipmentDetailsSchema";
import { StyledForm } from "@app_styles/shared/form.styles";
import LorryImg from '@app_assets/images/customer/Lorry.png';
import { HeadingSection } from "@app_styles/shared/heading.styles";
import { FlexRow, ImageContainer, PrimaryButton } from "@app_styles/shared/commonStyles.style";
import { getAllCategory } from "@app_services/categoryService";
import { ICategory } from "@app_interfaces/ICategory";
import { useEffect, useState } from "react";
import { Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import useSessionStorage from '@app_hooks/useSessionStorage';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAllPackageTypes } from "@app_services/packageTypeService";
import { IPackageType } from "@app_interfaces/IPackageType";
import { separateDateTime } from "@app_utils/separateDateTime";
import { createItem, updateItem } from "@app_services/itemService";
import { filterRestrictedOrders } from "@app_services/restrictedOrderService";

interface IFilterResOrder {
  sendingCountryCode: string;
  receivingCountryCode: string;
  categoryId: string;
}

const ShipmentDetailsForm = ({ goNext }) => {

  const [shipmentDetails, setShipmentDetails] = useSessionStorage('order-shipment-details', {
    itemName: '',
    description: '',
    categoryId: '',
    packageTypeId: '',
    packageCount: '',
    weight: '',
    itemValue: '',
    isPickupOrder: false,
    pickupOrderDate: null,
  });

  const [receivingCode,] = useSessionStorage('order-receiving-country-code');
  const [sendingCode,] = useSessionStorage('order-sending-country-code');
  //const [shipmentDetails, ] = useSessionStorage('order-shipment-details');

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue: setFormValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(shipmentDetailsSchema),
    mode: 'onTouched',
    defaultValues: shipmentDetails
  });


  useEffect(() => {
    reset(shipmentDetails);
  }, [reset, shipmentDetails]);

  const defaultDate = dayjs();
  // const [dateValue, setDateValue] = useState<Dayjs | null>(defaultDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [packageTypes, setPackageTypes] = useState<IPackageType[]>([]);
  // const [selectedPackageType, setSelectedPackageType] = useSessionStorage('order-package-type-id');

  const [itemSubmitted, setItemSubmitted] = useSessionStorage('order-item-submitted');
  const [itemId, setItemId] = useSessionStorage('order-itemId');
  const [isPickupOrder, setIsPickupOrder] = useSessionStorage('order-is-pickup-order', false);
  const [pickupOrderDate, setPickupOrderDate] = useSessionStorage('order-pickup-order-date');
  const [ , setRestrictedOrderType] = useSessionStorage('restricted-order-order-type');

  // Set the initial value for the date picker once the component has mounted
  // useEffect(() => {
  //   setFormValue("pickupOrderDate", defaultDate);
  // }, [setFormValue, defaultDate]);

  useEffect(() => {
    if (pickupOrderDate) {
      setFormValue("pickupOrderDate", dayjs(pickupOrderDate));
    } else {
      setFormValue("pickupOrderDate", defaultDate);
    }
  }, [setFormValue, defaultDate, pickupOrderDate]);

  useEffect(() => {
    if (isPickupOrder) {
      setShowDatePicker(isPickupOrder);
    } else {
      setShowDatePicker(false);
    }
  }, [isPickupOrder]);

  useEffect(() => {
    async function fetchData() {
      try {
        const catResponse = await getAllCategory();
        const pkgResponse = await getAllPackageTypes();
        setCategories(catResponse.data);
        setPackageTypes(pkgResponse.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {

    // const isPickupOrder = watch("isPickupOrder");
    if (!data.isPickupOrder) {
      delete data.pickupOrderDate; // Remove pickup date from data if not a pickup order
    }
    if (data.isPickupOrder && data.pickupOrderDate) {
      const { date } = await separateDateTime(data.pickupOrderDate.toISOString(), 'YYYY-MM-DD');
      data.pickupOrderDate = date; // Overwrite the full datetime with just the formatted date
    } else {
      data.pickupOrderDate = null; // Ensure no date is passed if not a pickup order
    }

    console.log("Shipment Data", data);

    try {
      let response;
      if (itemSubmitted && itemId) {
        response = await updateItem(itemId, data);
      } else {
        response = await createItem(data);
      }

      const responseData = await response.data;
      if (response.status === 200 || response.status === 201) {
        if (!itemSubmitted) {
          setItemId(responseData._id); // Assuming the response contains the ID of the created item
          setItemSubmitted(true);
        }

        // const isRestricted = await checkIfRestricted(responseData._id);
        const isRestrictedOrder = await retrieveSessionStorageValues();
        console.log("Shipment Data Submitted:", responseData);
        setShipmentDetails(data);
        goNext(isRestrictedOrder);
      } else {
        throw new Error('Failed to submit item data');
      }
    } catch (error) {
      console.error('Error submitting shipment data:', error);
    }
  };
 
  const retrieveSessionStorageValues = async () => {
    try {
      console.log("Retrieved Values:", { receivingCode, sendingCode, shipmentDetails });

      const catId = watch("categoryId" , false)

      const filteringData = {
        receivingCountryCode: receivingCode,
        sendingCountryCode: sendingCode,
        categoryId: catId,
      };
      const response = await filterRestrictedOrders(filteringData);
      console.log("Is restricted :  ", response);

      if(response.data.isRestrictedOrderFound == true){
        const restrictedOrderType = response.data.data; 
        setRestrictedOrderType(restrictedOrderType)
      }
      return response.data.isRestrictedOrderFound;

    } catch (error) {
      console.error('Failed to filter and check restricted order', error);
    }
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
        label="Item Name"
        variant="outlined"
        size="small"
        fullWidth
        {...register("itemName")}
        error={!!errors.itemName}
        helperText={errors.itemName?.message as string}
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
        helperText={errors.description?.message as string}
        margin="dense"
      />
      <InputLabel>Category</InputLabel>

      <FormControl sx={{ marginTop: 1, marginBottom: 1, minWidth: "100%" }} size="small">
        <InputLabel id="category-label">Category</InputLabel>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select
              labelId="category-label"
              fullWidth
              error={!!errors.categoryId}
              {...field}
              label="Category"
            >
              <MenuItem value=""><em>Select</em></MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText error={!!errors.categoryId}>{errors.categoryId?.message as string}</FormHelperText>
      </FormControl>
      <FormControl sx={{ marginTop: 1, marginBottom: 1, minWidth: "100%" }} size="small">
        <InputLabel id="package-type-label">Package Type</InputLabel>
        {/* <Select
          labelId="package-type-label"
          fullWidth
          {...register("packageTypeId")}
          value={selectedPackageType}
          onChange={(e) => handlePackageTypeSelect(e.target.value)}
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {packageTypes.map((packageType) => (
            <MenuItem key={packageType._id} value={packageType._id}>{packageType.packageName}</MenuItem>
          ))}
        </Select> */}
        <Controller
          name="packageTypeId"
          control={control}
          render={({ field }) => (
            <Select
              labelId="package-type-label"
              fullWidth
              error={!!errors.packageTypeId}
              {...field}
              label="Package Type"
            >
              <MenuItem value=""><em>Select</em></MenuItem>
              {packageTypes.map((packageType) => (
                <MenuItem key={packageType._id} value={packageType._id}>{packageType.packageName}</MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText error={!!errors.packageTypeId}>{errors.packageTypeId?.message as string}</FormHelperText>
      </FormControl>
      <TextField
        label="Package Count"
        type="number"
        variant="outlined"
        size="small"
        fullWidth
        {...register("packageCount", {
          setValueAs: v => v === "" ? undefined : Number(v)
        })}
        error={!!errors.packageCount}
        helperText={errors.packageCount?.message as string}
        margin="dense"
      />
      <TextField
        label="Weight (KG)"
        type="number"
        variant="outlined"
        size="small"
        fullWidth
        {...register("weight", {
          setValueAs: v => v === "" ? undefined : Number(v)
        })}
        error={!!errors.weight}
        helperText={errors.weight?.message as string}
        margin="dense"
      />
      <TextField
        label="Item Value (LKR)"
        type="number"
        variant="outlined"
        size="small"
        fullWidth
        {...register("itemValue", {
          setValueAs: v => v === "" ? undefined : Number(v)
        })}
        error={!!errors.itemValue}
        helperText={errors.itemValue?.message as string}
        margin="dense"
      />
      <FlexRow margin="1rem 0 0 0 ">
        <FormControlLabel
          control={<Checkbox
            {...register("isPickupOrder")}
            color="default"
            defaultChecked={shipmentDetails.isPickupOrder}
            onChange={(e) => {
              setShowDatePicker(e.target.checked);
              setIsPickupOrder(e.target.checked)
              if (!e.target.checked) {
                // Programmatically clear the date when checkbox is unchecked
                setFormValue("pickupOrderDate", null);
              }
            }}
          />}
          label="Pickup Order"
        />
        {showDatePicker && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="pickupOrderDate"
              control={control}  // This comes from useForm
              // defaultValue={dateValue}
              render={({ field }) => (
                <DatePicker
                  label="Pickup Order Date"
                  value={field.value}
                  disablePast
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    setPickupOrderDate(newValue);
                    // setDateValue(newValue);
                  }}
                // renderInput={(params) => <TextField {...params} error={!!errors.pickupOrderDate} helperText={errors.pickupOrderDate?.message} />}
                />
              )}
            />
          </LocalizationProvider>
        )}
      </FlexRow>
      <FlexRow justifyContent="center" alignItems="center">
        <PrimaryButton type="submit" width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="1rem 0">Next</PrimaryButton>
      </FlexRow>
    </StyledForm>
  );
};

export default ShipmentDetailsForm;
