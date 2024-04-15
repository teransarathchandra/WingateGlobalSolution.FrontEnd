import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../../../interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import { getAllCountry, updateCountry, deleteCountry } from "../../../../../services/countryService";
import { ICountry } from "../../../../../interfaces/ICountry";
import EditDialog from "../../../../dialog/EditDialog";

const columns: IColumn[] = [
  { id: "countryId", label: "Country ID", numeric: false, disablePadding: true },
  { id: "countryCode", label: "Country Code", numeric: false, disablePadding: false },
  { id: "name", label: "Name", numeric: false, disablePadding: false },
  { id: "currency", label: "Currency", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const CountryInfo: React.FC = () => {
  const [country, setCountry] = useState<IRow[]>([]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<ICountry | null>(null);

  const handleEditClick = (country: ICountry) => {
    setCurrentCountry(country);
    saveCountry(country);
    setEditDialogOpen(true);
  };
  const handleClose = () => {
    setEditDialogOpen(false);
  };

  const fetchAndPrepareCountry = async () => {
    try {
      const response = await getAllCountry();
      const preparedCountry: IRow[] = response.data.data.map((country: ICountry) => ({
        ...country,
        edit: <button onClick={() => handleEditClick(country)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} /></button>,
        delete: <button onClick={() => handleDeleteCountry(country?._id)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
      setCountry(preparedCountry);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareCountry();
  }, []);

  const saveCountry = async (countryData) => {
    console.log('Saving country:', countryData);
    setEditDialogOpen(false);
    try {
      const countryId = currentCountry?._id;
      if (countryId) {

        // const dataToUpdate = countryData;
        // console.log(dataToUpdate);
        // delete dataToUpdate._id;
        // delete dataToUpdate.countryId;
        // console.log(dataToUpdate);

        const data = {
          name: countryData.name,
          description: countryData.description,
          costPerKilo: countryData.costPerKilo
        }
        await updateCountry(countryId, data);
        console.log('country updated successfully');

        fetchAndPrepareCountry();
      }
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update country', error);
    }
  };

  const handleDeleteCountry = async (countryID) => {
    if (!countryID) {
      console.error('No ID available for deleting the country');
      return;
    }
    try {
      const response = await deleteCountry(countryID);
      console.log('country deleted successfully:', response);
      setEditDialogOpen(false);

    } catch (error) {
      console.error('Failed to update country', error);
    }
    handleClose;
  };


  return (
    <>
      <ReusableTable
        columns={columns}
        rows={country}
        title="Country"
        rowKey="countryID"
      />
      {<EditDialog
        isOpen={isEditDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        entity={currentCountry}
        fields={[
          { name: 'countryId', label: 'Country Id', type: 'text', disabled: false },
          { name: 'countryCode', label: 'Country Code', type: 'text', disabled: false },
          { name: 'name', label: 'Name', type: 'text', disabled: false },
          { name: 'currency', label: 'Currency', type: 'text', disabled: false },
        ]}
        onSave={saveCountry}
        onDelete={deleteCountry}
      />}
    </>
  );
};

export default CountryInfo;
