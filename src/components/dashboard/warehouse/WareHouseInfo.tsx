import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { getAllWarehouse, updateWarehouse } from "@app_services/warehouseService";
import EditDialog from "../../dialog/EditDialog";
import { IWarehouse } from "@app_interfaces/IWarehouse";

const columns: IColumn[] = [
  { id: "warehouseId", label: "Warehouse ID", numeric: false, disablePadding: true },
  { id: "storageCapacity", label: "Capacity", numeric: true, disablePadding: false },
  { id: "location", label: "Location", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const WarehouseInfo: React.FC = () => {
  const [warehouse, setWarehouse] = useState<IRow[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<IWarehouse | null>(null);

  const handleEditClick = (warehouse: IWarehouse) => {
    setCurrentWarehouse(warehouse);
    setIsDialogOpen(true);
  };

  const fetchAndPrepareWarehouse = async () => {
    try {
      //const aggType = "warehouseId"
      const response = await getAllWarehouse();
      const preparedWarehouse: IRow[] = response.data.map((warehouse: IWarehouse) => ({
        ...warehouse,
        edit: <button onClick={() => handleEditClick(warehouse)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} /></button>,
        delete: <button onClick={() => deleteWarehouse(warehouse)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
      setWarehouse(preparedWarehouse);
    } catch (error) {
      console.error('Failed to fetch warehouse', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareWarehouse();
  }, []);

  const saveWarehouse = async (warehouseData) => {
    console.log('Saving warehouse:', warehouseData);
    setIsDialogOpen(false);
    try {
      // Assuming your currentOrder state has the order's ID
      // And that orderData contains the updated order fields
      const warehouseID = currentWarehouse?._id;
      if (warehouseID) {
        await updateWarehouse(warehouseID, { status: warehouseData.status }); // Call to your orderService
        console.log('Warehouse updated successfully');

        // Optionally, refresh the orders list to show the updated data
        fetchAndPrepareWarehouse();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error('Failed to update warehouse', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const deleteWarehouse = (warehouse) => {
    console.log('Deleting warehouse:', warehouse);
    setIsDialogOpen(false);
    // Implement actual delete logic here
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={warehouse}
        title="Warehouse Information"
        rowKey="warehouseId"
      />
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentWarehouse}
        fields={[
          { name: 'warehouseId', label: 'Warehouse ID', type: 'text', disabled: false },
          { name: 'capacity', label: 'Capacity', type: 'number', disabled: false },
          { name: 'availability', label: 'Availability', type: 'text', disabled: false },
          { name: 'location', label: 'Location', type: 'text', disabled: false },
        ]}
        onSave={saveWarehouse}
        onDelete={deleteWarehouse}
      />
    </>
  );
};

export default WarehouseInfo;
