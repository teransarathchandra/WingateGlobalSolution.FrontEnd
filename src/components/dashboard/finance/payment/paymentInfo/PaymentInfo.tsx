import { useEffect, useState } from "react";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import { getAllPayments } from "@app_services/paymentService";
import { IPayment } from "@app_interfaces/IPayment";

const columns: IColumn[] = [
  { id: "paymentId", label: "Payment ID", numeric: false, disablePadding: false },
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: false },
  { id: "amount", label: "Amount", numeric: false, disablePadding: false },
  { id: "paymentMethod", label: "Payment Method", numeric: false, disablePadding: false },
  { id: "paymentStatus", label: "Payment Status", numeric: false, disablePadding: false },
  { id: "createdAt", label: "Payment Date", numeric: false, disablePadding: false },
];

const PaymentInfo: React.FC = () => {
  const [payments, setPayments] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchAndPreparePayments = async () => {
    try {
      const aggType = 'paymentIds';
      const { data } = await getAllPayments(aggType);
      const preparedPayments: IRow[] = data.map((payment: IPayment) => ({
        ...payment,
      }));
      setPayments(preparedPayments);
      
      console.log(preparedPayments)

    } catch (error) {
      console.error('Failed to fetch payment', error);
    }
    
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
      
    </>
  );
};

export default PaymentInfo;
