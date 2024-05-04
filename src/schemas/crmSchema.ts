import * as Yup from 'yup';

const regExp = {
  name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
};

const nameSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(255, 'First name must not exceed 255 characters')
    .matches(regExp.name, 'Invalid first name format'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(255, 'Last name must not exceed 255 characters')
    .matches(regExp.name, 'Invalid last name format')
});

const addressSchema = Yup.object({
  street: Yup.string()
    .min(5, 'Street must be at least 5 characters')
    .max(50, 'Street must not exceed 50 characters'),
  city: Yup.string()
    .min(5, 'City must be at least 5 characters')
    .max(50, 'City must not exceed 50 characters'),
  state: Yup.string()
    .min(5, 'State must be at least 5 characters')
    .max(50, 'State must not exceed 50 characters'),
  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .max(50, 'Country must not exceed 50 characters')
});

const registerSchema = Yup.object({
  name: nameSchema,
  email: Yup.string()
    .email('Invalid email address'),
  contactNumber: Yup.number()
    .integer('Contact number must be an integer')
    .typeError('Contact number must be an integer'),
  address: addressSchema,
  customerId: Yup.string(),
  priorityLevel: Yup.string()
    .oneOf(['High Priority', 'Medium Priority', 'Low Priority'], 'Invalid priority level'),
  birthday: Yup.date(),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must not exceed 100 characters')
});

const updateSchema = Yup.object({
  name: nameSchema,
  email: Yup.string()
    .email('Invalid email address'),
  contactNumber: Yup.number()
    .integer('Contact number must be an integer')
    .typeError('Contact number must be an integer'),
  address: addressSchema,
  customerId: Yup.string(),
  priorityLevel: Yup.string()
    .oneOf(['High Priority', 'Medium Priority', 'Low Priority'], 'Invalid priority level'),
  birthday: Yup.date()
});

export { registerSchema, updateSchema };
