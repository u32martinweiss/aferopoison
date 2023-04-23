import { useFormik } from 'formik';

import DefaultLayout from '../layouts/DefaultLayout';

import { useAuth } from '../hooks/auth';

import { registerSchema } from '../schemas/auth';

const RegisterPage = (): JSX.Element => {
  const { handleRegister } = useAuth();

  const onSubmit = async () => {
    const authData = await handleRegister({
      username: values.username,
      displayName: values.displayName,
      password: values.password,
    });
    if (authData && !authData.success) {
      if (authData.message) alert(authData.message);
    }
  };

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      displayName: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <DefaultLayout>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.username && errors.username ? (
          <>
            <br />
            <span>{errors.username}</span>
          </>
        ) : null}
        <br />
        <label htmlFor="username">Display name:</label>
        <br />
        <input
          type="text"
          name="displayName"
          value={values.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.displayName && errors.displayName ? (
          <>
            <br />
            <span>{errors.displayName}</span>
          </>
        ) : null}
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password ? (
          <>
            <br />
            <span>{errors.password}</span>
          </>
        ) : null}
        <br />
        <br />
        <input type="submit" value="Sign up" disabled={isSubmitting} />
      </form>
    </DefaultLayout>
  );
};

export default RegisterPage;
