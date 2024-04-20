import { useEffect, useState } from "react";
import { IColumn, IRow } from "@app_interfaces/ITable";
import { getAllOrders } from "@app_services/orderService";
import { IOrder } from "@app_interfaces/IOrder";
import ReusableTableDropdown from "@app_components/shared/ReusableTableDropdown";

const columns: IColumn[] = [
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: true },
  { id: "createdAt", label: "Date", numeric: false, disablePadding: false },
  { id: "itemId", label: "Weight", numeric: false, disablePadding: false },
  {
    id: "packageCount",
    label: "Package Count",
    numeric: false,
    disablePadding: false,
  },
];

const WarehouseAvailability: React.FC = () => {
  const [orders, setOrders] = useState<IRow[]>([]);

  const fetchAndPrepareOrders = async () => {
    try {
      const response = await getAllOrders();
      console.log("response", response);
      const preparedOrdrs: IRow[] = response.data.map((order: IOrder) => ({
        ...order,
        _id: order._id,
      }));
      setOrders(preparedOrdrs);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchAndPrepareOrders();
  }, []);

  return (
    <>
      {/* <TableDropdown
        columns={columns}
        rows={orders}
        title="Warehouse Availability"
        rowKey="orderId"
      /> */}
      <ReusableTableDropdown
        columns = {columns}
        rows = {orders}
        title="Order Warehouse Availability"
        rowKey="orderId"
      />
    </>
  );
};

export default WarehouseAvailability;
