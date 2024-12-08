import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles.css";

interface LoginFormProps {
  onSwitch: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const [message, setMessage] = useState("");
  const [rememberedEmail, setRememberedEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setRememberedEmail(savedEmail);
    }
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          email: rememberedEmail || "",
          password: "",
          rememberMe: rememberedEmail !== "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          if (values.rememberMe) {
            localStorage.setItem("rememberedEmail", values.email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          setMessage("Login Successful!");
          resetForm();
          setTimeout(() => setMessage(""), 3000);
        }}
      >
        {() => (
          <Form aria-labelledby="login-form">
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" id="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" id="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label>
                <Field name="rememberMe" type="checkbox" />
                Remember Me
              </label>
            </div>
            <button type="submit">Login</button>
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={onSwitch}>
                Sign Up
              </button>
            </p>
            {message && <div className="success">{message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
