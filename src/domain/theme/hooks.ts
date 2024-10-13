import { useContext } from "react";
import { ThemeContext } from "./ThemeConstext";

export const usePrimaryColor = () => {
    const { primaryColor } = useContext(ThemeContext);

    return primaryColor
}