import * as yup from 'yup';

const userUpdateYup = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string(),
    contactNumber: yup.string()
  });
  
  export default userUpdateYup;