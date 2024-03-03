import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../../interfaces/ITable";
import ReusableTable from "../../../shared/ReusableTable";
import { getAllUser } from "../../../../services/userService";
import { IUser } from "../../../../interfaces/IUser";

const columns: IColumn[] = [
  { id: "userId", label: "User ID", numeric: false, disablePadding: true },
  { id: "firstName", label: "First Name", numeric: false, disablePadding: false },
  { id: "lastName", label: "Last Name", numeric: false, disablePadding: false },
  { id: "role", label: "Role", numeric: false, disablePadding: false },
  { id: "phoneNumber", label: "Phone Number", numeric: true, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<IRow[]>([]);

  useEffect(() => {
    const fetchAndPrepareUser = async () => {
      try {
        const response = await getAllUser();
        const preparedUser: IRow[] = response.data.data.map((user: IUser) => ({
          ...user,
          edit: <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#048b04" }} />,
          delete: <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#c80909" }} />,
        }));
        setUser(preparedUser);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchAndPrepareUser();

  }, []);

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={user}
        title="User Profile Management"
        rowKey="userID"
      />
    </>
  );
};

export default UserInfo;
