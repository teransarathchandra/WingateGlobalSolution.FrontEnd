import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "@app_components/shared/ReusableTable";
import {
  getAllAccess,
  updateAccess,
  deleteAccess,
} from "@app_services/accessService";
import { IAccess } from "@app_interfaces/IAccess";
import EditDialog from "@app_components/dialog/EditDialog";

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
  { id: "createdAt", label: "Created", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const EmployeeAccessBox: React.FC = () => {
  const [access, setAccess] = useState<IRow[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAccess, setCurrentAccess] = useState<IAccess | null>(null);

  const handleEditClick = (access: IAccess) => {
    setCurrentAccess(access);
    setIsDialogOpen(true);
  };

  const fetchAndPrepareSystemAccess = async () => {
    try {
      const response = await getAllAccess();
      console.log(response);
      const preparedAccess: IRow[] = response.data.map((access: IAccess) => ({
        ...access,
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
          <button onClick={() => deleteAccess(access)} style={{ all: "unset" }}>
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

  const saveAccess = async (accessData: IAccess) => {
    console.log("Saving Access:", accessData);
    try {
      // Assuming your currentAccess state has the order's ID
      // And that accessData contains the updated order fields
      const accessId = accessData._id;
      if (accessId) {
        await updateAccess(accessId, { description: accessData.description }); // Call to your orderService
        console.log("Order updated successfully");

        // Optionally, refresh the access list to show the updated data
        fetchAndPrepareSystemAccess();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error("Failed to update order", error);
    }
  };

  const onDeleteAccess = async (access: IAccess) => {
    console.log("Deleting access:", access);
    setIsDialogOpen(false);
    try {
      const accessId = access._id;
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
      <ReusableTable
        columns={columns}
        rows={access}
        title="System Access Management"
        rowKey="accessLevelId"
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
        ]}
        onSave={saveAccess}
        onDelete={onDeleteAccess}
      />
    </>
  );
};

export default EmployeeAccessBox;
