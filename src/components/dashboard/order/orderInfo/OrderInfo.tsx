import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../../shared/ReusableTable";
import { getAllOrders, updateOrder } from "@app_services/orderService";
import { IOrder } from "@app_interfaces/IOrder";
import EditDialog from "../../../dialog/EditDialog";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);

  const handleEditClick = (order: IOrder) => {
    setCurrentOrder(order);
    setIsDialogOpen(true);
  };

  const fetchAndPrepareOrders = async () => {
    try {
      const response = await getAllOrders();
      const preparedOrders: IRow[] = response.data.data.map((order: IOrder) => ({
        ...order,
        edit: <button onClick={() => handleEditClick(order)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} /></button>,
        delete: <button onClick={() => deleteOrder(order)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
      setOrders(preparedOrders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareOrders();
  }, []);

  const saveOrder = async (orderData) => {
    console.log('Saving order:', orderData);
    setIsDialogOpen(false);
    try {
      // Assuming your currentOrder state has the order's ID
      // And that orderData contains the updated order fields
      const orderId = currentOrder?._id;
      if (orderId) {
        await updateOrder(orderId, { status: orderData.status }); // Call to your orderService
        console.log('Order updated successfully');

        // Optionally, refresh the orders list to show the updated data
        fetchAndPrepareOrders();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error('Failed to update order', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const deleteOrder = (order) => {
    console.log('Deleting order:', order);
    setIsDialogOpen(false);
    // Implement actual delete logic here
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={orders}
        title="Order Management"
        rowKey="orderID"
      />
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentOrder}
        fields={[
          { name: 'orderId', label: 'Order ID', type: 'text', disabled: false },
          { name: 'userId', label: 'User ID', type: 'text', disabled: false },
          { name: 'createdAt', label: 'Created At', type: 'date', disabled: false },
          { name: 'description', label: 'Description', type: 'text', disabled: false },
          { name: 'amount', label: 'Amount', type: 'number', disabled: false },
          { name: 'status', label: 'Status', type: 'text', disabled: false },
        ]}
        onSave={saveOrder}
        onDelete={deleteOrder}
      />
    </>
  );
};

export default OrderInfo;
