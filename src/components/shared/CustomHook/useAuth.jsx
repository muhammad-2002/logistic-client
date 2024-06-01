import { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useAuth;
