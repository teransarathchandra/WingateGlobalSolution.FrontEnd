import * as Yup from 'yup';

const employeeGeneralSchema = Yup.object().shape({

  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot be more than 4 characters')
    .matches(
      /^[A-Za-z]+$/,
      "First name should not contain special characters or spaces"
    ),

  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 5 characters')
    .max(50, 'Last name cannot be more than 50 characters'),


  street: Yup.string()
    .required('Street is required')
    .min(2, 'Street must be at least 5 characters')
    .max(50, 'Street cannot be more than 50 characters'),


  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 5 characters')
    .max(50, 'City cannot be more than 50 characters'),


  state: Yup.string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State cannot be more than 50 characters'),



  country: Yup.string()
    .required('Country is required')
    .min(2, 'Country must be at least 5 characters')
    .max(50, 'Country cannot be more than 50 characters'),


  email: Yup.string()
    .required('Email is required')
    .min(5, 'Email must be at least 5 characters')
    .max(50, 'Email cannot be more than 50 characters')
    .email('Email must be a valid email address'),


  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password cannot be more than 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  contactNumber: Yup.string()
    .required('Contact number is required')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number cannot be more than 15 digits'),



  focus: Yup.string()
    .required('Focus is required')
    .min(2, 'Focus must be at least 5 characters')
    .max(100, 'Focus cannot be more than 50 characters'),



  accessLevel: Yup.string().nullable().typeError("Select an access level")
    .required('Access level is required')


});


export default employeeGeneralSchema;
