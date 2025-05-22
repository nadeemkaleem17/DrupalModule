import React, { useContext, useState } from 'react';
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./loginPage.scss";
import AuthContext from "../../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
    const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const {login} = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="d-flex align-items-start justify-content-center"
      style={{ height: '100vh', backgroundColor: '#f6f6f9', paddingTop: '6rem' }}
    >
      <div
        className="bg-white p-5 rounded shadow"
        style={{
          width: '100%',
          maxWidth: '500px',
          minHeight: '600px', // Increased height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div className="text-center mb-4">
            <img src={Logo} alt="App Logo" width="48" height="48" />
          </div>

          <h3 className="text-center fw-bold mb-1">Welcome back!</h3>
          <p className="text-center text-muted mb-4" style={{ fontSize: '0.95rem' }}>
            Log in to your account
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control py-2"
                placeholder='joe1234@gmail.com'
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 position-relative">
              <div className="d-flex justify-content-between">
                <label htmlFor="password" className="form-label fw-bold">Password</label>
                <Link to="/forgot-password" className="text-primary small">Forgot password?</Link>
              </div>
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
                  top: '70%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#6c757d',
                }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Remember Me */}
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label text-muted" htmlFor="rememberMe" style={{ fontSize: '0.9rem' }}>
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-100 py-2">
              Login
            </button>
          </form>

          {/* Divider */}
          <hr className="my-4" />
        </div>

        {/* Google Login */}
        <div className="text-center">
          <button
            className="btn btn-light border d-flex align-items-center justify-content-center gap-2 mx-auto"
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '0.95rem',
              width: '100%',
              maxWidth: '280px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              style={{ width: '20px', height: '20px' }}
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
