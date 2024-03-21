import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useState, useRef, useEffect } from "react";
import "./countries.css";
import data from "../data.json";
import { Link } from "react-router-dom";

function Countries(props) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const searchRef = useRef();
  const { toggleColor } = props;

  useEffect(() => {
    (async () => {
      try {
        const allCountries = await fetch(
          "https://restcountries.com/v2/all?fields=name,flags,population,region,capital,alpha3Code"
        );
        const response = await allCountries.json();

        setCountries(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
  const countriesList = toggleColor
    ? "countriesListLight"
    : "countriesListDark";

  const breadcrumbsInput = toggleColor
    ? "breadcrumbsInput breadcrumbsInputLight"
    : "breadcrumbsInput breadcrumbsInputDark";

  const searchInput = toggleColor
    ? "searchInput searchInputLight"
    : "searchInput searchInputDark";

  const searchSelect = toggleColor
    ? "searchSelect"
    : "searchSelect searchSelectDark";

  const countryCard = toggleColor
    ? "countryCard countryCardLight"
    : "countryCard countryCardDark";

  const ListGroupClass = toggleColor
    ? "list-group-flush countryItems"
    : "list-group-flush countryItems countryItemsDark";

  return (
    <Container className={countriesList}>
      <div className="breadcrumbs">
        <div className={breadcrumbsInput}>
          <Search
            style={{ color: toggleColor ? "#000" : "#fff" }}
            width={24}
            height={24}
          />
          <form onSubmit={handleSearch}>
            <input
              className={searchInput}
              placeholder="Search for a country..."
              type="text"
              ref={searchRef}
            />
          </form>
        </div>
        <div className="breadcrumbsFilter">
          <select className={searchSelect} onChange={handleFilter}>
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
          <Col className="countriesCol" key={index}>
            <Link className="countryLink" to={`/${country.alpha3Code}`}>
              <Card className={countryCard} id={index}>
                <Card.Img src={country.flags.png} alt={country.name} />

                <Card.Body>
                  <Card.Title>{country.name}</Card.Title>
                  <ListGroup className={ListGroupClass}>
                    <ListGroup.Item>
                      Population: {country.population}
                    </ListGroup.Item>
                    <ListGroup.Item>Region: {country.region}</ListGroup.Item>
                    <ListGroup.Item>Capital: {country.capital}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Countries;
