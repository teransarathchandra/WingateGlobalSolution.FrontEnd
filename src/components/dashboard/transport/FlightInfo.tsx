import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { getAllFlights, updateFlight } from "../../../services/flightService";
import { IFlight } from "../../../interfaces/IFlight";
import EditDialog from "../../dialog/EditDialog";


const columns: IColumn[] = [
  { id: "flightId", label: "Flight ID", numeric: false, disablePadding: true },
  { id: "type", label: "Type", numeric: false, disablePadding: false },
  { id: "routeCostPerKilo", label: "Route Cost", numeric: false, disablePadding: false },
  { id: "arrival", label: "Arrival", numeric: false, disablePadding: false },
  { id: "arrivalTime", label: "Arrival Time", numeric: false, disablePadding: false },
  { id: "departure", label: "Departure", numeric: false, disablePadding: false },
  { id: "departureTime", label: "Departure Time", numeric: false, disablePadding: false },
  { id: "airlineName", label: "Airline", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];


const FlightInfo: React.FC = () => {
  const [flights, setFlights] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState<IFlight | null>(null);

  const handleEditClick = (flight: IFlight) => {
    setCurrentFlight(flight);
    setIsDialogOpen(true);
  };

  const fetchAndPrepareFlights = async () => {
    try {
      const aggFlight = 'airlineIds';
      const response = await getAllFlights(aggFlight);
      const preparedFlights: IRow[] = response.data.data.map((flight: IFlight) => ({
        ...flight,
        _id: flight._id,
        edit: <button onClick={() => handleEditClick(flight)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} /></button>,
        delete: <button onClick={() => deleteFlight(flight)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
      setFlights(preparedFlights);
    } catch (error) {
      console.error('Failed to fetch flights', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareFlights();
  }, []);

  const saveFlight = async (flightData) => {
    console.log('Saving Flight:', flightData);
    setIsDialogOpen(false);


  try {
    const flightId = currentFlight?._id;
    if (flightId) {
      await updateFlight(flightId, flightData); 
      console.log('Flight details updated successfully');

      
      fetchAndPrepareFlights();
    }
    setIsDialogOpen(false); 
  } catch (error) {
    console.error('Failed to update flight details', error);
    
  }
};
const deleteFlight = (flight) => {
  console.log('Deleting flight:', flight);
  setIsDialogOpen(false);
  
};
const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};
  return (
    <>
      <ReusableTable
        columns={columns}
        rows={flights}
        title="Flight Details"
        rowKey="flightId"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentFlight}
        fields={[
          { name: 'arrivalTime', label: 'Arrival time', type: 'text', disabled: false },
          { name: "departureTime", label: "Departure Time", type: 'text', disabled: false },
          { name: "routeCostPerKilo", label: "Route Cost", type: 'text', disabled: false },
        ]}
        onSave={saveFlight}
        onDelete={deleteFlight}
      />
    </>
  );
};

export default FlightInfo;
