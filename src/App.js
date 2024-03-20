import "./App.css";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useState, useRef } from "react";
import data from "./data.json";

function App() {
  const [countries, setCountries] = useState(data);
  const [filteredCountries, setFilteredValue] = useState();

  const searchRef = useRef();
  return (
    <div className="App">
      <header className="header">
        <Container className="headerContent">
          <div>
            <h1>Where in the world?</h1>
          </div>
          <div className="headerToggle">
            <span>Day</span> Dark Mode
          </div>
        </Container>
      </header>
      <main>
        <Container>
          <div className="breadcrumbs">
            <div className="breadcrumbsInput">
              <img src="/search.svg" alt="search" width={24} height={24} />
              <form>
                <input
                  className="searchInput"
                  placeholder="search for a country..."
                  type="text"
                  ref={searchRef}
                />
              </form>
            </div>
            <div className="breadcrumbsFilter">
              <select className="searchSelect">
                <option> Filter By Region</option>
                <option value="Africa">Africa</option>
                <option value="North America">America</option>
                <option value="Antarctica">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>

          <Row>
            {countries.map((country, index) => (
              <Col key={index}>
                <Card className="countryCard">
                  <Card.Img src={country.flags.png} alt={country.name} />

                  <Card.Body>
                    <Card.Title>{country.name}</Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        Population: {country.population}
                      </ListGroup.Item>
                      <ListGroup.Item>Region: {country.region}</ListGroup.Item>
                      <ListGroup.Item>
                        Capital: {country.capital}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
