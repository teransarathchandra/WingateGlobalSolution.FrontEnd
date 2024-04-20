import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "@app_components/shared/ReusableTable";
import { getAllCustomer, updateCustomer, deleteCustomer } from "@app_services/crmService";
import { ICustomer } from "@app_interfaces/ICustomer";
import EditDialog from "@app_components/dialog/EditDialog";



const columns: IColumn[] = [
  { id: "customerId", label: "Customer ID", numeric: false, disablePadding: false },
  { id: "firstName", label: "First Name", numeric: false, disablePadding: false },
  { id: "lastName", label: "Last Name", numeric: false, disablePadding: false },
  { id: "email", label: "E-mail", numeric: false, disablePadding: false },
  { id: "phoneNumber", label: "Phone Number", numeric: true, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
  
];

const CustomerInfo: React.FC = () => {
  const [customer, setCustomer] = useState<IRow[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<ICustomer | null>(null);

  const handleEditClick = (customer: ICustomer) => {
    setCurrentCustomer(customer);
    setIsDialogOpen(true);
  };


const fetchAndPrepareCustomer = async () => {
    try {
      const response = await getAllCustomer();
      console.log("response", response);
      const preparedCustomers: IRow[] = response.data.map((customer: ICustomer) => ({
        ...customer,
        _id: customer._id,
        //: <button onClick={() => handleViewClick(customer)} style={{ cursor: "pointer",backgroundColor: "#e1bd05", color: "#ffffff", border: "2px solid #e1bd05", borderRadius: "10px" }}>See More</button>,
        edit: <button onClick={() => handleEditClick(customer)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} /></button>,
        delete: <button onClick={() => handleDeleteCustomer(customer)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
       console.log('Current customer:', currentCustomer);
      setCustomer(preparedCustomers);
    } catch (error) {
      console.error('Failed to fetch customers', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareCustomer();
  }, []);

  const saveCustomer = async (customerData) => {
    console.log('Saving customer:', customerData);
    setIsDialogOpen(false);
    try {
      // Assuming your currentcustomer state has the customer's ID
      // And that customerData contains the updated customer fields
      const customerId = currentCustomer?._id;
      if (customerId) {

        // Prepare the customer update object based on the expected backend structure
        const customerUpdateData = {
          name: {
            firstName: customerData.name.firstName,
            lastName: customerData.name.lastName,
          },
          email: customerData.email,
          contactNumber: customerData.contactNumber,
        };

        await updateCustomer(customerId, customerUpdateData); // Call to your customerService
        console.log('Customer updated successfully');

        // Optionally, refresh the customers list to show the updated data
        fetchAndPrepareCustomer();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error('Failed to update customer', error);
      // Handle error (e.g., show error message to customer)
    }
  };

  const handleDeleteCustomer = async (customerToDelete) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Do you want to delete this customer permanently?");
    if (!isConfirmed) {
      return; // Stop if the customer cancels
    }
  
    try {
      await deleteCustomer(customerToDelete._id);
      console.log(`Customer Deleted Successfully, customer ID: ${customerToDelete._id}`);
      const updatedCustomers = customer.filter(u => u.customerId !== customerToDelete._id);
      setCustomer(updatedCustomers);
    } catch (error) {
      console.error('Failed to delete customer', error);
      // Optionally, show an error message to the customer
    }
  };
  

  return (
    <>
    {/* <img src={addCustomerIcon} alt="Customer" style={{ width: '30px', height: '30px' }} /> */}
      <ReusableTable
        columns={columns}
        rows={customer}
        title="Customer Information"
        rowKey="customerID"
      />

      {console.log(currentCustomer)}

      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentCustomer}
        fields={[
          { name: "customerId", label: "Customer ID", type: 'text', disabled: true },
          { name: "name.firstName", label: "First Name", type: 'text', disabled: false },
          { name: "name.lastName", label: "Last Name", type: 'text', disabled: false },
          { name: "email", label: "Email", type: 'text', disabled: false },
          { name: "contactNumber", label: "Phone Number", type: 'text', disabled: false },

          // Add more fields as necessary
        ]}
        onSave={saveCustomer}
        onDelete={deleteCustomer}
      />

    </>
  );
};

export default CustomerInfo;
