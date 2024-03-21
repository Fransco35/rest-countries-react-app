import "./header.css";
import { Container } from "react-bootstrap";
import { Moon, Sun } from "react-bootstrap-icons";

function Header(props) {
  const { onToggle, toggleColor } = props;

  const header = toggleColor ? "header" : "header headerDark";

  return (
    <header className={header}>
      <Container className="headerContent">
        <div>
          <h1>Where in the world?</h1>
        </div>
        <div className="headerToggle">
          <span onClick={onToggle}>
            {toggleColor && <Moon color={toggleColor ? "#000" : "#fff"} />}
            {!toggleColor && <Sun color={toggleColor ? "#000" : "#fff"} />}
          </span>{" "}
          {toggleColor ? "Dark Mode" : "Light Mode"}
        </div>
      </Container>
    </header>
  );
}
export default Header;
