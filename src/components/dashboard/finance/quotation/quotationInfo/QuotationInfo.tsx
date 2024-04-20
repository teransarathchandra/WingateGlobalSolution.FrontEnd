import { IQuotation } from "@app_interfaces/IQuotation";
import { IColumn, IRow } from "@app_interfaces/ITable";
import { getAllQuotations, updateQuotation } from "@app_services/quotationService";
import { useEffect, useState } from "react";
import EditDialog from "../../../../dialog/EditDialog";
import ReusableTable from "../../../../shared/ReusableTable";

const columns: IColumn[] = [
  { id: "quotationId", label: "Quotation ID", numeric: false, disablePadding: true },
  { id: "packagingCost", label: "Packaging Cost", numeric: true, disablePadding: false },
  { id: "routeCost", label: "Route Cost", numeric: true, disablePadding: false },
  { id: "unitWeightCost", label: "Unit Weight Cost", numeric: true, disablePadding: false },
  { id: "pickupCost", label: "Pickup Cost", numeric: true, disablePadding: false },
  { id: "surcharge", label: "Surcharge", numeric: true, disablePadding: false },
  { id: "view", label: "View", numeric: false, disablePadding: false },
];

const QuotationInfo: React.FC = () => {
  const [quotations, setQuotations] = useState<IRow[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentQuotation, setCurrentQuotation] = useState<IQuotation | null>(null);

  const handleViewClick = (quotation: IQuotation) => {
    setCurrentQuotation(quotation);
    setIsDialogOpen(true);
  };

  const fetchAndPrepareQuotations = async () => {
    try {
      const response = await getAllQuotations();
      const preparedQuotations: IRow[] = response.data.map((quotation: IQuotation) => ({
        ...quotation,
        view: <button onClick={() => handleViewClick(quotation)} style={{ cursor: "pointer",backgroundColor: "#e1bd05", color: "#ffffff", border: "2px solid #e1bd05", borderRadius: "10px" }}>See More</button>,
      }));
      setQuotations(preparedQuotations);
    } catch (error) {
      console.error('Failed to fetch quotations', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareQuotations();
  }, []);

  const saveQuotation = async (quotationData) => {
    console.log('Saving quotation:', quotationData);
    setIsDialogOpen(false);
    try {
      // Assuming your currentQuotation state has the quotation's ID
      // And that quotationData contains the updated quotation fields
      const quotationId = currentQuotation?._id;
      if (quotationId) {
        await updateQuotation(quotationId, { status: quotationData.status }); // Call to your quotationService
        console.log('Quotation updated successfully');

        // Optionally, refresh the orders list to show the updated data
        fetchAndPrepareQuotations();
      }
      setIsDialogOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error('Failed to update quotation', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const deleteQuotation = (quotation) => {
    console.log('Deleting quotation:', quotation);
    setIsDialogOpen(false);
    // Implement actual delete logic here
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={quotations}
        title="Quotation Details"
        rowKey="quotationID"
      />

      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentQuotation}
        fields={[
          { name: 'quotationId', label: 'Quotation ID', type: 'string', disabled: true },
          { name: 'packagingCost', label: 'Packaging Cost', type: 'number', disabled: true },
          { name: 'routeCost', label: 'Route Cost', type: 'number', disabled: true },
          { name: 'unitWeightCost', label: 'Unit Weight Cost', type: 'number', disabled: true },
          { name: 'pickupCost', label: 'Pickup Cost', type: 'number', disabled: true },
          { name: 'surcharge', label: 'Surcharge', type: 'number', disabled: true },
          { name: 'totalAmount', label: 'Total Amount is', type: 'text', disabled: true },
        ]}
        onSave={saveQuotation}
        onDelete={deleteQuotation}
      />
    </>
  );
};

export default QuotationInfo;
