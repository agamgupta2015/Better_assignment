import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import "../styles.css";

interface SignUpFormProps {
  onSwitch: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitch }) => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          setMessage("Sign Up Successful!");
          resetForm();
          setTimeout(() => setMessage(""), 3000);
        }}
      >
        {({ values }) => (
          <Form aria-labelledby="signup-form">
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" id="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" id="password" />
              <PasswordStrengthIndicator password={values.password} />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                id="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>
            <button type="submit">Sign Up</button>
            <p>
              Already have an account?{" "}
              <button type="button" onClick={onSwitch}>
                Login
              </button>
            </p>
            {message && <div className="success">{message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
