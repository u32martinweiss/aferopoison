import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, 'Username needs to be 6 characters minimum!')
    .max(24, 'Username needs to be 24 characters maximum!')
    .required('Username is required!'),
  password: yup
    .string()
    .min(8, 'Password needs to be 8 characters minimum!')
    .max(32, 'Password needs to be 32 characters maximum!')
    .required('Password is required!'),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, 'Username needs to be 6 characters minimum!')
    .max(24, 'Username needs to be 24 characters maximum!')
    .required('Username is required!'),
  displayName: yup
    .string()
    .min(2, 'Display name needs to be 2 characters minimum!')
    .max(48, 'Display name needs to be 48 characters maximum!')
    .required('Display name is required!'),
  password: yup
    .string()
    .min(8, 'Password needs to be 8 characters minimum!')
    .max(32, 'Password needs to be 32 characters maximum!')
    .required('Password is required!'),
});
