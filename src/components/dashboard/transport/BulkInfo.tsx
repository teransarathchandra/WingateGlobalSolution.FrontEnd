import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { getAllBulks, updateBulk } from "../../../services/bulkService";
import { IBulk } from "../../../interfaces/IBulk";
import EditDropdown from "../../dialog/EditDropdown";


const columns: IColumn[] = [
  { id: "bulkId", label: "Bulk ID", numeric: false, disablePadding: false },
  { id: "masterAirwayBillId", label: "Master Airway Bill ID", numeric: false, disablePadding: false },
  { id: "flightId", label: "Flight No", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
  { id: "seeDetails", label: "See Details", numeric: false, disablePadding: false },
];


const BulkInfo: React.FC = () => {
  const [bulks, setBulks] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentBulk, setCurrentBulk] = useState<IBulk | null>(null);

  const handleViewClick = (bulk: IBulk) => {
    setIsViewOpen(true);
    setCurrentBulk(bulk);
  };
  const handleEditClick = (bulk: IBulk) => {
    console.log("Bulk" , bulk);
    setCurrentBulk(bulk);
    setIsDialogOpen(true);
  };

  const fetchAndPrepareBulks = async () => {
    try {
      const aggType = 'bulkIds';
      const response = await getAllBulks(aggType);
      console.log("response", response);
      const preparedBulks: IRow[] = response.data.data.map((bulk: IBulk) => ({
        ...bulk,
        _id: bulk._id,
        seeDetails: <button onClick={() => handleViewClick(bulk)} style={{ cursor: "pointer",backgroundColor: "#e1bd05", color: "#ffffff", border: "2px solid #e1bd05", borderRadius: "10px" }}>See More</button>,
        edit: <button onClick={() => handleEditClick(bulk)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} /></button>,
        delete: <button onClick={() => deleteBulk(bulk)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
       console.log('Current Bulk:', currentBulk);
      setBulks(preparedBulks);
    } catch (error) {
      console.error('Failed to fetch bulks', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareBulks();
  }, []);

  const saveBulk = async (bulkData) => {
    console.log('Saving bulk:', bulkData);

    setIsDialogOpen(false);

    try {
      console.log('Saving');
      const bulkId = currentBulk?._id;
      console.log('Bulk ID:', currentBulk);
      if (bulkId) {
        await updateBulk(bulkId, bulkData);
        console.log(bulkData)
        console.log('Bulk updated successfully');
        

        fetchAndPrepareBulks();
      }
      setIsDialogOpen(false);

    } catch (error) {
      console.error('Failed to update bulk', error);

    }
  };
  const deleteBulk = (bulk) => {
    console.log('Deleting bulk:', bulk);
    setIsDialogOpen(false);

  };

  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  const dropdownOptions = [
    { label: "UL101", value: "6608e3cd3f01685b847abe04" },
    { label: "UE107", value: "66094259a85978a562cc526b" },
    
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={bulks}
        title="Bulk Details"
        rowKey="bulkId"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <EditDropdown
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentBulk}
        fields={[
          { name: 'bulkId', label: 'Bulk ID', type: 'text', disabled: true },
          { name: "masterAirwayBillId", label: "Master Airway Bill ID", type: 'text', disabled: false },
          { name: "flightId", label: "Flight No", type: 'dropdown', options: dropdownOptions },
        ]}
        onSave={saveBulk}
        onDelete={deleteBulk}
      />

<EditDropdown
        isOpen={isViewOpen}
        handleClose={() => setIsViewOpen(false)}
        entity={currentBulk}
        fields={[
          { name: 'bulkId', label: 'Bulk ID', type: 'text', disabled: true },
          { name: 'currentLocation', label: 'Current Location', type: 'text', disabled: true },
          { name: 'arrivedTime', label: 'Arrived Time', type: 'text', disabled: true },
          { name: 'status', label: 'Status', type: 'text', disabled: true },
          { name: 'destinationCountry', label: 'Destination Country', type: 'text', disabled: true },
          { name: "masterAirwayBillId", label: "Master Airway Bill ID", type: 'text', disabled: true },
          { name: "flightId", label: "Flight No", type: 'text', disabled: true }, 
        ]}
        onSave={saveBulk}
        onDelete={deleteBulk}
      />
    </>
  );
};

export default BulkInfo;
