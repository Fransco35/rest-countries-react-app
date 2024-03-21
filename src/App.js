import "./App.css";
import { useRoutes } from "react-router-dom";
import Header from "./layout/Header";
import Home from "./pages/Home/Home";
import CountryDetails from "./pages/CountryDetails/CountryDetails";
import { useState } from "react";

function App() {
  const [toggleColor, setToggleColor] = useState(true);

  function handleToggle() {
    setToggleColor(() => !toggleColor);
  }
  let route = [
    {
      path: "/",
      element: <Home toggleColor={toggleColor} />,
    },
    {
      path: "/:country",
      element: <CountryDetails toggleColor={toggleColor} />,
    },
  ];

  let elements = useRoutes(route);

  const App = toggleColor ? "App" : "AppDark";

  return (
    <div className={App}>
      <Header onToggle={handleToggle} toggleColor={toggleColor} />
      <main>{elements}</main>
    </div>
  );
}

export default App;
