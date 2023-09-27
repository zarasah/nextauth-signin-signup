'use client'

import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { Container } from "react-bootstrap";
import style from "./sign-in.module.scss";

function SignIn() {
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
      password: '',
    },
    onSubmit: async ({email, password }) => {
        const data = {
            email,
            password
        }

    console.log(email, password)
    // const loginUser = await signIn('credentials', { email, password, redirect: false })
    const loginUser = await signIn('credentials', { email, password, redirect: false}) // redirect: false  callbackUrl: '/'
    console.log('loginUser', loginUser)
    if (loginUser.error === null) {
      console.log('User has been logged in!')
    } else {
      console.log('Error')
    }
  },
  });
  return (
    <>
      <Container className={`${style.container_sign_up}`}>
        <h1 className="display-1 ">Sign In</h1>
        <p className={`${style.text_wellcom} `}>
          Welcome
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
            SIGN IN
          </button>
        </form>
        <div
        className={`pt-4 ${style.google_facebook_buttons} d-flex flex-column`}
      >
        <h6 className={style.or_line}>OR</h6>
        <button
          className={`d-flex p-1 text-center w-100 bg-white border-forty border align-items-center ${style.countinue_google}`}
          onClick={() => signIn("google", { callbackUrl: '/' })}
        >
          <div className="text-uppercase">Continue with Google</div>
        </button>
        </div>
      </Container>
    </>
  );
}

export default SignIn;


