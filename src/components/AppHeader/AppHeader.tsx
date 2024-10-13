import { usePrimaryColor } from "../../domain/theme/hooks";
import logo from "../../images/image-name.png";
import { ThemeEditor } from "../../domain/theme/ThemeEditor";

export const AppHeader = () => {
  const primaryColor = usePrimaryColor();

  return (
    <header className="app-header">
      <img src={logo} alt="Awesome image" />
      <h1 style={{ color: primaryColor }}>
        Bookmonkey
      </h1>
      <ThemeEditor />
    </header>
  );
}

/*
oder

export const AppHeader = () => {
  return <h1 className="app-header">Bookmonkey</h1>;
};

oder 

export function AppHeader() {

*/
