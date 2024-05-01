import { useEffect, useState } from "react";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import { getAllPayments } from "@app_services/paymentService";
import EditDialog from "../../../../dialog/EditDialog";
import { IPayment } from "@app_interfaces/IPayment";

const columns: IColumn[] = [
  { id: "paymentId", label: "Payment ID", numeric: false, disablePadding: false },
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: false },
  { id: "paymentDate", label: "Payment Date", numeric: false, disablePadding: false },
  { id: "description", label: "Description", numeric: false, disablePadding: false },
  { id: "paymentStatus", label: "Payment Status", numeric: false, disablePadding: false },
  { id: "paymentMethod.method", label: "Payment Method", numeric: false, disablePadding: false },
  { id: "amount", label: "Amount", numeric: true, disablePadding: false },
  { id: "view", label: "View", numeric: false, disablePadding: false },
];

const PaymentInfo: React.FC = () => {
  const [payments, setPayments] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<IPayment | null>(null);

  const handleViewClick = (payment: IPayment) => {
    setCurrentPayment(payment);
    setIsViewOpen(true);
  };


  const fetchAndPreparePayments = async () => {
    try {
      const aggType = 'paymentIds';
      const { data } = await getAllPayments(aggType);
      const preparedPayments: IRow[] = data.map((payment: IPayment) => ({
        ...payment,
        view: <button onClick={() => handleViewClick(payment)} style={{ cursor: "pointer",backgroundColor: "#e1bd05", color: "#ffffff", border: "2px solid #e1bd05", borderRadius: "10px" }}>View</button>,
      }));
      setPayments(preparedPayments);
      
      console.log(preparedPayments)

    } catch (error) {
      console.error('Failed to fetch payment', error);
    }
    
  };

  const savePayment = async (PaymentData) => {
    console.log('Saving Payment:', PaymentData);
  };
    const deletePayment = async (PaymentData) => {
      console.log('deleting Payment:', PaymentData);
    };
    

  useEffect(() => {
    fetchAndPreparePayments();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  
  return (
    <>
      <ReusableTable
        columns={columns}
        rows={payments}
        title="Payment Details"
        rowKey="paymentID"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />

      <EditDialog
        isOpen={isViewOpen}
        handleClose={() => setIsViewOpen(false)}
        entity={currentPayment}
        fields={[
          { name: 'paymentId', label: 'Payment ID', type: 'string', disabled: true },
          { name: 'orderId', label: 'Order ID', type: 'number', disabled: true },
          { name: 'paymentDate', label: 'Payment Date', type: 'string', disabled: true },
          { name: 'description', label: 'Description', type: 'string', disabled: true },
          { name: 'paymentStatus', label: 'Payment Status', type: 'string', disabled: true },
          { name: 'currency', label: 'Currency', type: 'string', disabled: true },
          { name: 'amount', label: 'Amount', type: 'number', disabled: true },
          { name: 'paymentMethod.method', label: 'Payment Method', type: 'number', disabled: true },
          { name: 'paymentMethod.cardCustomerName', label: 'Customer Name', type: 'string', disabled: true },
          { name: 'paymentMethod.cardNo', label: 'Card No', type: 'number', disabled: true },
          
        ]}
        onSave={savePayment}
        onDelete={deletePayment}
        />
    </>
  );
};
  

export default PaymentInfo;
