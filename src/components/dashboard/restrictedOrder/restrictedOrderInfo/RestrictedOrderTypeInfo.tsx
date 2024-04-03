import { useEffect, useState } from "react";
import { IColumn, IRow } from "../../../../interfaces/ITable";
import ReusableTable from "../../../shared/ReusableTable";
import { getAllRestrictedOrders } from "../../../../services/restrictedOrderService";
import { IRestrictedOrder } from "../../../../interfaces/IRestrictedOrder";
import FullScreenDialog from "../dialogs.tsx/RestrictedOrderTypeDetailsInfo";

const columns: IColumn[] = [
  { id: "restrictedOrderId", label: "Restricted ID", numeric: false, disablePadding: true },
  { id: "sendingCountryId", label: "Sender Country", numeric: false, disablePadding: false },
  { id: "receivingCountryId", label: "Receiver Country", numeric: false, disablePadding: false },
  { id: "categoryId", label: "Category", numeric: false, disablePadding: false },
  { id: "viewMore", label: "View", numeric: false, disablePadding: false },
];

const restrictedOrderTypeInfo: React.FC = () => {
  
  const [restrictedOrderTypes, setRestrictedOrderTypes] = useState<IRow[]>([]);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [currentResOrder, setCurrentResOrder] = useState<IRestrictedOrder | null>(null);

  const handleViewClick = (restrictedOrder: IRestrictedOrder) => {
    setIsViewDetailsOpen(true);
    setCurrentResOrder(restrictedOrder);
  };

  const fetchAndPrepareResOrders = async () => {
    try {
      const aggType = 'restrictedOrderTypes';
      const response = await getAllRestrictedOrders(aggType);
      const preparedResOrderTypes: IRow[] = response.data.data.map((restrictedOrder: IRestrictedOrder) => ({
        ...restrictedOrder,
        viewMore: <button onClick={() => handleViewClick(restrictedOrder)} style={{ cursor: "pointer", color: "#000000" }}>View</button>,
      }));
      setRestrictedOrderTypes(preparedResOrderTypes);
    } catch (error) {
      console.error('Failed to fetch order types', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareResOrders();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <button>Add</button>
      </div>
      <ReusableTable
        columns={columns}
        rows={restrictedOrderTypes}
        title="Restricted Order Types"
        rowKey="restrictedOrderId"
      />

      <FullScreenDialog
        isOpen={isViewDetailsOpen}
        handleClose={() => setIsViewDetailsOpen(false)}
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
    </>
  );
};

export default restrictedOrderTypeInfo;
