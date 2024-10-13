import { useContext } from "react";
import { ThemeContext } from "./ThemeConstext";

const themeColors = ["tomato", "olivedrab", "gold", "hotpink"];

export const ThemeEditor = () => {
    const { primaryColor, setPrimaryColor } = useContext(ThemeContext);
  
    const handleColorClick = (color: string) => {
      setPrimaryColor(color);
    };
  
    return (
        <div>
            <button key="tomato" style={{background: 'tomato'}} onClick={() => handleColorClick('tomato')} />
            <button key="olivedrap" style={{background: 'olivedrap'}} onClick={() => handleColorClick('olivedrap')} />
        </div>

    //   <div className="theme-editor">
    //     {themeColors.map((color) => (
    //       <button
    //         key={color}
    //         style={{
    //           background: color,
    //           outline: color === primaryColor ? "1px solid #333" : "",
    //         }}
    //         onClick={() => handleColorClick(color)}
    //       />
    //     ))}
    //   </div>
    );
  };