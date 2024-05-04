export interface ISubmittedDocuments {
  submittedDocumentId: string;
  documentName: string;
  documentType: "Export License" | "Import Permit" | "Safety Data Sheets" | "Phytosanitary Certificate" | "Dangerous Goods Declaration";
  folderName: string;
  documentPath: string;
  referenceId: string; 
  createdAt?: Date;  
}
