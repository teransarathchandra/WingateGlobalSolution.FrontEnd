import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IColumn, IRow } from "../../../interfaces/ITable";
import ReusableTable from "../../shared/ReusableTable";
import { getAllStocks, updateStock } from "../../../services/stockService";
import { IStock } from "../../../interfaces/IStock";
import EditDropdown from "../../dialog/EditDropdown";


const columns: IColumn[] = [
  { id: "orderId", label: "Order ID", numeric: false, disablePadding: true },
  { id: "driverId", label: "Driver ID", numeric: false, disablePadding: false },
  { id: "pickupDate", label: "Pickup Date", numeric: false, disablePadding: false },
];


const StockInfo: React.FC = () => {
  const [stocks, setStocks] = useState<IRow[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState<IStock | null>(null);

  const handleEditClick = (stock: IStock) => {
    console.log("Stock" , stock);
    setCurrentStock(stock);
    setIsDialogOpen(true);
  };

  const fetchAndPrepareStocks = async () => {
    try {
      const aggType = 'stockIds';
      const response = await getAllStocks(aggType);
      console.log("response", response);
      const preparedStocks: IRow[] = response.data.data.map((stock: IStock) => ({
        ...stock,
        _id: stock._id,
        edit: <button onClick={() => handleEditClick(stock)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "#23a840" }} /></button>,
        delete: <button onClick={() => deleteStock(stock)} style={{ all: 'unset' }}><FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "#dd0426" }} /></button>,
      }));
       console.log('Current Stock:', currentStock);
      setStocks(preparedStocks);
    } catch (error) {
      console.error('Failed to fetch stocks', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareStocks();
  }, []);

  const saveStock = async (stockData) => {
    console.log('Saving stock:', stockData);

    setIsDialogOpen(false);

    try {
      console.log('Saving');
      const stockId = currentStock?._id;
      console.log('Stock ID:', currentStock);
      if (stockId) {
        await updateStock(stockId, stockData);
        console.log(stockData)
        console.log('Stock updated successfully');
        

        fetchAndPrepareStocks();
      }
      setIsDialogOpen(false);

    } catch (error) {
      console.error('Failed to update stock', error);

    }
  };
  const deleteStock = (stock) => {
    console.log('Deleting stock:', stock);
    setIsDialogOpen(false);

  };

  const dropdownOptions = [
    { label: "UL101", value: "6608e3cd3f01685b847abe04" },
    { label: "UL107", value: "66094259a85978a562cc526b" },
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={stocks}
        title="Stock Details"
        rowKey="stockId"
      />
      <EditDropdown
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        entity={currentStock}
        fields={[
          { name: 'stockId', label: 'Stock ID', type: 'text', disabled: true },
          { name: "driverIe", label: "Driver ID", type: 'text', disabled: false },
          { name: "pickupDate", label: "Pickup Date", type: 'dropdown', options: dropdownOptions },
        ]}
        onSave={saveStock}
        onDelete={deleteStock}
      />
    </>
  );
};

export default StockInfo;
