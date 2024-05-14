/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null);
  const [is2FaVerifed, setIs2FaVerifed] = useLocalStorage("verifie2Fa", false);
  const [isToken, setIsToken] = useLocalStorage("token", null);
  const [verifyCode, setVerifyCode] = useLocalStorage("verifyCode", null);

  const login = (data) => {
    setUser(data);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserInfo(null);
    setIs2FaVerifed(false);
  };

  const verify2Fa = async (code) => {
    // Mock verification logic
    if (code !== verifyCode) {
      return false;
    }
    return true;
  };

  const value = useMemo(
    () => ({
      user,
      isLoggedIn,
      is2FaVerifed,
      userInfo,
      login,
      logout,
      verify2Fa,
      setIs2FaVerifed,
      setUserInfo,
      isToken,
      setIsToken,
      verifyCode, setVerifyCode
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}

const SetUserInfoAndLogin = (data) => {
  const { login, setUser, setUserInfo } = useAuth();
  setUser(data);
  setUserInfo(data);
  login(data);
};

export default SetUserInfoAndLogin;
