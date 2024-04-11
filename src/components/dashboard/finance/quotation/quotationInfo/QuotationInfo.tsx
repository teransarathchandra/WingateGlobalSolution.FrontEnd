import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import { getAllQuotations, updateQuotation } from "@app_services/quotationService";
import { IQuotation } from "@app_interfaces/IQuotation";
import EditDialog from "../../../../dialog/EditDialog";

const columns: IColumn[] = [
  { id: "quotationId", label: "Quotation ID", numeric: false, disablePadding: true },
  { id: "packagingCost", label: "Packaging Cost", numeric: true, disablePadding: false },
  { id: "routeCost", label: "Route Cost", numeric: true, disablePadding: false },
  { id: "unitWeightCost", label: "Unit Weight Cost", numeric: true, disablePadding: false },
  { id: "pickUpCost", label: "PickUp Cost", numeric: true, disablePadding: false },
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
        view: <button onClick={() => handleViewClick(quotation)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#0c1821" }} /></button>,
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
          { name: 'quotationId', label: 'quotationId', type: 'text', disabled: false },
          { name: 'packagingCost', label: 'packagingCost', type: 'text', disabled: false },
          { name: 'routeCost', label: 'routeCost', type: 'date', disabled: false },
          { name: 'unitWeightCost', label: 'unitWeightCost', type: 'text', disabled: false },
          { name: 'pickUpCost', label: 'pickUpCost', type: 'number', disabled: false },
          { name: 'surcharge', label: 'surcharge', type: 'text', disabled: false },
        ]}
        onSave={saveQuotation}
        onDelete={deleteQuotation}
      />
    </>
  );
};

export default QuotationInfo;
