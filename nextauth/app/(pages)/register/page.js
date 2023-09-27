'use client'
import axios from "axios";
import { useFormik } from "formik";
import { Container } from "react-bootstrap";
import style from "./sign-up.module.scss";

function SignUp() {
  const {
    values,
    touched,
    errors,
    handleChange,
    // handleBlur,
    handleSubmit
  } = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: async ({email, name, password, repeatPassword}) => {
        const data = {
            email,
            name,
            password
        }
        const response = axios.post("/api/register", data)
          .then((data) => console.log(`Status: ${data.status},`, data.data.message))
          .catch((error) => console.log('ERROR', error.response.data) )
    },
  });
  return (
    <>
      <Container className={`${style.container_sign_up}`}>
        <h1 className="display-1 ">Sign Up</h1>
        <p className={`${style.text_wellcom} `}>
          Welcome, please create your account
        </p>
        <form className={style.section_email_password} onSubmit={handleSubmit}>
          <fieldset className="border ">
            <legend> Email Address</legend>
            <input
              type="email"
              className="form-control shadow-none"
              id="email"
              onChange={handleChange}
              value={values.email}
            />
          </fieldset>

          <fieldset className={`border ${style.name_surname}`}>
            <legend> Full Name</legend>
            <input
              type="name"
              className="form-control shadow-none"
              id="name"
              onChange={handleChange}
              value={values.name}
            />
          </fieldset>

          <fieldset
            className={`border position-relative ${style.password_legend}`}
          >
            <legend>Password</legend>
            <input
              type="password"
              className="form-control shadow-none"
              id="password"
              onChange={handleChange}
              value={values.password}
            />
          </fieldset>
          <button
            type="submit"
            className={`btn btn-primary rounded-0 mt-3 w-100 text-white text p-2 ${style.sign_in_btn}`}
          >
            SIGN UP
          </button>
        </form>
      </Container>
    </>
  );
}

export default SignUp;


