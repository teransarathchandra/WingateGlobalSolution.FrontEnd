import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "@app_components/shared/ReusableTable";
import {
  getAllEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@app_services/employeeService";
import { IEmployee } from "@app_interfaces/IEmployee";
import EditDialog from "@app_components/dialog/EditDialog";
import AddDialog from "@app_components/dialog/AddDialog";
import DeleteDialog from "@app_components/dialog/DeleteDialog";

const columns: IColumn[] = [
  {
    id: "employeeId",
    label: "ID",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "fullName",
    label: "Name",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "email",
    label: "Email",
    numeric: false,
    disablePadding: false,
  },

  { id: "createdAt", label: "Created", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const EmployeeManageBox: React.FC = () => {
  const [employee, setEmployee] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState<IEmployee | null>(null);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAddClick = () => {
    setIsAddEmployeeOpen(true);
  };
  const handleEditClick = (employee: IEmployee) => {
    setCurrentEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (employee: IEmployee) => {
    setCurrentEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteEmployeeConfirm = async () => {
    if (currentEmployee) {
      try {
        await deleteEmployee(currentEmployee._id);
        setEmployee(flights => flights.filter(b => b._id !== currentEmployee._id));
        setIsDeleteDialogOpen(false);
      } catch (error) {
        console.error('Failed to delete bulk', error);
      }
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployee();
      console.log(response);
      const preparedAccess: IRow[] = response.data.map((employee: IEmployee) => ({
        ...employee,
        _id: employee._id,
        fullName: (employee.name.firstName || "") + " " + (employee.name.lastName || " "),
        createdAt: new Date(employee.createdAt as Date).toLocaleDateString(),
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
            onClick={() => handleDeleteClick(employee)}
            style={{ all: "unset" }}
          >
            <FontAwesomeIcon
              icon={faTrash}
              style={{ cursor: "pointer", color: "#dd0426" }}
            />
          </button>
        ),
      }));
      setEmployee(preparedAccess);
    } catch (error) {
      console.error("Failed to fetch employee", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addAccess = async (employee) => {
    try {
      await createEmployee(employee);
      fetchEmployees();
      setIsAddEmployeeOpen(false);
      console.log('Flight added successfully');
    } catch (error) {
      console.error('Failed to add flight', error);
    }
  };

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
        fetchEmployees();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error("Failed to update employee", error);
    }
  };

  const ondeleteEmployee = async (employee: IEmployee) => {
    console.log("Deleting employee:", employee);
    setIsDialogOpen(false);
    try {
      const employeeId = employee._id;
      console.log(employeeId);
      if (employeeId) {
        await deleteEmployee(employeeId); // Call to your orderService
        console.log("Deleted successfully");

        //Reload
        fetchEmployees();
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
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onAdd={handleAddClick}
        showAddButton={true}
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
        onDelete={ondeleteEmployee}
      />
      <AddDialog
        title="Add Access Level"
        isOpen={isAddEmployeeOpen}
        handleClose={() => setIsAddEmployeeOpen(false)}
        entity={currentEmployee}
        fields={[
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            disabled: false
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            disabled: false
          },
          {
            name: "email",
            label: "Email",
            type: "text",
            disabled: false
          },
        ]}
        onSave={addAccess}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => setIsDeleteDialogOpen(false)}
        handleDelete={handleDeleteEmployeeConfirm}
      />
    </>
  );
};

export default EmployeeManageBox;
