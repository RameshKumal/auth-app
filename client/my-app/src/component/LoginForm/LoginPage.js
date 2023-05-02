import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import styles from "./LoginForm.module.css";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    storeOwner: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("user"));
    setData(storeData);
  }, []);

  const updateField = (e) => {
    const formState = {
      ...inputs,
      [e.target.name]: e.target.value,
    };
    setInputs(formState);
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!inputs.storeOwner) {
      newErrors.storeOwner = "Please enter the valid storeOwner.";
    }
    if (!inputs.password) {
      newErrors.password = "Please enter the password.";
    }

    setErrors(newErrors);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(inputs),
    });

    const data = await response.json();
    if (!data.owner.storeOwner) {
      alert("Invalid credentials");
    } else {
      navigate("/Home", { state: { name: data.storeOwner } });
      // navigate("/dashboard", {
      //   state: { name: data.owner.storeOwner, id: data.owner.store_id },
      // });
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Store Name</label>
          <input
            className={styles.formField}
            type="text"
            name="storeOwner"
            value={inputs.storeOwner}
            onChange={updateField}
            onBlur={validateForm}
          />
          <ErrorMessage message={errors.storeOwner} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input
            className={styles.formField}
            type="password"
            name="password"
            value={inputs.password}
            onChange={updateField}
            onBlur={validateForm}
          />
          <ErrorMessage message={errors.password} />
        </div>
        <div className={styles.formActions}>
          <button className={styles.formSubmitBtn} type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
