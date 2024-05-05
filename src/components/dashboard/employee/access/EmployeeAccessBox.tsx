import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import AccessReusableTable from "@app_components/shared/AccessTable";
import {
  getAllAccess,
  createAccess,
  updateAccess,
  deleteAccess,
} from "@app_services/accessService";
import { IAccess } from "@app_interfaces/IAccess";
import EditDialog from "@app_components/dialog/employee/EmployeeEditDialog";
import AddDialog from "@app_components/dialog/employee/EmployeeAddDialog";
import DeleteDialog from "@app_components/dialog/employee/EmployeeDeleteDialog";

const columns: IColumn[] = [
  {
    id: "accessLevelId",
    label: "Access Level ID",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "description",
    label: "Description",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "accessAreas",
    label: "Access Areas",
    numeric: false,
    disablePadding: false,
    type: "chips"
  },
  { id: "createdAt", label: "Created", numeric: false, disablePadding: false },
  { id: "updatedAt", label: "Modified", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const EmployeeAccessBox: React.FC = () => {
  const [access, setAccess] = useState<IRow[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentAccess, setCurrentAccess] = useState<IAccess | null>(null);
  const [isAddAccessOpen, setIsAddAccessOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAddClick = () => {
    setCurrentAccess(null);
    setIsAddAccessOpen(true);
  };

  const handleEditClick = (access: IAccess) => {
    setCurrentAccess(access);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (access: IAccess) => {
    setCurrentAccess(access);
    setIsDeleteDialogOpen(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteAccessConfirm = async () => {
    if (currentAccess) {
      try {
        await deleteAccess(currentAccess._id);
        setAccess(flights => flights.filter(b => b._id !== currentAccess._id));
        setIsDeleteDialogOpen(false);
      } catch (error) {
        console.error('Failed to delete bulk', error);
      }
    }
  };

  const fetchAndPrepareSystemAccess = async () => {
    try {
      const response = await getAllAccess();
      console.log(response);
      const preparedAccess: IRow[] = response.data.map((access: IAccess) => ({
        ...access,
        _id: access._id,
        createdAt: new Date(access.createdAt).toLocaleDateString(),
        updatedAt: new Date(access.updatedAt).toLocaleDateString(),
        edit: (
          <button
            onClick={() => handleEditClick(access)}
            style={{ all: "unset" }}
          >
            <FontAwesomeIcon
              icon={faPen}
              style={{ cursor: "pointer", color: "#0c1821" }}
            />
          </button>
        ),
        delete: (
          <button onClick={() => handleDeleteClick(access)} style={{ all: "unset" }}>
            <FontAwesomeIcon
              icon={faTrash}
              style={{ cursor: "pointer", color: "#dd0426" }}
            />
          </button>
        ),
      }));
      setAccess(preparedAccess);
    } catch (error) {
      console.error("Failed to fetch access", error);
    }
  };

  useEffect(() => {
    fetchAndPrepareSystemAccess();
  }, []);

  const addAccess = async (access) => {
    try {
      delete access._id;
      delete access.accessLevelId;
      await createAccess(access);
      fetchAndPrepareSystemAccess();
      setIsAddAccessOpen(false);
      console.log('Flight added successfully');
    } catch (error) {
      console.error('Failed to add flight', error);
    }
  };

  const saveAccess = async (accessData: IAccess) => {
    console.log("Saving Access:", accessData);
    try {
      const accessId = accessData._id;
      const tempAccess = {
        accessAreas: accessData.accessAreas,
        description: accessData.description
      }
      if (accessId) {
        await updateAccess(accessId, tempAccess);
        console.log("Order updated successfully");

        fetchAndPrepareSystemAccess();
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update order", error);
    }
  };

  const onDeleteAccess = async (access: IAccess) => {
    console.log("Deleting access:", access);
    setIsDialogOpen(false);
    try {
      const accessId = access._id || "";
      console.log(accessId);
      if (accessId) {
        await deleteAccess(accessId); // Call to your orderService
        console.log("Deleted successfully");

        //Reload
        fetchAndPrepareSystemAccess();
      }
    } catch (error) {
      console.error("Failed to delete access", error);
    }
  };

  return (
    <>
      <AccessReusableTable
        columns={columns}
        rows={access}
        title="System Access Management"
        rowKey="accessLevelId"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onAdd={handleAddClick}
        showAddButton={true}
      />
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentAccess}
        fields={[
          {
            name: "accessLevelId",
            label: "Access Level ID",
            type: "text",
            disabled: true,
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            disabled: false,
          },
          {
            name: "accessAreas",
            label: "Access Areas",
            type: "text",
            disabled: false,
          },
        ]}

        onSave={saveAccess}
        onDelete={onDeleteAccess}
      />
      <AddDialog
        title="Add Access Level"
        isOpen={isAddAccessOpen}
        handleClose={() => setIsAddAccessOpen(false)}
        entity={currentAccess}
        fields={[
          {
            name: "accessLevelId",
            label: "Access Level ID",
            type: "text",
            disabled: true,
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            disabled: false,
          },
          {
            name: "accessAreas",
            label: "Access Areas",
            type: "text",
            disabled: false,
          },
        ]}
        onSave={addAccess}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => setIsDeleteDialogOpen(false)}
        handleDelete={handleDeleteAccessConfirm}
      />
    </>
  );
};

export default EmployeeAccessBox;
