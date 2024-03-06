import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../../interfaces/ITable";
import ReusableTable from "../../../shared/ReusableTable";
import { getAllRestrictedOrders } from "../../../../services/restrictedOrderService";
import { IRestrictedOrder } from "../../../../interfaces/IRestrictedOrder";

const columns: IColumn[] = [
  { id: "restrictedOrderId", label: "Restricted ID", numeric: false, disablePadding: true },
  { id: "sendingCountryId", label: "From", numeric: false, disablePadding: false },
  { id: "receivingCountryId", label: "To", numeric: false, disablePadding: false },
  { id: "categoryId", label: "Category", numeric: false, disablePadding: false },
  { id: "createdAt", label: "Date", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const restrictedOrderInfo: React.FC = () => {
  const [restrictedOrders, setRestrictedOrders] = useState<IRow[]>([]);

  useEffect(() => {
    const fetchAndPrepareResOrders = async () => {
      try {
        const response = await getAllRestrictedOrders();
        const preparedResOrders: IRow[] = response.data.data.map((restrictedOrder: IRestrictedOrder) => ({
          ...restrictedOrder,
          edit: <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#048b04" }} />,
          delete: <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#c80909" }} />,
        }));
        setRestrictedOrders(preparedResOrders);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchAndPrepareResOrders();

  }, []);

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={restrictedOrders}
        title="Restricted Order Management"
        rowKey="restrictedOrderId"
      />
    </>
  );
};

export default restrictedOrderInfo;
