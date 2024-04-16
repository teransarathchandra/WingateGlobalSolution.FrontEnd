import * as Yup from 'yup';

const restrictedOrdersYupSchema = Yup.object().shape({
  sendingCountryId: Yup.string().required('Sending country ID is required.'),
  receivingCountryId: Yup.string().required('Receiving country ID is required.'),
  categoryId: Yup.string().required('Category ID is required.'),
  maxQuantity: Yup.number().required('Maximum quantity is required.').positive('Maximum quantity must be a positive number.').integer('Maximum quantity must be an integer.'),
  exportLicense: Yup.boolean().required('Export license is required.'),
  importPermit: Yup.boolean().required('Import permit is required.'),
  safetyDataSheets: Yup.boolean().required('Safety data sheets are required.'),
  phytosanitaryCertificate: Yup.boolean().required('Phytosanitary certificate is required.'),
  dangerousGoodsDeclaration: Yup.boolean().required('Dangerous goods declaration is required.')
});

export default restrictedOrdersYupSchema;

