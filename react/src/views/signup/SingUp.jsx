import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axios-cilent";
import { useStateContext } from "../../contexts/ContextProvider";

const SingUp = () => {
  const { setUser, setToken } = useStateContext();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const onSubmit = (ev) => {
    console.log("hello");
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Create new account</h1>
          <input type="text" placeholder="Full Name" ref={nameRef} />
          <input type="email" placeholder="Email Address" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <input
            type="password"
            placeholder="Password Confirmation"
            ref={passwordConfirmationRef}
          />
          <button className="btn btn-black">Singup</button>
          <p className="message">
            Already Registered ? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
