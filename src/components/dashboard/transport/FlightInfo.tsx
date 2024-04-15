import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { getAllFlights, updateFlight, createFlight, deleteFlight } from "../../../services/flightService";
import { IFlight } from "../../../interfaces/IFlight";
import EditDialog from "../../dialog/EditDialog";
import { UpdateBtn } from "@app_styles/bulkDetails.styles";
import AddDialog from "@app_components/dialog/AddDialog";
import { getAllAirlines } from "@app_services/airlineService";


const columns: IColumn[] = [
  { id: "flightId", label: "Flight No", numeric: false, disablePadding: false },
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
  const [isAddFlightOpen, setIsAddFlightOpen] = useState(false);
  const [airlineOptions, setAirlineOptions] = useState([]);

  const handleEditClick = (flight: IFlight) => {
    setCurrentFlight(flight);
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    setIsAddFlightOpen(true);
  };

  const fetchAndPrepareFlights = async () => {
    try {
      const aggFlight = 'airlineIds';
      const response = await getAllFlights(aggFlight);
      const preparedFlights: IRow[] = response.data.map((flight: IFlight) => ({
        ...flight,
        _id: flight._id,
        edit: <button onClick={() => handleEditClick(flight)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} /></button>,
        delete: <button onClick={() => handleDeleteFlight(flight)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
      setFlights(preparedFlights);
    } catch (error) {
      console.error('Failed to fetch flights', error);
    }
  };
  
useEffect(() => {
  

  loadAirlines();
}, []);

const loadAirlines = async () => {
    try {
      const response = await getAllAirlines();
      const options = response.data.map(airline => ({
        value: airline.id,
        label: airline.name
      }));
      setAirlineOptions(options);
    } catch (error) {
      console.error("Failed to load airlines", error);
      setAirlineOptions([]);
    }
  };
  
  const addFlight = async (flightData) => {
    try {
      await createFlight(flightData);
      fetchAndPrepareFlights();
      setIsAddFlightOpen(false);
      console.log('Flight added successfully');
    } catch (error) {
      console.error('Failed to add flight', error);
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
const handleDeleteFlight = async (flight) => {
  console.log('Deleting flight:', flight);
  try {
    await deleteFlight(flight._id);
    console.log('Flight deleted successfully');
    setFlights(currentFlights => currentFlights.filter(f => f._id !== flight._id));
  } catch (error) {
    console.error('Failed to delete flight', error);
  }
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
      <UpdateBtn onClick={handleAddClick}>Add Flight</UpdateBtn>
      <AddDialog
        isOpen={isAddFlightOpen}
        handleClose={() => setIsAddFlightOpen(false)}
        entity={currentFlight}
        fields={[
          { name: 'flightId', label: 'Flight No', type: 'text', disabled: false },
          { name: 'type', label: 'Type', type: 'text', disabled: false },
          { name: "routeCostPerKilo", label: "Route Cost", type: 'text', disabled: false },
          { name: "arrival", label: "Arrival", type: 'dropdown', disabled: false },
          { name: 'arrivalTime', label: 'Arrival time', type: 'text', disabled: false },
          { name: "departure", label: "Departure", type: 'dropdown', disabled: false },
          { name: 'departureTime', label: 'Departure time', type: 'text', disabled: false },
          { name: "airline", label: "Airline", type: 'dropdown',options: airlineOptions },
          
        ]}
        onSave={addFlight}
      />
    </>
  );
};

export default FlightInfo;
