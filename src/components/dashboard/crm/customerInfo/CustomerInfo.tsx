import DeleteDialog from "@app_components/dialog/DeleteDialog";
import EditDialog from "@app_components/dialog/EditDialog";
import ReusableTable from "@app_components/shared/ReusableTable";
import { ICustomer } from "@app_interfaces/ICustomer";
import { IColumn, IRow } from "@app_interfaces/ITable";
import {
  deleteCustomer,
  getAllCustomer,
  updateCustomer,
} from "@app_services/crmService";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const columns: IColumn[] = [
  {
    id: "customerId",
    label: "Customer ID",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "firstName",
    label: "First Name",
    numeric: false,
    disablePadding: false,
  },
  { id: "lastName", label: "Last Name", numeric: false, disablePadding: false },
  { id: "email", label: "Email", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
  { id: "seeDetails", label: "See Details", numeric: false, disablePadding: false },
];

const CustomerInfo: React.FC = () => {
  const [customers, setCustomers] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<ICustomer | null>( null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleViewClick = (customer: ICustomer) => {
    setIsViewOpen(true);
    setCurrentCustomer(customer);
  };
  const handleEditClick = (customer: ICustomer) => {
    console.log("Customer", customer);
    setCurrentCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (customer: ICustomer) => {
    console.log("Customer", customer);
    setCurrentCustomer(customer);
    setisDeleteDialogOpen(true);
  };

  const fetchAndPrepareCustomers = async () => {
    try {
      const response = await getAllCustomer();
      console.log("response", response);
      const preparedCustomer: IRow[] = response.data.data.map(
        (customer: ICustomer) => ({
          ...customer,
          _id: customer._id,
          firstName: customer.name.firstName,
          lastName: customer.name.lastName,
          seeDetails: <button onClick={() => handleViewClick(customer)} style={{ cursor: "pointer",backgroundColor: "#e1bd05", color: "#ffffff", border: "2px solid #e1bd05", borderRadius: "10px" }}>See More</button>,
          edit: (
            <button
              onClick={() => handleEditClick(customer)}
              style={{ all: "unset" }}
            >
              <FontAwesomeIcon
                icon={faPen}
                style={{ cursor: "pointer", color: "#23a840" }}
              />
            </button>
          ),
          delete: (
            <button
              onClick={() => handleDeleteClick(customer)}
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
      //console.log('Current Bulk:', currentBulk);
      setCustomers(preparedCustomer);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  useEffect(() => {
    fetchAndPrepareCustomers();
  }, []);

  const saveCustomer = async (customerData) => {
    console.log("Saving customer:", customerData);

    setIsDialogOpen(false);

    try {
      console.log("Saving");
      const customerId = currentCustomer?._id;
      console.log("Customer ID:", currentCustomer);
      if (customerId) {
        await updateCustomer(customerId, customerData);
        console.log(customerData);
        console.log("Customer updated successfully");

        fetchAndPrepareCustomers();
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update customer", error);
    }
  };

  const handleDeleteCustomer = async () => {
    if (currentCustomer) {
      try {
        await deleteCustomer(currentCustomer._id);
        setCustomers((customers) =>
          customers.filter((customers) => customers._id !== currentCustomer._id)
        );
        setisDeleteDialogOpen(false);
      } catch (error) {
        console.error("Failed to delete customer", error);
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
        rows={customers}
        title="Customer Details"
        rowKey="customerId"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentCustomer}
        fields={[
          {
            name: "customerId",
            label: "Customer ID",
            type: "text",
            disabled: true,
          },
          {
            name: "name.firstName",
            label: "First Name",
            type: "text",
            disabled: false,
          },
          {
            name: "name.lastName",
            label: "Last Name",
            type: "text",
            disabled: false,
          },
          { name: "email", label: "Email", type: "text", disabled: false },
        ]}
        onSave={saveCustomer}
        onDelete={deleteCustomer}
      />
      <EditDialog
        isOpen={isViewOpen}
        handleClose={() => setIsViewOpen(false)}
        entity={currentCustomer}
        fields={[
          {
            name: "customerId",
            label: "Customer ID",
            type: "text",
            disabled: true,
          },
          {
            name: "firstname",
            label: "First Name",
            type: "text",
            disabled: false,
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            disabled: false,
          },
          { name: "email", label: "Email", type: "text", disabled: false },
        ]}
        onSave={saveCustomer}
        onDelete={deleteCustomer}
      />
       <DeleteDialog
        isOpen= {isDeleteDialogOpen}
        handleClose={() => setisDeleteDialogOpen(false)}        
        handleDelete={handleDeleteCustomer}
      />
    </>
  );
};

export default CustomerInfo;
