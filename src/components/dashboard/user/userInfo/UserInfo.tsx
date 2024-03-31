import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../../interfaces/ITable";
import ReusableTable from "../../../shared/ReusableTable";
import { getAllUser, updateUser } from "../../../../services/userService";
import { IUser } from "../../../../interfaces/IUser";
import EditDialog from "../../../dialog/EditDialog";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const handleEditClick = (user: IUser) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };


  const fetchAndPrepareUser = async () => {
    try {
      const response = await getAllUser();
      const preparedUser: IRow[] = response.data.data.map((user: IUser) => ({
        ...user,
        // userId: user._id, // Make sure the userID is correctly mapped
        firstName: user.name.firstName, // Correct mapping for firstName
        lastName: user.name.lastName, // Correct mapping for lastName
        phoneNumber: user.contactNumber, // Correct mapping for contactNumber to phoneNumber
        edit: <button onClick={() => handleEditClick(user)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} /></button>,
        delete: <button onClick={() => deleteUser(user)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
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

        // Prepare the user update object based on the expected backend structure
        const userUpdateData = {
          name: {
            firstName: userData['name.firstName'],
            lastName: userData['name.lastName'],
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

  const deleteUser = (user) => {
    console.log('Deleting user:', user);
    setIsDialogOpen(false);
    // Implement actual delete logic here
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={user}
        title="User Profile Management"
        rowKey="userID"
      />

      {console.log(currentUser)}

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
