import { useEffect, useState } from "react";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import { getAllOrders, updateOrder} from "@app_services/orderService";
import { IResOrder } from "@app_interfaces/IOrder";
import { ViewButton } from "@app_styles/RestrictedOrderStyles.styles";
import RestrictedOrderViewDialog from "../dialogs/RestrictedOrderViewDialog";
//import { IOrder } from "@app_interfaces/IOrder";

const columns: IColumn[] = [
  //{ id: "_id", label: "ID", numeric: false, disablePadding: true },
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: true },
  { id: "sendingCountry", label: "From", numeric: false, disablePadding: false },
  { id: "receivingCountry", label: "To", numeric: false, disablePadding: false },
  { id: "categoryName", label: "Category", numeric: false, disablePadding: false },
  { id: "userId", label: "user ID", numeric: false, disablePadding: false },
  { id: "status", label: "Status", numeric: false, disablePadding: false },
  { id: "viewMore", label: "View", numeric: false, disablePadding: false },
];

const OrderInfo: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<IRow[]>([]);
  const [isViewDialogOpen, setIsViewDetailsOpen] = useState(false);
  const [currentResOrder, setCurrentResOrder] = useState<IResOrder>();

  useEffect(() => {
    fetchAndPrepareOrders();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewClick = (resOrder: IResOrder) => {
    setIsViewDetailsOpen(true);
    console.log("resOrder when view click ", resOrder);
    setCurrentResOrder(resOrder);
  };
  const handleClose = () => {
    setIsViewDetailsOpen(false);
    fetchAndPrepareOrders();
  };

  const fetchAndPrepareOrders = async () => {
    debugger;
    try {
      const aggType = "restrictedOrders";
      const response = await getAllOrders(aggType);
      //console.error('response', response);
      const preparedOrders: IRow[] = response.data.map((resOrder: IResOrder) => ({
        ...resOrder,
        viewMore: <ViewButton onClick={() => handleViewClick(resOrder)} style={{ cursor: "pointer", color: "#000000" }}>View</ViewButton>,
      }));
      setOrders(preparedOrders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const handleApproveAndReject = async (id, isApproved) => {
    if (!id) {
      console.error('No ID available for updating the order');
      return;
    }
    if (isApproved == true) {
      updateOrder(id, { status: "Approved" });
    } else if (isApproved == false) {
      updateOrder(id, { status: "Rejected" });
    }
    handleClose;
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={orders}
        title="Restricted Orders"
        rowKey="orderID"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      {currentResOrder &&
        <RestrictedOrderViewDialog
          isViewClicked={isViewDialogOpen}
          handleViewClose={handleClose}
          onApprove={handleApproveAndReject}
          onReject={handleApproveAndReject}
          // onEmail={handleViewClick}
          // onReport={handleViewClick}
          currentResOrderId={currentResOrder._id}
          // fields={[
          //   { name: "_id", label: "MongoDBId", type: String, disabled: true },
          //   { name: "orderId", label: "Order ID", type: String, disabled: true },
          //   { name: "sendingCountry", label: "Sender Country", type: String, disabled: false },
          //   { name: "receivingCountryId", label: "Receiver Country", type: String, disabled: false },
          //   { name: "categoryName", label: "Category", type: String, disabled: false },
          //   { name: "userId", label: "user ID", type: Number, disabled: false },
          //   { name: "status", label: "Status", type: Boolean, disabled: false },
          // ]}
        />
      }
    </>
  );
};

export default OrderInfo;

{/* <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentOrder}
        fields={[
          { name: 'orderId', label: 'Order ID', type: 'text', disabled: false },
          { name: 'userId', label: 'User ID', type: 'text', disabled: false },
          { name: 'createdAt', label: 'Created At', type: 'date', disabled: false },
          { name: 'description', label: 'Description', type: 'text', disabled: false },
          { name: 'amount', label: 'Amount', type: 'number', disabled: false },
          { name: 'status', label: 'Status', type: 'text', disabled: false },
        ]}
        onSave={saveOrder}
        onDelete={deleteOrder}
      /> */}
{/* <DeleteDialog
        isOpen= {isDeleteDialogOpen}
        handleClose={() => setisDeleteDialogOpen(false)}        
        handleDelete={handleDeleteOrder}
      /> */}