import { useEffect, useState } from "react";
import { IColumn, IRow } from "@app_interfaces/ITable";
import { getAllOrderTransport, updateOrder } from "@app_services/orderService";
import { IOrder } from "@app_interfaces/IOrder";
import ReusableTableDropdown from "@app_components/shared/ReusableTableDropdown";
import { ButtonContainer, UpdateBtn } from "@app_styles/bulkDetails.styles";
import { getAllCountry, getCountryCountryCode } from "@app_services/countryService";
import { ICountry } from "@app_interfaces/ICountry";
import { getAllCategory } from "@app_services/categoryService";
import { ICategory } from "@app_interfaces/ICategory";
import { createBulk } from "@app_services/bulkService";

const columns: IColumn[] = [
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: false },
  { id: "createdAt", label: "Date", numeric: false, disablePadding: false },
  { id: "weight", label: "Weight", numeric: false, disablePadding: false },
  {
    id: "packageCount",
    label: "Package Count",
    numeric: false,
    disablePadding: false,
  },
];

const OrderAggregation: React.FC = () => {
  const [orders, setOrders] = useState<IRow[]>([]);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<IRow[]>([]);

  const fetchAndPrepareOrders = async () => {
    try {
      const aggType = "orderIds";
      const response = await getAllOrderTransport(aggType);
      const preparedOrders: IRow[] = response.data.map((order: IOrder) => ({
        ...order,
      }));
      setOrders(preparedOrders);
      setFilteredOrders(preparedOrders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const fetchAllCountries = async () => {
    const { data } = await getAllCountry();
    if (data) {
      setCountries(data);
    }
  };

  const fetchAllCategories = async () => {
    const { data } = await getAllCategory();
    if (data) {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchAndPrepareOrders();
    fetchAllCountries();
    fetchAllCategories();
  }, []);

  const filterOrders = () => {
    const filtered = orders.filter((order) => {
      return (
        (!selectedCountry || order.receiverCountryId === selectedCountry) &&
        (!selectedCategory || order.itemCategoryId === selectedCategory) &&
        (!selectedPriority || order.priority === selectedPriority)
      );
    });
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    filterOrders();
  }, [selectedCountry, selectedCategory, selectedPriority]);

  const countryOptions = countries
    .filter((country) => country.name !== "Sri Lanka")
    .map((country) => ({
      value: country.countryCode,
      label: country.name,
    }));
  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const handleCreateBulk = async () => {
    try {

      const countryResponse = await getCountryCountryCode(selectedCountry);
      const countryObjectId = countryResponse.data._id;
      const payload = {
        destinationCountry: countryObjectId,
        category: selectedCategory,
        priority: selectedPriority,
      };
      const response = await createBulk(payload);
      const newBulkId = response.data._id;
      const updatePromises = filteredOrders.map((order) => {
        updateOrder(order._id, { bulkId: newBulkId });
      });

      await Promise.all(updatePromises);

      setSelectedCountry("");
      setSelectedCategory("");
      setSelectedPriority("");
      await fetchAndPrepareOrders();
    } catch (error) {
      console.error("Error creating bulk:", error);
    }
  };

  return (
    <>
      <ReusableTableDropdown
        columns={columns}
        rows={filteredOrders}
        title="Order Aggregation"
        rowKey="orderId"
        filterLabels={["Destination Country:", "Category:", "Priority:"]}
        filterSelects={[
          {
            options: countryOptions,
            onChange: setSelectedCountry,
          },
          {
            options: categoryOptions,
            onChange: setSelectedCategory,
          },
          {
            options: [
              { value: "", label: "Select Priority" },
              { value: "Express", label: "Express" },
              { value: "Standard", label: "Standard" },
            ],
            onChange: (value: string) => setSelectedPriority(value),
          },
        ]}
      />
      <ButtonContainer>
      <UpdateBtn type="submit" onClick={handleCreateBulk}>
        Generate Bulk
      </UpdateBtn>
      </ButtonContainer>
      
    </>
  );
};

export default OrderAggregation;
