import { useEffect, useState } from "react";
import { IColumn, IRow } from "@app_interfaces/ITable";
import { getAllOrders } from "@app_services/orderService";
import { IOrder } from "@app_interfaces/IOrder";
import ReusableTable from "@app_components/shared/ReusableTable";
//import { Warehouse } from "@mui/icons-material";

const columns: IColumn[] = [
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: true },
  { id: "createdAt", label: "Date", numeric: false, disablePadding: false },
  { id: "status", label: "Status", numeric: false, disablePadding: false },
  {
    id: "warehouse",
    label: "Warehouse",
    numeric: false,
    disablePadding: false,
  },
];

const Warehouse: React.FC = () => {
  const [orders, setOrders] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAndPrepareOrders = async () => {
    try {
      const aggType = "orderIds";
      const response = await getAllOrders(aggType);
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={orders}
        title="Warehouse"
        rowKey="orderId" 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        //filterLabels={undefined} filterSelects={undefined}    
          /> 
    </>
  );
};

export default Warehouse;
