import "./country.css";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Country() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { country } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v2/alpha/${country}`
        );
        const countryData = await response.json();

        setSelectedCountry(countryData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [country]);

  return (
    <Container className="countryBox">
      <div className="backBtn">
        <Link to={"/"}>&larr; Back </Link>
      </div>
      {!selectedCountry && <h1>Loading</h1>}
      {selectedCountry && (
        <Row>
          <Col className="countryImg colOne">
            <img
              src={selectedCountry.flag}
              alt={`The official flag of ${selectedCountry.name}`}
            />
          </Col>
          <Col className="colTwo">
            <div className="countryName">
              <h2>{selectedCountry.name}</h2>
            </div>
            <Row>
              <Col className="countryDetails">
                <ul>
                  <li>
                    <span className="countryDetailsKey">Native Name: </span>
                    <span>{selectedCountry.nativeName}</span>
                  </li>
                  <li>
                    <span className="countryDetailsKey">Population: </span>
                    <span>{selectedCountry.population}</span>
                  </li>
                  <li>
                    <span className="countryDetailsKey">Region: </span>
                    <span>{selectedCountry.region}</span>
                  </li>
                  <li>
                    <span className="countryDetailsKey">Sub Region: </span>
                    <span>{selectedCountry.subregion}</span>
                  </li>
                  <li>
                    <span className="countryDetailsKey">Capital: </span>
                    {selectedCountry.capital && (
                      <span>{selectedCountry.capital}</span>
                    )}
                    {!selectedCountry.capital && <span>Not included</span>}
                  </li>
                </ul>
              </Col>
              <Col className="countryDetails">
                <ul>
                  <li>
                    <span className="countryDetailsKey">
                      Top Level Domain:{" "}
                    </span>
                    <span>{selectedCountry.topLevelDomain}</span>
                  </li>
                  <li>
                    <span className="countryDetailsKey">Currencies: </span>
                    {selectedCountry.currencies && (
                      <span>
                        {selectedCountry.currencies.map(
                          (currency) => currency.name
                        )}
                      </span>
                    )}
                    {!selectedCountry.currencies && <span>Not included</span>}
                  </li>
                  <li>
                    <span className="countryDetailsKey">Languages: </span>
                    <span>
                      {selectedCountry.languages.map(
                        (language) => language.name
                      )}
                    </span>
                  </li>
                </ul>
              </Col>
            </Row>
            <div className="borderCountries">
              <span>Border Countries:</span>
              {selectedCountry.borders &&
                selectedCountry.borders.map((border) => (
                  <div className="borderCountry">
                    <Link to={`/${border}`}>{border}</Link>
                  </div>
                ))}
              {!selectedCountry.borders && (
                <p style={{ margin: "0 10px" }}>Not included</p>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Country;
