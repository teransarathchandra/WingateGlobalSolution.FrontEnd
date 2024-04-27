import React, { useEffect, useState } from "react";
import { IColumn, IRow } from "@app_interfaces/ITable";
import ReusableTable from "../../../../shared/ReusableTable";
import { getAllQuotations } from "@app_services/quotationService";
import { IQuotation } from "@app_interfaces/IQuotation";

const columns: IColumn[] = [
  { id: "createdAt", label: "Date", numeric: true, disablePadding: false },
  { id: "surcharge", label: "Total Profit", numeric: true, disablePadding: false },
];

const ProfitInfo: React.FC = () => {
  const [quotations, setQuotations] = useState<IRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAndPrepareQuotations = async () => {
    try {
      const response = await getAllQuotations();
      const preparedQuotations: IQuotation[] = response.data.filter((quotation: IQuotation) =>
        quotation.createdAt.includes(searchTerm)
      ).map((quotation: IQuotation) => ({
        ...quotation,
        createdAt: new Date(quotation.createdAt).toLocaleDateString(), // Convert date to string format
      }));

      const profitDetails: { [key: string]: number } = {};

      preparedQuotations.forEach((quotation) => {
        const createdAt = quotation.createdAt;
        const surcharge = quotation.surcharge;
        if (profitDetails[createdAt]) {
          profitDetails[createdAt] += surcharge;
        } else {
          profitDetails[createdAt] = surcharge;
        }
      });

      const Rows: IRow[] = Object.keys(profitDetails).map((createdAt) => ({
        createdAt,
        surcharge: profitDetails[createdAt],
      }));

      setQuotations(Rows);
    } catch (error) {
      console.error('Failed to fetch quotations', error);
    }
  };

  useEffect(() => {
    fetchAndPrepareQuotations();
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={quotations}
        title="Profit Details"
        rowKey="createdAt"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
    </>
  );
};
export default ProfitInfo;
