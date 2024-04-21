import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../../shared/ReusableTable";
import {
  deleteOrder,
  getAllOrders,
  updateOrder,
} from "@app_services/orderService";
import { IOrder } from "@app_interfaces/IOrder";
import DeleteDialog from "@app_components/dialog/DeleteDialog";
import EditDropdown from "@app_components/dialog/EditDropdown";

const columns: IColumn[] = [
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: false },
  { id: "userId", label: "User ID", numeric: false, disablePadding: false },
  { id: "email", label: "Email", numeric: false, disablePadding: false },
  { id: "createdAt", label: "Date", numeric: false, disablePadding: false },
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

const OrderInfo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<IRow[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);

  const handleEditClick = (order: IOrder) => {
    setCurrentOrder(order);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (order: IOrder) => {
    console.log("Order", order);
    setCurrentOrder(order);
    setisDeleteDialogOpen(true);
  };

  const fetchAndPrepareOrders = async () => {
    try {
      const aggType = "orderIds";
      const response = await getAllOrders(aggType);
      const preparedOrders: IRow[] = response.data.map((order: IOrder) => ({
        ...order,
        edit: (
          <button
            onClick={() => handleEditClick(order)}
            style={{ all: "unset" }}
          >
            <FontAwesomeIcon
              icon={faPen}
              style={{ cursor: "pointer", color: "#0c1821" }}
            />
          </button>
        ),
        delete: (
          <button
            onClick={() => handleDeleteClick(order)}
            style={{ all: "unset" }}
          >
            <FontAwesomeIcon
              icon={faTrash}
              style={{ cursor: "pointer", color: "#dd0426" }}
            />
          </button>
        ),
      }));
      setOrders(preparedOrders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchAndPrepareOrders();
  }, []);

  const saveOrder = async (orderData) => {
    console.log("Saving order:", orderData);
    setIsDialogOpen(false);
    try {
      // Assuming your currentOrder state has the order's ID
      // And that orderData contains the updated order fields
      const orderId = currentOrder?._id;
      if (orderId) {
        await updateOrder(orderId, { status: orderData.status }); // Call to your orderService
        console.log("Order updated successfully");

        // Optionally, refresh the orders list to show the updated data
        fetchAndPrepareOrders();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error("Failed to update order", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleDeleteOrder = async () => {
    if (currentOrder) {
      try {
        await deleteOrder(currentOrder._id);
        setOrders((orders) =>
          orders.filter((orders) => orders._id !== currentOrder._id)
        );
        setisDeleteDialogOpen(false);
      } catch (error) {
        console.error("Failed to delete order", error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const statusOptions = [
    { value: "In Progress", label: "In Progress" },
    { value: "Processing", label: "Processing" },
    { value: "pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={orders}
        title="Order Management"
        rowKey="orderID"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <EditDropdown
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentOrder}
        fields={[
          { name: "orderId", label: "Order ID", type: "text", disabled: true },
          { name: "userId", label: "User ID", type: "text", disabled: false },
          {
            name: "createdAt",
            label: "Created At",
            type: "date",
            disabled: false,
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            disabled: false,
          },
          { name: "amount", label: "Amount", type: "number", disabled: false },
          {
            name: "status",
            label: "Status",
            type: "dropdown",
            options: statusOptions,
          },
        ]}
        onSave={saveOrder}
        onDelete={deleteOrder}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => setisDeleteDialogOpen(false)}
        handleDelete={handleDeleteOrder}
      />
    </>
  );
};

export default OrderInfo;
