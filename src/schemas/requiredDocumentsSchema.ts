import * as yup from 'yup';

export const requiredDocumentsSchema = yup.object({
    exportLicense: yup.mixed().required("Export License is required"),
    importPermit: yup.mixed().required("Import Permit is required"),
    safetyDataSheets: yup.mixed().required("Safety Data Sheets are required"),
    phytosanitaryCertificate: yup.mixed().required("Phytosanitary Certificate is required"),
    dangerousGoodDeclaration: yup.mixed().required("Dangerous Good Declaration is required"),
});