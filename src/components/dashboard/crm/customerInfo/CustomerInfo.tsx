// Import necessary components and services for customer management and UI interactions.
import DeleteDialog from "@app_components/dialog/DeleteDialog";

import ReusableTable from "@app_components/shared/ReusableTable";
import { ICustomer } from "@app_interfaces/ICustomer";
import { IColumn, IRow } from "@app_interfaces/ITable";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  updateCustomer,
} from "@app_services/crmService";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getUserOrders } from "@app_services/userService";
import IUser from "@app_interfaces/IUser";
import UserDetailsDialog from "@app_components/dashboard/crm/crmDialog/CrmDialog";
import { ReportButton } from "@app_styles/userDetailsDialog.styles";
import UserReportDialog from "../crmDialog/CrmReportDialog";
import { UpdateBtn } from "@app_styles/bulkDetails.styles";
import AddDialog from "@app_components/dialog/AddDialog";
import EditDropdown from "@app_components/dialog/EditDropdown";

// Define the table columns for the customer data table.
const columns: IColumn[] = [
  { id: "customerId", label: "Customer ID", numeric: false, disablePadding: false },
  { id: "firstName", label: "First Name", numeric: false, disablePadding: false },
  { id: "lastName", label: "Last Name", numeric: false, disablePadding: false },
  { id: "email", label: "Email", numeric: false, disablePadding: false },
  { id: "priorityLevel", label: "Priority Level", numeric: false, disablePadding: false },
  { id: "birthday", label: "DOB", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
  { id: "seeDetails", label: "See Details", numeric: false, disablePadding: false },
  
];

// Functional component for managing customer information.
const CustomerInfo: React.FC = () => {
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // Function to handle click on customer row to fetch customer-specific orders and display details.
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setIsUserDetailsDialogOpen(true);
    try {
      const { data } = await getUserOrders(user._id);
      setSelectedUserOrders(data);
    } catch (error) {
      console.error('Error fetching orders for user:', error);
    }
  };

  const [customers, setCustomers] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<ICustomer | null>(null);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  const handleAddClick = () => {
    setIsAddCustomerOpen(true);
    setCurrentCustomer(null);
  };

  

  const [isUserReportDialogOpen, setIsUserReportDialogOpen] = useState(false);

  const handleUserReportClick = () => {
    setIsUserReportDialogOpen(true);
  };

  const handleEditClick = (customer: ICustomer) => {
    setCurrentCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (customer: ICustomer) => {
    setCurrentCustomer(customer);
    setisDeleteDialogOpen(true);
  };

  // Fetch all customers from backend and prepare data for display.
  const fetchAndPrepareCustomers = async () => {
    try {
      const response = await getAllCustomer();
      const preparedCustomer: IRow[] = response.data.data.map((customer: ICustomer) => ({
        ...customer,
        _id: customer._id,
       firstName: customer.name?.firstName || '', // Use optional chaining and nullish coalescing
      lastName: customer.name?.lastName || '',
        email: customer.email,
      priorityLevel: customer.priorityLevel,
      birthday: customer.birthday ? customer.birthday.split('T')[0] : '',
        seeDetails: <button onClick={() => handleUserClick(customer)} style={{ cursor: "pointer", backgroundColor: "#e1bd05", color: "#ffffff", border: "2px solid #e1bd05", borderRadius: "10px" }}>See More</button>,
        edit: (
          <button onClick={() => handleEditClick(customer)} style={{ all: "unset" }}>
            <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} />
          </button>
        ),
        delete: (
          <button onClick={() => handleDeleteClick(customer)} style={{ all: "unset" }}>
            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} />
          </button>
        ),
      }));
      setCustomers(preparedCustomer);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  useEffect(() => {
    fetchAndPrepareCustomers();
  }, []);
  // const updateCustomerDetails = async (customerId, updatedData) => {
  //   try {
  //     // Prepare the data for the update request in the required structure
  //     const updateData = {
  //       name: {
  //         firstName: updatedData.firstName, // these should be taken from form inputs
  //         lastName: updatedData.lastName,   // these should be taken from form inputs
  //       },
  //       email: updatedData.email,           // these should be taken from form inputs
  //       contactNumber: updatedData.contactNumber, // these should be taken from form inputs
  //       priorityLevel: updatedData.priorityLevel, // these should be taken from form inputs
  //       birthday: updatedData.birthday,     // these should be taken from form inputs
  //     };
  
    
  //     const response = await updateCustomerDetails(customerId, updateData);
  
  
  //   } catch (error) {
  //     console.error('Failed to update customer details:', error);
     
  //   }
  // };


  const saveCustomer = async (customerData) => {
    console.log('Saving customer:', customerData);

    setIsDialogOpen(false);

    try {
      console.log('Saving');
      const customerId = currentCustomer?._id;
      console.log('Customer ID:', currentCustomer);
      if (customerId) {
        console.log(customerData);
        await updateCustomer(customerId, customerData);
        console.log(customerData);
        console.log('Customer updated successfully');
        

        fetchAndPrepareCustomers();
      }
      setIsDialogOpen(false);

    } catch (error) {
      console.error('Failed to update customer', error);

    }
  };
  const addCustomer = async (formData) => {
    // Construct the new customer object with nested 'name' object
    const CustomerInfo = {
      name: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      contactNumber: formData.contactNumber,
      priorityLevel: formData.priorityLevel,
      birthday: formData.birthday,
    };
  
    try {
      await createCustomer(CustomerInfo);
      fetchAndPrepareCustomers(); // Refresh the list
      setIsAddCustomerOpen(false); // Close the dialog
    } catch (error) {
      console.error('Failed to add customer', error);
    }
  };
  

  // const saveCustomer = async (customerData) => {
  //   setIsDialogOpen(false);
    
  //   try {
  //     if (currentCustomer?._id) {
  //       await updateCustomer(currentCustomer._id, customerData);
  //       fetchAndPrepareCustomers();
  //     }
  //   } catch (error) {
  //     console.error("Failed to update customer", error);
  //   }
  // };

  // const addCustomer = async (customerData) => {
  //   try {
  //     await createCustomer(customerData);
  //     fetchAndPrepareCustomers();
  //     setIsAddCustomerOpen(false);
  //   } catch (error) {
  //     console.error('Failed to add customer', error);
  //   }
  // };

  const handleDeleteCustomer = async () => {
    if (currentCustomer) {
      try {
        await deleteCustomer(currentCustomer._id);
        setCustomers(customers.filter((customer) => customer._id !== currentCustomer._id));
        setisDeleteDialogOpen(false);
      } catch (error) {
        console.error("Failed to delete customer", error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const priorityOptions= [
    { value: "High Priority", label: "High Priority" },
    { value: "Medium Priority", label: "Medium Priority" },
    { value: "Low Priority", label: "Low Priority" }
  ];

  // Render component UI.
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
      <EditDropdown
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentCustomer}
        fields={[
          { name: "customerId", label: "Customer ID", type: "text", disabled: true },
          // { name: "name.firstName", label: "First Name", type: "text", disabled: false },
          //{ name: "name.lastName", label: "Last Name", type: "text", disabled: false },
          { name: "contactNumber", label: "Contact Number", type: "text", disabled: false },
          { name: "email", label: "Email", type: "text", disabled: false },
          { name: "priorityLevel", label: "Priority Level", type: "dropdown", options: priorityOptions },
          { name: "birthday", label: "Birth Date", type: "date", disabled: false },
          
        ]}
        onSave={saveCustomer}
        onDelete={deleteCustomer}
      />
      <UserDetailsDialog
        isOpen={isUserDetailsDialogOpen}
        user={selectedUser}
        orders={selectedUserOrders}
        handleClose={() => setIsUserDetailsDialogOpen(false)}
      />
      <UserReportDialog
        isOpen={isUserReportDialogOpen}
        handleClose={() => setIsUserReportDialogOpen(false)}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => setisDeleteDialogOpen(false)}
        handleDelete={handleDeleteCustomer}
      />
      <ReportButton onClick={handleUserReportClick}>Generate Report</ReportButton>
      <UpdateBtn onClick={handleAddClick}>Add Customer</UpdateBtn>
      <AddDialog
  isOpen={isAddCustomerOpen}
  handleClose={() => setIsAddCustomerOpen(false)}
  entity={currentCustomer}
  fields={[
    // Assuming 'customerId' is auto-generated by the backend and should not be in the add form.
    { name: 'firstName', label: 'First Name', type: 'text', disabled: false },
    { name: 'lastName', label: 'Last Name', type: 'text', disabled: false },
    { name: "email", label: "Email", type: 'text', disabled: false },
    { name: "contactNumber", label: "Contact Number", type: 'text', disabled: false },
    { name: "priorityLevel", label: "Priority Level", type: 'dropdown', options: priorityOptions },
    { name: "birthday", label: "Birthday", type: 'date', disabled: false },
  ]}
  onSave={addCustomer}
  
/>

    </>
  );
};

// Export the CustomerInfo component to be used in other parts of the application.
export default CustomerInfo;
