import { useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    store_id: "",
    storeOwner: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(nextFormState);
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // const phoneno = (e) => {
  //   var a = [];

  //   var k = e.which;

  //   for (let i = 48; i < 58; i++) a.push(i);

  //   if (!(a.indexOf(k) >= 0)) e.preventDefault();
  // };

  const validateForm = () => {
    let newErrors = {};

    if (!form.store_id) {
      newErrors.store_id = "Please enter store_id";
    }
    if (!form.storeOwner) {
      newErrors.storeOwner = "Please Enter the name.";
    }
    if (!form.password) {
      newErrors.password = "Please enter password.";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please enter the Confirm Password.";
    } else {
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Password is not matching.";
      }
    }

    setErrors(newErrors);
  };
  const onSubmitForm = async (e) => {
    //here the function object.values(form) will convert the form value in an array
    e.preventDefault();
    let arr = Object.values(form);
    let isBool = true;
    arr.forEach((input) => {
      if (input === "") return (isBool = false);
    });

    if (isBool) {
      const response = await fetch("http://localhost:3001/auth/store", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (data.storeOwner === form.storeOwner) {
        isBool = false;
        alert("store exist");
      }
    }
    if (isBool) {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      navigate("/login");
    }
  };

  return (
    <>
      <h1>Add product</h1>
      <form className={styles.form} onSubmit={onSubmitForm} autoComplete="off">
        <div className={styles.formGroup}>
          <label className={styles.formLabel}></label>
          <input
            className={styles.formField}
            type="number"
            name="store_id"
            value={form.store_id}
            onChange={onUpdateField}
            onBlur={validateForm}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Store Name</label>
          <input
            className={styles.formField}
            type="text"
            aria-label="Email field"
            name="storeOwner"
            value={form.storeOwner}
            onChange={onUpdateField}
            onBlur={validateForm}
          />
          <ErrorMessage message={errors.storeOwner} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input
            className={styles.formField}
            type="password"
            aria-label="Email field"
            name="password"
            value={form.password}
            onChange={onUpdateField}
            onBlur={validateForm}
          />
          <ErrorMessage message={errors.password} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Confirm Password</label>
          <input
            className={styles.formField}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onUpdateField}
            onBlur={validateForm}
          />
          <ErrorMessage message={errors.confirmPassword} />
        </div>

        <div className={styles.formActions}>
          <button className={styles.formSubmitBtn} type="submit">
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
