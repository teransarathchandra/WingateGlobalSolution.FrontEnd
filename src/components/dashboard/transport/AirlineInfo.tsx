import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { createAirline, deleteAirline, getAllAirlines, updateAirline } from "../../../services/airlineService";
import { IAirline } from "../../../interfaces/IAirline";
import EditDialog from "@app_components/dialog/EditDialog";
import { UpdateBtn } from "@app_styles/bulkDetails.styles";
import AddDialog from "@app_components/dialog/AddDialog";
import DeleteDialog from "@app_components/dialog/DeleteDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAirlineSchema } from "@app_schemas/bulk/addAirline.Schema";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { addAirlineSchema } from "@app_schemas/bulk/addAirline.Schema";



const columns: IColumn[] = [
  { id: "airlineId", label: "Airline ID", numeric: false, disablePadding: true },
  { id: "code", label: "Code", numeric: false, disablePadding: false },
  { id: "name", label: " Name", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];



const AirlineInfo: React.FC = () => {
  const [airlines, setAirlne] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);
  const [isAddAirlineOpen, setIsAddAirlineOpen] = useState(false);
  const [currentAirline, setCurrentAirline] = useState<IAirline | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAirlineSchema),
  });

  const handleEditClick = (airline: IAirline) => {
    console.log("Airline", airline);
    setCurrentAirline(airline);
    setIsDialogOpen(true);
  };
  const handleAddClick = () => {
    setIsAddAirlineOpen(true);
  };

  const handleDeleteClick = (airline: IAirline) => {
    console.log("Airline", airline);
    setCurrentAirline(airline);
    setisDeleteDialogOpen(true);
  };

  const fetchAndPrepareAirlines = async () => {
    try {
      const response = await getAllAirlines();
      console.log("response", response);
      const preparedAirlines: IRow[] = response.data.map((airline: IAirline) => ({
        ...airline,
        _id: airline._id,
        edit: <button onClick={() => handleEditClick(airline)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} /></button>,
        delete: <button onClick={() => handleDeleteClick(airline)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
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
    console.log('Saving Airline:', airlineData);
    setIsDialogOpen(false);
    try {
      const airlineId = currentAirline?._id;
      if (airlineId) {
        await updateAirline(airlineId, airlineData);
        console.log('Airline details updated successfully');


        fetchAndPrepareAirlines();
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to update airline details', error);

    }
  };

  const addAirline = async (airlineData) => {
    try {
      await createAirline(airlineData);
      fetchAndPrepareAirlines();
      setIsAddAirlineOpen(false);
      console.log('Airline added successfully');
    } catch (error) {
      console.error('Failed to add airline', error);
    }
  };

  const handleDeleteAirline = async () => {
    if (currentAirline) {
      try {
        await deleteAirline(currentAirline._id);
        setAirlne(bulks => bulks.filter(b => b._id !== currentAirline._id));
        setisDeleteDialogOpen(false);
      } catch (error) {
        console.error('Failed to delete airline', error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={airlines}
        title="Airline Details"
        rowKey="airlineId"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
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
      <UpdateBtn onClick={handleAddClick}>Add Airline</UpdateBtn>
      <AddDialog
        isOpen={isAddAirlineOpen}
        handleClose={() => setIsAddAirlineOpen(false)}
        entity={currentAirline}
        fields={[
          //{ name: 'flightId', label: 'Flight No', type: 'text', disabled: false },
          { name: 'code', label: 'Code', type: 'text', disabled: false },
          { name: "name", label: "Name", type: 'text', disabled: false },

        ]}
        onSave={addAirline}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => setisDeleteDialogOpen(false)}
        handleDelete={handleDeleteAirline}
      />
    </>
  );
};

export default AirlineInfo;
