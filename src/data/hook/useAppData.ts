import { useContext } from "react";
import AppContext from "../context/AppContexet";

const useAppData = () => useContext(AppContext)

export default useAppData