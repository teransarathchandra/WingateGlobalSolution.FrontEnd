import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../../../interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import {
  createCountry,
  getAllCountry,
  updateCountry,
  deleteCountry,
} from "../../../../../services/countryService";
import { ICountry } from "../../../../../interfaces/ICountry";
import EditDialog from "../../../../dialog/EditDialog";
import AddCountryForm from "../dialogs/CountryAddDialog";

const columns: IColumn[] = [
  { id: "countryId",label: "Country ID",numeric: false,disablePadding: true,},
  { id: "countryCode",label: "Country Code",numeric: false,disablePadding: false,},
  { id: "name", label: "Name", numeric: false, disablePadding: false },
  { id: "currency", label: "Currency", numeric: false, disablePadding: false },
  { id: "cost", label: "Cost", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const CountryInfo: React.FC = () => {
  const [country, setCountry] = useState<IRow[]>([]);
  //const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<ICountry | null>(null);
  const [isAddCountryOpen, setIsAddCountryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (country: ICountry) => {
    console.log("Country", country);
    setCurrentCountry(country);
    setIsDialogOpen(true);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
    setIsAddCountryOpen(false);
    fetchAndPrepareCountry();
  };
  const handleAddClick = () => {
    setIsAddCountryOpen(true);
  };
  const handleDelete = (countryId) => {
    handleDeleteCountry(countryId);
    fetchAndPrepareCountry();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddCountry = async (country: ICountry) => {
    try {
      createCountry(country);
      fetchAndPrepareCountry();
    } catch (error) {
      console.error("Failed to fetch countries", error);
    }
  };

  const fetchAndPrepareCountry = async () => {
    try {
      const response = await getAllCountry();
      const preparedCountry: IRow[] = response.data.map(
        (country: ICountry) => ({
          ...country,
          edit: (
            <button
              onClick={() => handleEditClick(country)}
              style={{ all: "unset" }}
            >
              <FontAwesomeIcon
                icon={faPen}
                style={{ cursor: "pointer", color: "#0c1821" }}
              />
            </button>
          ),
          delete: (
            <button
              onClick={() => handleDelete(country?._id)}
              style={{ all: "unset" }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                style={{ cursor: "pointer", color: "#dd0426" }}
              />
            </button>
          ),
        })
      );
      setCountry(preparedCountry);
    } catch (error) {
      console.error("Failed to fetch countries", error);
    }
  };

  useEffect(() => {
    fetchAndPrepareCountry();
  }, []);

  const saveCountry = async (countryData) => {
    console.log("Saving country:", countryData);

    setIsDialogOpen(false);

    try {
      console.log("Saving");
      const countryId = currentCountry?._id;
      console.log("Country ID:", currentCountry);
      if (countryId) {
        await updateCountry(countryId, countryData);
        console.log(countryData);
        console.log("Country updated successfully");

        fetchAndPrepareCountry();
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update bulk", error);
    }
  };

  const handleDeleteCountry = async (countryID) => {
    if (!countryID) {
      console.error("No ID available for deleting the country");
      return;
    }
    try {
      const response = await deleteCountry(countryID);
      console.log("country deleted successfully:", response);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update country", error);
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
        onAdd={handleAddClick}
        showAddButton={true}
        // showSearchBar={true}
        // label="Search"
        //onSearch={handleSearch}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <AddCountryForm
        onAdd={handleAddCountry}
        isOpen={isAddCountryOpen}
        handleClose={handleClose}
      />
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={handleClose}
        entity={currentCountry}
        fields={[
          { name: "countryId", label: "Country Id", type: "text", disabled: true,},
          { name: "countryCode",label: "Country Code",type: "text",disabled: false,},
          { name: "name", label: "Name", type: "text", disabled: false },
          { name: "currency",label: "Currency",type: "text", disabled: false,},
          { name: "cost", label: "Cost", type: "text", disabled: false },
        ]}
        onSave={saveCountry}
        onDelete={deleteCountry}
        
      />
    </>
  );
};

export default CountryInfo;
