import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { getAllAirlines, updateAirline } from "../../../services/airlineService";
import { IAirline } from "../../../interfaces/IAirline";
import EditDialog from "@app_components/dialog/EditDialog";



const columns: IColumn[] = [
  { id: "airlineId", label: "Airline ID", numeric: false, disablePadding: true },
  { id: "code", label: "Code", numeric: false, disablePadding: false },
  { id: "name", label: " Name", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];


const AirlineInfo: React.FC = () => {
  const [airlines, setAirlne] = useState<IRow[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAirline, setCurrentAirline] = useState<IAirline | null>(null);

  const handleEditClick = (airline: IAirline) => {
    console.log("Airline" , airline);
    setCurrentAirline(airline);
    setIsDialogOpen(true);
  };

  const fetchAndPrepareAirlines = async () => {
    try {
      const response = await getAllAirlines();
      console.log("response", response);
      const preparedAirlines: IRow[] = response.data.data.map((airline: IAirline) => ({
        ...airline,
        _id: airline._id,
        edit: <button onClick={() => handleEditClick(airline)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} /></button>,
        delete: <button onClick={() => deleteAirline(airline)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
       console.log('Current Airline:', currentAirline);
      setAirlne(preparedAirlines);
    } catch (error) {
      console.error('Failed to fetch airlines', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareAirlines();
  }, []);

  const saveAirline = async (airlineData) => {
    console.log('Saving airline:', airlineData);

    setIsDialogOpen(false);

    try {
      console.log('Saving');
      const airlineId = currentAirline?._id;
      console.log('Airline ID:', currentAirline);
      if (airlineId) {
        await updateAirline(airlineId, airlineData);
        console.log(airlineData)
        console.log('Airline updated successfully');
        

        fetchAndPrepareAirlines();
      }
      setIsDialogOpen(false);

    } catch (error) {
      console.error('Failed to update airline', error);

    }
  };
  const deleteAirline = (airline) => {
    console.log('Deleting airline:', airline);
    setIsDialogOpen(false);

  };
  return (
    <>
      <ReusableTable
        columns={columns}
        rows={airlines}
        title="Airline Details"
        rowKey="airlineId"
      />
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentAirline}
        fields={[
          { name: 'airlineId', label: 'Airline ID', type: 'text', disabled: true },
          { name: "code", label: "Code", type: 'text', disabled: false },
          { name: "name", label: "Name", type: 'text', disabled: false },
        ]}
        onSave={saveAirline}
        onDelete={deleteAirline}
      />
    </>
  );
};

export default AirlineInfo;
