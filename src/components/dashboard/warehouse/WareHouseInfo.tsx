import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { getAllOrders, updateOrder } from "@app_services/orderService";
import { IWarehouse } from "@app_interfaces/IWarehouse";
import EditDialog from "../../dialog/EditDialog";
import { getAllWarehouse } from "@app_services/warehouseService";

const columns: IColumn[] = [
  {
    id: "warehouseId",
    label: "Warehouse ID",
    numeric: false,
    disablePadding: false,
  },
  { id: "Capacity", label: "Capacity", numeric: false, disablePadding: false },
  {
    id: "Availability",
    label: "Availability",
    numeric: false,
    disablePadding: false,
  },
  { id: "Location", label: "Location", numeric: false, disablePadding: false },
  // { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  // { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const WareHouseInfo: React.FC = () => {
  const [warehouse, setWarehouse] = useState<IRow[]>([]);

  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [currentWarehouse, setCurrentWarehouse] = useState<IWarehouse | null>(
  //   null);

  // const handleEditClick = (order: IOrder) => {
  //   setCurrentOrder(order);
  //   setIsDialogOpen(true);
  // };

  const fetchAndPrepareWarehouse = async () => {
    try {
      const response = await getAllWarehouse();
      console.log("response", response);
      const preparedWarehouse: IRow[] = response.data.map((warehouse: IWarehouse) => ({
        ...warehouse,
        _id: warehouse._id,
        // seeDetails: <button onClick={() => handleViewClick(bulk)} style={{ cursor: "pointer",backgroundColor: "#e1bd05", color: "#ffffff", border: "2px solid #e1bd05", borderRadius: "10px" }}>See More</button>,
        // edit: <button onClick={() => handleEditClick(bulk)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} /></button>,
        // delete: <button onClick={() => handleDeleteClick(bulk)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
       //console.log('Current Bulk:', currentBulk);
      setWarehouse(preparedWarehouse);
    } catch (error) {
      console.error('Failed to fetch warehouse', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareWarehouse();
    //loadFlights();
  }, []);

  // const saveOrder = async (orderData) => {
  //   console.log("Saving order:", orderData);
  //   setIsDialogOpen(false);
  //   try {
  //     // Assuming your currentOrder state has the order's ID
  //     // And that orderData contains the updated order fields
  //     const orderId = currentOrder?._id;
  //     if (orderId) {
  //       await updateOrder(orderId, { status: orderData.status }); // Call to your orderService
  //       console.log("Order updated successfully");

  //       // Optionally, refresh the orders list to show the updated data
  //       fetchAndPrepareOrders();
  //     }
  //     setIsDialogOpen(false); // Close the dialog after saving
  //   } catch (error) {
  //     console.error("Failed to update order", error);
  //     // Handle error (e.g., show error message to user)
  //   }
  // };

  // const deleteOrder = (order) => {
  //   console.log("Deleting order:", order);
  //   setIsDialogOpen(false);
  //   // Implement actual delete logic here
  // };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={warehouse}
        title="Warehouse Management"
        rowKey="warehouseId"
      />
      {/* <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentOrder}
        fields={[
          { name: "orderId", label: "Order ID", type: "text", disabled: false },
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
          { name: "status", label: "Status", type: "text", disabled: false },
        ]}
        onSave={saveOrder}
        onDelete={deleteOrder}
      /> */}
    </>
  );
};

export default WareHouseInfo;
