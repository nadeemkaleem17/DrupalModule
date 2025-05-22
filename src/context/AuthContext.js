import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (jwt && !user) {
      fetch("http://localhost:1337/api/users/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then((res) => res.json())
        .then(setUser)
        .catch(() => logout());
    }
  }, [jwt]);

  const login = async (identifier, password) => {
    console.log(identifier, password);
    const res = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: identifier,password: password }),
    });
    console.log(res);
    const data = await res.json();
    console.log('data: ', data);
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      setJwt(data.jwt);
      setUser(data.user);
    } else {
      throw new Error(data.error?.message || "Login failed");
    }
  };

  const register = async (username, email, password) => {
    const res = await fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      setJwt(data.jwt);
      setUser(data.user);
    } else {
      throw new Error(data.error?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setJwt(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ jwt, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
