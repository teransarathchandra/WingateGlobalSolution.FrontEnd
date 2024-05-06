import ReusableTable from "@app_components/shared/ReusableTable";
import { IOrder } from "@app_interfaces/IOrder";
import { IColumn, IRow } from "@app_interfaces/ITable";
import { getAllOrderInfo } from "@app_services/orderService";
import { ButtonContainer, UpdateBtn } from "@app_styles/bulkDetails.styles";
//import { pdfDownloadButton} from "@app_components/shared/PDFDownloadButton"
import { useEffect, useState } from "react";
import BulkReportDialog from "./dialog/bulkReportDialog";



const Order: React.FC = () => {

    const columns: IColumn[] = [
    { id: "orderId", label: "Order ID", numeric: false, disablePadding: false },
    { id: "packageCount", label: "Package Count", numeric: false, disablePadding: false },
    //{ id: "packageId", label: "Package Type", numeric: false, disablePadding: false },
    { id: "bulkId", label: "Bulk ID", numeric: false, disablePadding: false },];

    const [orders, setOrders] = useState<IRow[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isUserReportDialogOpen, setIsUserReportDialogOpen] = useState(false);

    const handleUserReportClick = () => {
      setIsUserReportDialogOpen(true);
    };

    const fetchAndPrepareOrders = async () => {
      try {
        const aggType = 'orderInfoIds';
        const response = await getAllOrderInfo(aggType);
        console.log("response", response);
        const preparedOrders: IRow[] = response.data.map((order: IOrder) => ({
          ...order,
          _id: order._id,
        }));
        setOrders(preparedOrders);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };
    useEffect(() => {
      fetchAndPrepareOrders();
    }, []);

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };

    return (
      <>
       <ReusableTable
        columns={columns}
        rows={orders}
        title="Order Details"
        rowKey="orderId"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <BulkReportDialog
        isOpen={isUserReportDialogOpen}
        handleClose={() => setIsUserReportDialogOpen(false)}
      />
      <ButtonContainer>
      <UpdateBtn onClick={handleUserReportClick}>Get Report</UpdateBtn>
      </ButtonContainer>
      
      </>
       
    );
};

export default Order;