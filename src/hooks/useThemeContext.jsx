import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

//custom hook to access the theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  //if the context is out side the providers scope error will be thrown
  if (context === undefined) {
    throw new Error("Context should be wrapped within the Context Provider!!");
  }

  return context;
};
