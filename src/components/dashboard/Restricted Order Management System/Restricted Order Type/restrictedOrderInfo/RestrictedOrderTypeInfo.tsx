import { useEffect, useState } from "react";
import { IColumn, IRow } from "../../../../../interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import { getAllRestrictedOrders, createRestrictedOrder } from "../../../../../services/restrictedOrderService";
import { IRestrictedOrder } from "../../../../../interfaces/IRestrictedOrder";
import FullScreenDialog from "../dialogs/RestrictedOrderTypeDetailsInfo";
import AddRestrictedOrderForm from '../dialogs/RestrictedOrderTypeAddDialog';
import {ViewButton} from "@app_styles/RestrictedOrderStyles.styles"
import RestrictedOrderReport from "@app_components/pdf/pdfTemplates/RestrictedOrderTypeReport";
import ReactDOMServer from "react-dom/server";
import PDFLayout from "@app_components/pdf/PDFLayout";
import { Button } from "@mui/material";
import PDFExportDialog from "@app_components/pdf/PDFPreviewDialog";


const columns: IColumn[] = [
  { id: "restrictedOrderId", label: "Restricted ID", numeric: false, disablePadding: true },
  { id: "sendingCountryId", label: "Sender Country", numeric: false, disablePadding: false },
  { id: "receivingCountryId", label: "Receiver Country", numeric: false, disablePadding: false },
  { id: "categoryId", label: "Category", numeric: false, disablePadding: false },
  { id: "viewMore", label: "View", numeric: false, disablePadding: false },
  { id: "maxQuantity", label: "maxQuantity", numeric: true, disablePadding: false },

];

const RestrictedOrderTypeInfo: React.FC = () => {

  const [restrictedOrderTypes, setRestrictedOrderTypes] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [currentResOrder, setCurrentResOrder] = useState<IRestrictedOrder | null>(null);
  const [showPDFDialog, setShowPDFDialog] = useState(false);
  const [pdfHtmlContent, setPdfHtmlContent] = useState('');

  const handleViewClick = (restrictedOrder: IRestrictedOrder) => {
    setIsViewDetailsOpen(true);
    setCurrentResOrder(restrictedOrder);
  };
  const handleAddClick = () => {
    setIsAddOrderOpen(true);
  };
  const handleClose = () => {
    setIsAddOrderOpen(false);
    setIsViewDetailsOpen(false);
    fetchAndPrepareResOrders();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  // const handleSearch = (searchTerm) => {
  //   SearchRestrictedOrder(searchTerm);
  // };
  // const SearchRestrictedOrder = async (searchTerm: string) => {
  //   try {
  //     const aggType = 'restrictedOrderTypes';
  //     const response = await getAllRestrictedOrders(aggType);
  //     console.log(response);
  
  //     const searchLower = searchTerm.toLowerCase();
  //     const filteredResOrderTypes: IRow[] = response.data.data.filter((restrictedOrder: IRestrictedOrder) => {
  //       return Object.values(restrictedOrder).some(value => 
  //         String(value).toLowerCase().includes(searchLower)
  //       );
  //     }).map((restrictedOrder: IRestrictedOrder) => ({
  //       ...restrictedOrder,
  //       viewMore: <ViewButton onClick={() => handleViewClick(restrictedOrder)} style={{ cursor: "pointer", color: "#000000" }}>View</ViewButton>
  //     }));
      
  //     setRestrictedOrderTypes(filteredResOrderTypes);
      
  //   } catch (error) {
  //     console.error('Failed to fetch order types', error);
  //   }
  // };
  

  const fetchAndPrepareResOrders = async () => {
    try {
      const aggType = 'restrictedOrderTypes';
      const response = await getAllRestrictedOrders(aggType);
      console.log(response)
      const preparedResOrderTypes: IRow[] = response.data.data.map((restrictedOrder: IRestrictedOrder) => ({
        ...restrictedOrder,
        viewMore: <ViewButton onClick={() => handleViewClick(restrictedOrder)} style={{ cursor: "pointer", color: "#000000" }}>View</ViewButton>,
      }));
      setRestrictedOrderTypes(preparedResOrderTypes);
    } catch (error) {
      console.error('Failed to fetch order types', error);
    }
  };
  const handleAddRestrictedOrderType = async (restrictedOrder: IRestrictedOrder) => {
    try {
       createRestrictedOrder(restrictedOrder);
       fetchAndPrepareResOrders();
    
    } catch (error) {
      console.error('Failed to fetch order types', error);
    }
  };



  useEffect(() => {
    fetchAndPrepareResOrders();
  }, []);

  useEffect(() => {
    if (restrictedOrderTypes.length > 0) {
        const htmlContent = ReactDOMServer.renderToString(
            <PDFLayout content={<RestrictedOrderReport restrictedOrders={restrictedOrderTypes} />} />
        );
        setPdfHtmlContent(htmlContent);
  }
}, [restrictedOrderTypes]);

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={restrictedOrderTypes}
        title="Restricted Order Types"
        rowKey="restrictedOrderId"
        onAdd={handleAddClick}
        showAddButton={true}
        // showSearchBar={true}
        // label="Search"
        // onSearch={handleSearch}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <AddRestrictedOrderForm
        onAdd={handleAddRestrictedOrderType}
        isOpen={isAddOrderOpen}
        handleClose={handleClose}
      />

      <FullScreenDialog
        isOpen={isViewDetailsOpen}
        handleViewClose={handleClose}
        onSave ={handleViewClick}
        entity={currentResOrder}
        fields={[
          { name: "_id", label: "MongoDBId", type: String, disabled: true },
          { name: "restrictedOrderId", label: "Restricted ID", type: String, disabled: true },
          { name: "sendingCountryId", label: "Sender Country", type: String, disabled: false },
          { name: "receivingCountryId", label: "Receiver Country", type: String, disabled: false },
          { name: "categoryId", label: "Category", type: String, disabled: false },
          { name: "maxQuantity", label: "Maximum Weight", type: Number, disabled: false },
          { name: "exportLicense", label: "Export License", type: Boolean, disabled: false },
          { name: "importPermit", label: "Import Permit", type: Boolean, disabled: false },
          { name: "safetyDataSheets", label: "Safety Data Sheets", type: Boolean, disabled: false },
          { name: "phytosanitaryCertificate", label: "Phytosanitary Certificate", type: Boolean, disabled: false },
          { name: "dangerousGoodsDeclaration", label: "Dangerous Goods Declaration", type: Boolean, disabled: false },
        ]}
      />
      <Button onClick={() => setShowPDFDialog(true)} style={
          {
            backgroundColor: "#e1bd05",
            position: "fixed",
            marginTop: "40px",
            color:"#fff ",
            padding: "5px",
            borderRadius:"10px",
            cursor: "pointer",
            border: "2px solid #e1bd05",
            bottom: "20px",
            right: "40px",

            }}>
                    Export PDF
                </Button>
            
            {showPDFDialog && (
                <PDFExportDialog
                    open={showPDFDialog}
                    onClose={() => setShowPDFDialog(false)}
                    htmlContent={pdfHtmlContent}
                    filename="RestictedOrderTypesReport.pdf"
                />
            )}
    </>
  );
};

export default RestrictedOrderTypeInfo;
