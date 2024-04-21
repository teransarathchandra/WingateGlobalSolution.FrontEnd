import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "@app_components/shared/ReusableTable";
import { getAllUser, updateUser, deleteUser, getUserOrders } from "@app_services/userService";
import IUser from "@app_interfaces/IUser";
import EditDialog from "@app_components/dialog/EditDialog";
import UserDetailsDialog from "../userDialog/UserDetailsDialog";
import UserReportDialog from "../userDialog/UserReportDialog";
import { UpdateBtn } from "@app_styles/bulkDetails.styles";


const columns: IColumn[] = [
  { id: "userId", label: "User ID", numeric: false, disablePadding: true },
  { id: "firstName", label: "First Name", numeric: false, disablePadding: false },
  { id: "lastName", label: "Last Name", numeric: false, disablePadding: false },
  { id: "email", label: "E-mail", numeric: false, disablePadding: false },
  { id: "phoneNumber", label: "Phone Number", numeric: true, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<IRow[]>([]);
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  //Edit User
  const handleEditClick = (user: IUser) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const [searchTerm, setSearchTerm] = useState("")

  // Add state for managing UserDetailsDialog visibility and the selected user
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  //Report
  const [isUserReportDialogOpen, setIsUserReportDialogOpen] = useState(false);


  // handleUserClick to fetch orders for the selected user
  const handleUserClick = async (user) => {
    setSelectedUser(user); // Set the selected user for display
    setIsUserDetailsDialogOpen(true); // Open the UserDetailsDialog
    try {
      const { data } = await getUserOrders(user._id);
      setSelectedUserOrders(data); // Save fetched orders to state
    } catch (error) {
      console.error('Error fetching orders for user:', error);
      // Optionally, handle the error (e.g., display an error message)
      // setFetchError('Failed to fetch orders. Please try again.'); // Set an error message to display
    }
  };


  const handleUserReportClick = () => {
    setIsUserReportDialogOpen(true);
  }


  const fetchAndPrepareUser = async () => {
    try {
      const response = await getAllUser();
      const preparedUser: IRow[] = response.data.map((user: IUser) => ({
        ...user,
        userId: (
          <span
            style={{ cursor: "pointer", textDecoration: "none", color: "#007bff" }}
            onClick={() => handleUserClick(user)}
          >
            {user.userId}
          </span>
        ),
        firstName: user.name.firstName, // Correct mapping for firstName
        lastName: user.name.lastName, // Correct mapping for lastName
        phoneNumber: user.contactNumber, // Correct mapping for contactNumber to phoneNumber
        edit: <button onClick={() => handleEditClick(user)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} /></button>,
        delete: <button onClick={() => handleDeleteUser(user)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
      setUser(preparedUser);
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareUser();
  }, []);

  const saveUser = async (userData) => {
    console.log('Saving user:', userData);
    setIsDialogOpen(false);
    try {
      // Assuming your currentuser state has the user's ID
      // And that userData contains the updated user fields
      const userId = currentUser?._id;
      if (userId) {

        const userUpdateData = {
          name: {
            firstName: userData.name.firstName,
            lastName: userData.name.lastName,
          },
          email: userData.email,
          contactNumber: userData.contactNumber,
        };

        await updateUser(userId, userUpdateData); // Call to your userService
        console.log('User updated successfully');

        // Optionally, refresh the users list to show the updated data
        fetchAndPrepareUser();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error('Failed to update user', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleDeleteUser = async (userToDelete) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Do you want to delete this user permanently?");
    if (!isConfirmed) {
      return; // Stop if the user cancels
    }

    try {
      await deleteUser(userToDelete._id);
      console.log(`User Deleted Successfully, user ID: ${userToDelete._id}`);
      const updatedUsers = user.filter(u => u.userId !== userToDelete._id);
      setUser(updatedUsers);
    } catch (error) {
      console.error('Failed to delete user', error);
      // Optionally, show an error message to the user
    }
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={user}
        title="User Profile Management"
        rowKey="userID"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />

      <UserDetailsDialog
        isOpen={isUserDetailsDialogOpen}
        user={selectedUser}
        orders={selectedUserOrders} // Pass the orders state
        handleClose={() => setIsUserDetailsDialogOpen(false)}
      />

      <UserReportDialog
        isOpen={isUserReportDialogOpen}
        handleClose={() => setIsUserReportDialogOpen(false)}
      />

      <UpdateBtn onClick={() => handleUserReportClick()}>Report</UpdateBtn>

      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentUser}
        fields={[
          { name: "userId", label: "User ID", type: 'text', disabled: true },
          { name: "name.firstName", label: "First Name", type: 'text', disabled: false },
          { name: "name.lastName", label: "Last Name", type: 'text', disabled: false },
          { name: "email", label: "Email", type: 'text', disabled: false },
          { name: "contactNumber", label: "Phone Number", type: 'text', disabled: false },

          // Add more fields as necessary
        ]}
        onSave={saveUser}
        onDelete={deleteUser}
      />


    </>
  );
};

export default UserInfo;
