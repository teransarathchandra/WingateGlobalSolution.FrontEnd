export interface ISubmittedDocuments {
  submittedDocumentId: string;
  documentName: string;
  documentType: "Export License" | "Import Permit" | "Safety Data Sheets" | "Phytosanitary Certificate" | "Dangerous Goods Declaration";
  folderName: string;
  documentPath: string;
  itemId: string;  // Reference to an Item document
  createdAt?: Date;  // Optional because it's managed by Mongoose timestamps
  updatedAt?: Date;  // Optional because it's managed by Mongoose timestamps
}
