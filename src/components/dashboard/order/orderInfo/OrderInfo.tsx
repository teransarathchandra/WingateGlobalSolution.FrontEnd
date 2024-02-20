import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../../interfaces/ITable";
import ReusableTable from "../../../shared/ReusableTable";

function createData(
  orderID: string,
  userID: string,
  date: string,
  description: string,
  amount: number
): IRow {
  return {
    id: orderID,
    orderID,
    userID,
    date,
    description,
    amount,
    edit: (
      <FontAwesomeIcon
        icon={faPen}
        style={{ cursor: "pointer", color: "#048b04" }}
      />
    ),
    delete: (
      <FontAwesomeIcon
        icon={faTrash}
        style={{ cursor: "pointer", color: "#c80909" }}
      />
    ),
  };
}

const columns: IColumn[] = [
  { id: "orderID", label: "Order ID", numeric: false, disablePadding: true },
  { id: "userID", label: "User ID", numeric: false, disablePadding: false },
  { id: "date", label: "Date", numeric: false, disablePadding: false },
  {
    id: "description",
    label: "Description",
    numeric: false,
    disablePadding: false,
  },
  { id: "amount", label: "Amount", numeric: true, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const rows = [createData("SI123", "CS123", "12/01/2023", "Clothes", 12000)];

const OrderInfo: React.FC = () => {
  return (
    <>
      <ReusableTable
        columns={columns}
        rows={rows}
        title="Order Management"
        rowKey="orderID" // Assuming `orderID` is unique
        onRowSelect={() => {}}
      />
    </>
  );
};

export default OrderInfo;
