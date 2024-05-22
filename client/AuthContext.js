import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const DeviceContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};
export const useDevice = () => {
  return useContext(DeviceContext);
};
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(true);
  const [device, setDevice] = useState(null);
  return (
    <DeviceContext.Provider value={[device, setDevice]}>
      <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>
    </DeviceContext.Provider>
  );
};
export default AuthProvider;
