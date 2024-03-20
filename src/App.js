import "./App.css";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Moon } from "react-bootstrap-icons";
import { useState, useRef } from "react";
import data from "./data.json";

function App() {
  const [countries, setCountries] = useState(data);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const searchRef = useRef();

  function handleSearch(event) {
    event.preventDefault();

    // First, get the country entered as the input value
    const inputValue = searchRef.current.value.toLowerCase();

    // After the search is complete clicking the enter/return button again will make the list countries to be re-rendered
    if (!inputValue.trim()) {
      setFilteredCountries(data);
    } else {
      // Next, search the countries array for the entered country value.
      // There are two case scenarios to check before filtering through the array.
      // 1. Check if the filteredCountries value is true - i.e if it the countries has been filtered before.
      // 2. if it hasn't been filtered before then the normal countries array will be filtered
      const updatedCountry = filteredCountries
        ? filteredCountries.filter(
            (country) => country.name.toLowerCase() === inputValue
          )
        : countries.filter(
            (country) => country.name.toLowerCase() === inputValue
          );

      // Next up, update the filteredCountries state
      setFilteredCountries(updatedCountry);

      // Lastly, make the search input empty again
      searchRef.current.value = "";
    }
  }

  function handleFilter(event) {
    event.preventDefault();

    // Get the value from the dropdown list
    const searchQuery = event.target.value;

    // Filter countries by region and save in a constant variable
    const regionAfrica = countries.filter(
      (country) => country.region === "Africa"
    );
    const regionAsia = countries.filter((country) => country.region === "Asia");

    const regionAmericas = countries.filter(
      (country) => country.region === "Americas"
    );
    const regionEurope = countries.filter(
      (country) => country.region === "Europe"
    );
    const regionOceania = countries.filter(
      (country) => country.region === "Oceania"
    );

    // Define a new countries variable
    let newCountriesArray;

    // Using the switch operator, depending on the value of the search query. The new variable will be the filtered array that matches the search query
    switch (searchQuery) {
      case "Africa":
        newCountriesArray = regionAfrica;
        break;
      case "Asia":
        newCountriesArray = regionAsia;
        break;
      case "Americas":
        newCountriesArray = regionAmericas;
        break;
      case "Europe":
        newCountriesArray = regionEurope;
        break;
      case "Oceania":
        newCountriesArray = regionOceania;
        break;

      default:
        newCountriesArray = countries;
        break;
    }

    // Update the filtered countries to the new array
    setFilteredCountries(newCountriesArray);
  }

  const pageData = filteredCountries ? filteredCountries : countries;
  return (
    <div className="App">
      <header className="header">
        <Container className="headerContent">
          <div>
            <h1>Where in the world?</h1>
          </div>
          <div className="headerToggle">
            <span>
              <Moon color="#000" size={20} />
            </span>{" "}
            Dark Mode
          </div>
        </Container>
      </header>
      <main>
        <Container>
          <div className="breadcrumbs">
            <div className="breadcrumbsInput">
              <img src="/search.svg" alt="search" width={24} height={24} />
              <form onSubmit={handleSearch}>
                <input
                  className="searchInput"
                  placeholder="search for a country..."
                  type="text"
                  ref={searchRef}
                />
              </form>
            </div>
            <div className="breadcrumbsFilter">
              <select className="searchSelect" onChange={handleFilter}>
                <option value="All"> Filter By Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>

          <Row>
            {pageData.map((country, index) => (
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
