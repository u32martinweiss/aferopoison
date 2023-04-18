import { useFormik } from 'formik';

import DefaultLayout from '../layouts/DefaultLayout';

import { loginSchema } from '../schemas/auth';

const LoginPage = (): JSX.Element => {
  const onSubmit = async () => {
    console.log('Submit!');
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
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <DefaultLayout>
      <h1>Login</h1>
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
        <input type="submit" value="Sign in" disabled={isSubmitting} />
      </form>
    </DefaultLayout>
  );
};

export default LoginPage;
