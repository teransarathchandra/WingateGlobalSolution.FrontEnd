import { IQuotation } from "@app_interfaces/IQuotation";
import { IColumn, IRow } from "@app_interfaces/ITable";
import {createQuotation, getAllQuotations, deleteQuotation, updateQuotation } from "@app_services/quotationService";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddDialog from "@app_components/dialog/AddDialog";
import EditDialog from "../../../../dialog/EditDialog";
import DeleteDialog from "@app_components/dialog/DeleteDialog";
import ReusableTable from "../../../../shared/ReusableTable";
import Button from "@mui/material/Button";
import PDFExportDialog from "@app_components/pdf/PDFPreviewDialog";
import PDFLayout from "@app_components/pdf/PDFLayout";
import QuotationReport from "@app_components/pdf/pdfTemplates/QuotationReport";
import ReactDOMServer from "react-dom/server";
import { UpdateBtn } from "@app_styles/bulkDetails.styles";

const columns: IColumn[] = [
  { id: "quotationId", label: "Quotation ID", numeric: false, disablePadding: true },
  { id: "packagingCost", label: "Packaging Cost", numeric: true, disablePadding: false },
  { id: "routeCost", label: "Route Cost", numeric: true, disablePadding: false },
  { id: "unitWeightCost", label: "Unit Weight Cost", numeric: true, disablePadding: false },
  { id: "pickUpCost", label: "Pickup Cost", numeric: true, disablePadding: false },
  { id: "surcharge", label: "Surcharge", numeric: true, disablePadding: false },
  { id: "view", label: "View", numeric: false, disablePadding: false },
  { id: "edit", label: "Edit", numeric: false, disablePadding: false },
  { id: "delete", label: "Delete", numeric: false, disablePadding: false },
];

const QuotationInfo: React.FC = () => {
  const [quotations, setQuotations] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentQuotation, setCurrentQuotation] = useState<IQuotation | null>(null);
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);
  const [isAddQuotationOpen, setIsAddQuotationOpen] = useState(false);

  const handleViewClick = (quotation: IQuotation) => {
    setCurrentQuotation(quotation);
    setIsViewOpen(true);
  };

  const handleAddClick = () => {
    setIsAddQuotationOpen(true);
  };

  const handleEditClick = (quotation: IQuotation) => {
    console.log("Quotation" , quotation);
    setCurrentQuotation(quotation);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (quotation: IQuotation) => {
    console.log("Quotation" , quotation);
    setCurrentQuotation(quotation);
    setisDeleteDialogOpen(true);
  };

  const fetchAndPrepareQuotations = async () => {
    try {
      const response = await getAllQuotations();
      const preparedQuotations: IRow[] = response.data.map((quotation: IQuotation) => ({
        ...quotation,
        view: <button onClick={() => handleViewClick(quotation)} style={{ cursor: "pointer",backgroundColor: "#e1bd05", color: "#ffffff", border: "2px solid #e1bd05", borderRadius: "10px" }}>View</button>,
        edit: <button onClick={() => handleEditClick(quotation)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} /></button>,
        delete: <button onClick={() => handleDeleteClick(quotation)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
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
      console.log('Saving');
      const quotationId = currentQuotation?._id;
      console.log('Quotation ID:', currentQuotation);
      if (quotationId) {
        await updateQuotation(quotationId, quotationData);
        console.log(quotationData)
        console.log('Quotation updated successfully');
        

        fetchAndPrepareQuotations();
      }
      setIsDialogOpen(false);

    } catch (error) {
      console.error('Failed to update quotation', error);

    }
  };

  const handleDeleteQuotation = async () => {
    if (currentQuotation) {
      try {
        await deleteQuotation(currentQuotation._id);
        setQuotations(quotations => quotations.filter(quotations => quotations._id !== currentQuotation._id));
        setisDeleteDialogOpen(false);
      } catch (error) {
        console.error('Failed to delete quotation', error);
      }
    }
  };

  const addQuotation = async (quotationData) => {
    try {
      await createQuotation(quotationData);
      fetchAndPrepareQuotations();
      setIsAddQuotationOpen(false);
      console.log('Quotation added successfully');
    } catch (error) {
      console.error('Failed to add Quotation', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const deleteQuotation = (quotation) => {
  //   console.log('Deleting quotation:', quotation);
  //   setIsDialogOpen(false);
  //   // Implement actual delete logic here
  // };

  const [showPDFDialog, setShowPDFDialog] = useState(false);
  const [pdfHtmlContent, setPdfHtmlContent] = useState('');

  useEffect(() => {
    if (quotations.length > 0) {
        const htmlContent = ReactDOMServer.renderToString(
            <PDFLayout content={<QuotationReport quotation={quotations} />} />
        );
        setPdfHtmlContent(htmlContent);
    }
}, [quotations]);

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={quotations}
        title="Quotation Details"
        rowKey="quotationID"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />

      <EditDialog
        isOpen={isViewOpen}
        handleClose={() => setIsViewOpen(false)}
        entity={currentQuotation}
        fields={[
          { name: 'quotationId', label: 'Quotation ID', type: 'string', disabled: true },
          { name: 'packagingCost', label: 'Packaging Cost', type: 'number', disabled: true },
          { name: 'routeCost', label: 'Route Cost', type: 'number', disabled: true },
          { name: 'unitWeightCost', label: 'Unit Weight Cost', type: 'number', disabled: true },
          { name: 'pickUpCost', label: 'Pickup Cost', type: 'number', disabled: true },
          { name: 'surcharge', label: 'Surcharge', type: 'number', disabled: true },
          
        ]}
        onSave={saveQuotation}
        onDelete={deleteQuotation}
      />
      
      <EditDialog
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentQuotation}
        fields={[
          { name: 'quotationId', label: 'Quotation ID', type: 'string', disabled: true },
          { name: 'packagingCost', label: 'Packaging Cost', type: 'number', disabled: false },
          { name: 'routeCost', label: 'Route Cost', type: 'number', disabled: false },
          { name: 'unitWeightCost', label: 'Unit Weight Cost', type: 'number', disabled: false },
          { name: 'pickUpCost', label: 'Pickup Cost', type: 'number', disabled: false },
          { name: 'surcharge', label: 'Surcharge', type: 'number', disabled: false },
          
        ]}
        onSave={saveQuotation}
        onDelete={deleteQuotation}
      />

<UpdateBtn onClick={handleAddClick}>Add Quotation</UpdateBtn>
      <AddDialog
        isOpen={isAddQuotationOpen}
        handleClose={() => setIsAddQuotationOpen(false)}
        entity={currentQuotation}
        fields={[
          //{ name: 'flightId', label: 'Flight No', type: 'text', disabled: false },
          { name: 'packagingCost', label: 'Packaging Cost', type: 'number', disabled: false },
          { name: 'routeCost', label: 'Route Cost', type: 'number', disabled: false },
          { name: 'unitWeightCost', label: 'Unit Weight Cost', type: 'number', disabled: false },
          { name: 'pickUpCost', label: 'Pickup Cost', type: 'number', disabled: false },
          { name: 'surcharge', label: 'Surcharge', type: 'number', disabled: false },
          
        ]}
        onSave={addQuotation}
      />

      <DeleteDialog
        isOpen= {isDeleteDialogOpen}
        handleClose={() => setisDeleteDialogOpen(false)}        
        handleDelete={handleDeleteQuotation}
      />
                  <Button onClick={() => setShowPDFDialog(true)} color="secondary">
                    Preview & Export PDF
                </Button>

                {showPDFDialog && (
                <PDFExportDialog
                    open={showPDFDialog}
                    onClose={() => setShowPDFDialog(false)}
                    htmlContent={pdfHtmlContent}
                    filename="QuotationReport.pdf"
                />
            )}
    </>
  );
};

export default QuotationInfo;
