import * as Yup from 'yup';

const accessGeneralSchema = Yup.object().shape({

  description: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot be more than 50 characters')
    .matches(
      /^[A-Za-z _]+$/,
      "Access Level should only contains characters only"
    ),

  accessAreas: Yup.string()
    .required('Access Area')
    .min(2, 'Access Area must be at least 3 characters')
    .max(50, 'Access Area cannot be more than 50 characters')
    .matches(
      /;/,
      "Semicolon is needed!"
    )
    .matches(
      /[a-zA-Z -_;]+/,
      "Invalid Format"
    )
});


export default accessGeneralSchema;
