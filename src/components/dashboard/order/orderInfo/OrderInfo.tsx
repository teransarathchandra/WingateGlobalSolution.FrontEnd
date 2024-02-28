import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../../interfaces/ITable";
import ReusableTable from "../../../shared/ReusableTable";
import { getAllOrders } from "../../../../services/orderService";
import { IOrder } from "../../../../interfaces/IOrder";

const columns: IColumn[] = [
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: true },
  { id: "userId", label: "User ID", numeric: false, disablePadding: false },
  { id: "createdAt", label: "Date", numeric: false, disablePadding: false },
  { id: "description", label: "Description", numeric: false, disablePadding: false },
  { id: "amount", label: "Amount", numeric: true, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const OrderInfo: React.FC = () => {
  const [orders, setOrders] = useState<IRow[]>([]);

  useEffect(() => {
    const fetchAndPrepareOrders = async () => {
      try {
        const response = await getAllOrders();
        const preparedOrders: IRow[] = response.data.data.map((order: IOrder) => ({
          ...order,
          edit: <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#048b04" }} />,
          delete: <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#c80909" }} />,
        }));
        setOrders(preparedOrders);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchAndPrepareOrders();

  }, []);

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={orders}
        title="Order Management"
        rowKey="orderID"
      />
    </>
  );
};

export default OrderInfo;
