import { useEffect, useState } from "react";
import { IColumn, IRow } from "@app_interfaces/ITable";
import { getAllOrders } from "@app_services/orderService";
import { IOrder } from "@app_interfaces/IOrder";
import ReusableTableDropdown from "@app_components/shared/ReusableTableDropdown";
import { UpdateBtn } from "@app_styles/bulkDetails.styles";


const columns: IColumn[] = [
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: false },
  { id: "createdAt", label: "Date", numeric: false, disablePadding: false },
  { id: "itemId", label: "Weight", numeric: false, disablePadding: false },
  { id: "packageCount", label: "Package Count", numeric: false, disablePadding: false }
];


const OrderAggregation: React.FC = () => {
  const [orders, setOrders] = useState<IRow[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IRow[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");

  const fetchAndPrepareOrders = async () => {
    try {
      const response = await getAllOrders();
      const preparedOrders: IRow[] = response.data.map((order: IOrder) => ({
        ...order,
      }));
      setOrders(preparedOrders);
      setFilteredOrders(preparedOrders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareOrders();
  }, []);

  const filterOrders = () => {
    let filtered = orders.filter(order => {
      // Check if all filter conditions are true
      return (!selectedCountry || order.country === selectedCountry) &&
             (!selectedCategory || order.category === selectedCategory) &&
             (!selectedPriority || order.orderType === selectedPriority);
    });
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    filterOrders();
  }, [selectedCountry, selectedCategory, selectedPriority]);

  return (
    <>
      <ReusableTableDropdown
        columns={columns}
        rows={orders}
        title="Order Aggregation"
        rowKey="orderId" 
        filterLabels={["Destination Country:", "Category:", "Priority:"]}
        filterSelects={[
          {
            options: [
              { value: "", label: "Select Country" },
              { value: "6608e3cd3f01685b847abe04", label: "Maldives" },
              { value: "66094259a85978a562cc526b", label: "Dubai" },
            ],
            onChange: (value: string) => setSelectedCountry(value)
          },
          {
            options: [
              { value: "", label: "Select Category" },
              { value: "661239831ea0c44764c80b6b", label: "Flamable" },
              { value: "6612398d1ea0c44764c80b6e", label: "Medicine" },
            ],
            onChange: (value: string) => setSelectedCategory(value)
          },
          {
            options: [
              { value: "", label: "Select Priority" },
              { value: "Express", label: "Express" },
              { value: "Standard", label: "Standard" },
            ],
            onChange: (value: string) => setSelectedPriority(value)
          },
        ]} 
      />
      <UpdateBtn type="submit">Generate Bulk</UpdateBtn>
    </>
  );
};

export default OrderAggregation;
