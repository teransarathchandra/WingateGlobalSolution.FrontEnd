import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "@app_components/shared/ReusableTable";
import {
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
} from "@app_services/employeeService";
import { IEmployee } from "@app_interfaces/IEmployee";
import EditDialog from "@app_components/dialog/EditDialog";
import toastUtil from "@app_utils/toastUtil";

const columns: IColumn[] = [
  {
    id: "employeeId",
    label: "ID",
    numeric: false,
    disablePadding: false,
  },
  { id: "createdAt", label: "Created", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const EmployeeManageBox: React.FC = () => {
  const [employee, setEmployee] = useState<IRow[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<IEmployee | null>(
    null
  );

  const handleEditClick = (employee: IEmployee) => {
    setCurrentEmployee(employee);
    setIsDialogOpen(true);
  };

  const fetchAndPrepareSystemAccess = async () => {
    try {
      const response = await getAllEmployee();
      console.log(response);
      const preparedAccess: IRow[] = response.data.map(
        (employee: IEmployee) => ({
          ...employee,
          edit: (
            <button
              onClick={() => handleEditClick(employee)}
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
              onClick={() => deleteEmployee(employee)}
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
      setEmployee(preparedAccess);
    } catch (error) {
      console.error("Failed to fetch employee", error);
    }
  };

  useEffect(() => {
    fetchAndPrepareSystemAccess();
  }, []);

  const saveAccess = async (employeeData: IEmployee) => {
    console.log("Saving Access:", employeeData);
    try {
      // Assuming your currentEmployee state has the employee's ID
      // And that employeeData contains the updated employee fields
      const employeeId = employeeData;
      if (employeeId) {
        await updateEmployee(employeeId, {
          description: employeeData.description,
        }); // Call to your orderService
        console.log("Employee updated successfully");

        // Optionally, refresh the employee list to show the updated data
        fetchAndPrepareSystemAccess();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error("Failed to update employee", error);
    }
  };

  const onDeleteAccess = async (employee: IEmployee) => {
    console.log("Deleting employee:", employee);
    setIsDialogOpen(false);
    try {
      const employeeId = employee._id;
      console.log(employeeId);
      if (employeeId) {
        await deleteEmployee(employeeId); // Call to your orderService
        console.log("Deleted successfully");

        //Reload
        fetchAndPrepareSystemAccess();
      }
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={employee}
        title="Employee Management"
        rowKey="accessLevelId"
      />
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentEmployee}
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

export default EmployeeManageBox;
