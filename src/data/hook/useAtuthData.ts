import { useContext } from "react";
import AuthContexet from "../context/AuthContexet";

const useAuthData = () => useContext(AuthContexet)

export default useAuthData