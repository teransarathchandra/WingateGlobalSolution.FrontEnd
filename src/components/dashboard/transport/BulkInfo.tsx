import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { getAllBulks } from "../../../services/bulkService";
import { IBulk } from "../../../interfaces/IBulk";

const columns: IColumn[] = [
    { id: "bulkId", label: "Bulk ID", numeric: false, disablePadding: true },
    { id: "currentLocation", label: "Current Location", numeric: false, disablePadding: false },
    { id: "arrivedTime", label: "Arrived Time", numeric: false, disablePadding: false },
    { id: "status", label: "Status", numeric: false, disablePadding: false },
  ];
  
  const BulkInfo: React.FC = () => {
    const [bulks, setBulks] = useState<IRow[]>([]);
  
    useEffect(() => {
      const fetchAndPrepareBulks = async () => {
        try {
          const response = await getAllBulks();
          const preparedBulks: IRow[] = response.data.data.map((bulk: IBulk) => ({
            ...bulk,
            edit: <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#048b04" }} />,
            delete: <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#c80909" }} />,
          }));
          setBulks(preparedBulks);
        } catch (error) {
          console.error('Failed to fetch bulks', error);
        }
      };
  
      fetchAndPrepareBulks();
  
    }, []);

    return (
        <>
          <ReusableTable
            columns={columns}
            rows={bulks}
            title="Transport Management"
            rowKey="bulkId"
          />
        </>
      );
    };
    
    export default BulkInfo;