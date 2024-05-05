import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus, faFile } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { createWarehouse, deleteWarehouse, getAllWarehouse, updateWarehouse } from "@app_services/warehouseService";
import { IWarehouse } from "@app_interfaces/IWarehouse";
import EditDropdown from "@app_components/dialog/EditDropdown";
import DeleteDialog from "@app_components/dialog/DeleteDialog";
import { UpdateBtn, ReportBtn } from "@app_styles/warehouse.styles";
import AddDialog from "@app_components/dialog/AddDialog";
//import Button from "@mui/material/Button";
import PDFExportDialog from "@app_components/pdf/PDFPreviewDialog";
import PDFLayout from "@app_components/pdf/PDFLayout";
import ReactDOMServer from "react-dom/server";
import WarehouseReport from "@app_components/pdf/pdfTemplates/WarehouseReport";
import {warehouseSchema} from "@app_schemas/warehouseSchema"
const columns: IColumn[] = [
  { id: "warehouseId", label: "Warehouse ID", numeric: false, disablePadding: true },
  { id: "storageCapacity", label: "Capacity", numeric: true, disablePadding: false },
  { id: "location", label: "Location", numeric: false, disablePadding: false },
  { id: "availability", label: "Availability", numeric: true, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const WarehouseInfo: React.FC = () => {
  const [warehouse, setWarehouse] = useState<IRow[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<IWarehouse | null>(null);
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showPDFDialog, setShowPDFDialog] = useState(false);
  const [pdfHtmlContent, setPdfHtmlContent] = useState('');


  useEffect(() => {
    if (warehouse.length > 0) {
      const htmlContent = ReactDOMServer.renderToString(
        <PDFLayout content={<WarehouseReport warehouse={warehouse} />} />
      );
      setPdfHtmlContent(htmlContent);
    }
  }, [warehouse]);

  const handleEditClick = (warehouse: IWarehouse) => {
    setCurrentWarehouse(warehouse);
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    setIsAddWarehouseOpen(true);
    setCurrentWarehouse(null);
  };

  const handleDeleteClick = (warehouse: IWarehouse) => {
    console.log("Warehouse", warehouse);
    setCurrentWarehouse(warehouse);
    setisDeleteDialogOpen(true);
  };

  const fetchAndPrepareWarehouse = async () => {
    try {
      const aggType = "warehouseId"
      const response = await getAllWarehouse(aggType);
      const preparedWarehouse: IRow[] = response.data.map((warehouse: IWarehouse) => ({
        ...warehouse,
        edit: <button onClick={() => handleEditClick(warehouse)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} /></button>,
        delete: <button onClick={() => handleDeleteClick(warehouse)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
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
      console.log('Saving');
      const warehouseId = currentWarehouse?._id;
      console.log('Warehouse ID:', currentWarehouse);
      if (warehouseId) {
        await updateWarehouse(warehouseId, warehouseData);
        console.log(warehouseData)
        console.log('Warehouse updated successfully');


        fetchAndPrepareWarehouse();
      }
      setIsDialogOpen(false);

    } catch (error) {
      console.error('Failed to update bulk', error);

    }
  };

  const addWarehouse = async (warehouseData) => {
    try {
      await createWarehouse(warehouseData);
      fetchAndPrepareWarehouse();
      setIsAddWarehouseOpen(false);
      console.log('Warehouse added successfully');
    } catch (error) {
      console.error('Failed to add warehouse', error);
    }
  };

  const handleDeleteWarehouse = async () => {
    if (currentWarehouse) {
      try {
        await deleteWarehouse(currentWarehouse._id);
        setWarehouse(warehouses => warehouses.filter(w => w._id !== currentWarehouse._id));
        setisDeleteDialogOpen(false);
      } catch (error) {
        console.error('Failed to delete bulk', error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const availabiltyOptions = [
    { value: true, label: 'Available' },
    { value: false, label: 'Unavailable' }
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={warehouse}
        title="Warehouse Information"
        rowKey="warehouseId"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />

      <EditDropdown
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentWarehouse}
        fields={[
          { name: 'warehouseId', label: 'Warehouse ID', type: 'text', disabled: true },
          { name: 'storageCapacity', label: 'Capacity', type: 'number', disabled: false },
          { name: 'availability', label: 'Availability', type: 'dropdown', options: availabiltyOptions },
          { name: 'location', label: 'Location', type: 'text', disabled: false },
        ]}
        onSave={saveWarehouse}
        onDelete={handleDeleteWarehouse}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => setisDeleteDialogOpen(false)}
        handleDelete={handleDeleteWarehouse}
      />
      <UpdateBtn onClick={handleAddClick}><FontAwesomeIcon icon={faSquarePlus} style={{ cursor: "pointer", color: "#fffff" }} />&nbsp;&nbsp;Add</UpdateBtn>
      <AddDialog
        isOpen={isAddWarehouseOpen}
        handleClose={() => setIsAddWarehouseOpen(false)}
        entity={currentWarehouse}
        fields={[
          { name: 'storageCapacity', label: 'Capacity', type: 'text', disabled: false },
          { name: "availability", label: "Availability", type: 'dropdown', options: availabiltyOptions },
          { name: "location", label: "Location", type: 'text', disabled: false },

        ]}
        onSave={addWarehouse}
        schema={warehouseSchema}

      />

                <ReportBtn onClick={() =>     setShowPDFDialog(true)} color="secondary">
                <FontAwesomeIcon icon={faFile} style={{ cursor: "pointer", color: "#fffff" }} />&nbsp;&nbsp;  Export PDF
                </ReportBtn>

                {showPDFDialog && (
                <PDFExportDialog
                    open={showPDFDialog}
                    onClose={() => setShowPDFDialog(false)}
                    htmlContent={pdfHtmlContent}
                    filename="Warehouse Report.pdf"
                />
            )}
    </> 
  );
};

export default WarehouseInfo;
