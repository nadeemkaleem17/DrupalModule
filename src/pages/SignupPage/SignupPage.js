import React, { useState, useContext } from "react";
import "./signupPage.scss";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthContext"; // import your AuthContext

const SignupPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    try {
      // Use the username as "firstName + lastName" or just firstName if you prefer
      const username = formData.firstName.trim() + formData.lastName.trim();

      await register(username, formData.email, formData.password);

      // On success, redirect or do something else
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex align-items-start justify-content-center"
      style={{ height: "100vh", backgroundColor: "#f6f6f9", paddingTop: "3rem" }}
    >
      <div className="bg-white p-5 rounded shadow" style={{ width: "100%", maxWidth: "560px" }}>
        <div className="text-center mb-4">
          <img src={Logo} alt="App Logo" width="48" height="48" />
        </div>

        <h3 className="text-center fw-bold mb-2">Welcome to Book Module!</h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.9rem" }}>
          Credentials are only used to authenticate and all saved data will be stored in your database.
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-4 mb-3">
            <div className="col">
              <label htmlFor="firstName" className="tight-form form-label fw-bold">
                First name
              </label>
              <input
                type="text"
                className="form-control py-2"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="lastName" className="tight-form form-label fw-bold">
                Last name
              </label>
              <input
                type="text"
                className="form-control py-2"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="tight-form form-label fw-bold">
              Email *
            </label>
            <input
              type="email"
              className="form-control py-2"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 position-relative">
            <label htmlFor="password" className="tight-form form-label fw-bold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control py-2 pe-5"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon
              icon={!showPassword ? faEyeSlash : faEye}
              className="position-absolute"
              style={{
                top: "55%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6c757d",
              }}
              onClick={() => setShowPassword(!showPassword)}
            />
            <small className="text-muted">
              Must be at least 8 characters, 1 uppercase, 1 lowercase & 1 number
            </small>
          </div>

          <div className="mb-4 position-relative">
            <label htmlFor="confirmPassword" className="tight-form form-label fw-bold">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control py-2 pe-5"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon
              icon={!showConfirmPassword ? faEyeSlash : faEye}
              className="position-absolute"
              style={{
                top: "70%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6c757d",
              }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          <div className="form-check mb-4">
            <input type="checkbox" className="form-check-input" id="updatesCheck" />
            <label
              className="form-check-label text-muted"
              htmlFor="updatesCheck"
              style={{ fontSize: "0.9rem" }}
            >
              Keep me updated about new features & upcoming improvements (
              <Link className="text-decoration-underline">terms</Link> &{" "}
              <Link className="text-decoration-underline">privacy policy</Link>)
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Let’s start
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
