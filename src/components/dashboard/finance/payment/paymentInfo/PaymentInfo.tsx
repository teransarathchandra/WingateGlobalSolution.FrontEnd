import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import { getAllPayments, updatePayment } from "@app_services/paymentService";
import { IPayment } from "@app_interfaces/IPayment";
import EditDialog from "../../../../dialog/EditDialog";

const columns: IColumn[] = [
  { id: "paymentId", label: "Payment ID", numeric: false, disablePadding: true },
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: true },
  { id: "amount", label: "Amount", numeric: true, disablePadding: false },
  { id: "paymentMethod", label: "Payment Method", numeric: false, disablePadding: false },
  { id: "paymentstatus", label: "Payment Status", numeric: false, disablePadding: false },
  { id: "createdAt", label: "Payment Date", numeric: false, disablePadding: false },
];

const PaymentInfo: React.FC = () => {
  const [payments, setPayments] = useState<IRow[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<IPayment | null>(null);

  const handleEditClick = (payment: IPayment) => {
    setCurrentPayment(payment);
    setIsDialogOpen(true);
  };

  const fetchAndPreparePayments = async () => {
    try {
      const response = await getAllPayments();
      const preparedPayments: IRow[] = response.data.map((payment: IPayment) => ({
        ...payment,
        edit: <button onClick={() => handleEditClick(payment)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} /></button>,
        delete: <button onClick={() => deletePayment(payment)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
      setPayments(preparedPayments);
    } catch (error) {
      console.error('Failed to fetch payment', error);
    }
  };

  useEffect(() => {
    fetchAndPreparePayments();
  }, []);

  const savePayment = async (paymentData) => {
    console.log('Saving payment', paymentData);
    setIsDialogOpen(false);
    try {
      // Assuming your currentOrder state has the order's ID
      // And that orderData contains the updated order fields
      const paymentId = currentPayment?._id;
      if (paymentId) {
        await updatePayment(paymentId, { status: paymentData.status }); // Call to your orderService
        console.log('Payment updated successfully');

        // Optionally, refresh the payments list to show the updated data
        fetchAndPreparePayments();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error('Failed to update payment', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const deletePayment = (payment) => {
    console.log('Deleting payment:', payment);
    setIsDialogOpen(false);
    // Implement actual delete logic here
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={payments}
        title="Payment Details"
        rowKey="paymentID"
      />
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentPayment}
        fields={[
          { name: 'orderId', label: 'Order ID', type: 'text', disabled: false },
          { name: 'userId', label: 'User ID', type: 'text', disabled: false },
          { name: 'createdAt', label: 'Created At', type: 'date', disabled: false },
          { name: 'description', label: 'Description', type: 'text', disabled: false },
          { name: 'amount', label: 'Amount', type: 'number', disabled: false },
          { name: 'status', label: 'Status', type: 'text', disabled: false },
        ]}
        onSave={savePayment}
        onDelete={deletePayment}
      />
    </>
  );
};

export default PaymentInfo;
