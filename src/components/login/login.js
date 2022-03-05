import React from "react";
import { Formik } from "formik";
// import * as EmailValidator from "email-validator";
import * as Yup from "yup";

const Login = () => (
  <Formik
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("No password provided."),
      // .min(8, "Password is too short - should be 8 chars minimum.")
      // .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        const response = fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values
          }),
        })
        const data = response.json()

        if (data.user) {
          localStorage.setItem('token', data.user)
          alert('Login successful')
          window.location.href = '/dashboard'
        } else {
          alert('Please check your username and password')
        }

        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
    }}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

      return (
        <div className="h-screen flex bg-gray-100">
          <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
            <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
              Log in to your account 🔐
            </h1>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  // className={errors.email && touched.email && "error"}
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your Email"
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  // className={errors.password && touched.password && "error"}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your Password"
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </div>

              <div className="flex justify-center items-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green-500 hover:outline-none hover:border-green-800`}
                >
                  Continue with email
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }}
  </Formik>
);

export default Login;
