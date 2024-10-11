import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch(); // This remains unchanged
export const useAppSelector = (selector) => useSelector(selector); // This remains unchanged
