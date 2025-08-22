import Header from "../../components/Header/Header";
import "./Home.scss";
import api from "../../api/api";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import FilterSelect from "../../components/FilterSelect/FilterSelect";
import CardCountrie from "../../components/CardCountrie/CardCountrie";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const getCountries = async () => {
    await api
      .get("/all?fields=name,capital,population,region,flags,cca3")
      .then((response) => setCountries(response.data));
  };

  const getCountriesByRegion = async (region) => {
    await api
      .get(`/region/${region}?fields=name,capital,population,region,flags,cca3`)
      .then((response) => setCountries(response.data));
  };

  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getCountries();
    setLoading(false);
  }, []);

  const filteredCountries = countries.filter((countrie) =>
    countrie.name.common.toLowerCase().includes(search.toLowerCase())
  );


  console.log(filteredCountries);

  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  useEffect(() => {
    const formated_region = region.toLowerCase();

    if (formated_region == "") {
      getCountries();
    } else {
      getCountriesByRegion(formated_region);
    }
  }, [region]);

  const regions = [
    { value: "", label: "None" },
    { value: "Africa", label: "Africa" },
    { value: "America", label: "America" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];

  return (
    <div className="home">
      <Header />
      <div className="home__items">
        <div className="home__items__config">
          <div className="home__items__config__search">
            <IoIosSearch size={19} className="icon" />
            <input
              type="text"
              className="input_search"
              placeholder="Search for a country"
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
          <div className="home__items__config__filter">
            <FilterSelect
              label="Filter By Region"
              value={region}
              onChange={handleChange}
              options={regions}
            />
          </div>
        </div>

        {loading ? (
          <div className="home__items__config__loading-component">
            <CircularProgress size="4rem" />
          </div>
        ) : (
          <div className="home__items__countrie-group">
            {filteredCountries.length == 0 ? (
              <div className="home__items__countrie-group__error-handler">
                <p>Countrie not found!</p>
              </div>
            ) : (
              filteredCountries.map((countrie, i) => (
                <CardCountrie
                  i={i}
                  flags={countrie.flags.png}
                  name={countrie.name.common}
                  population={countrie.population}
                  region={countrie.region}
                  capitals={countrie.capital[0]}
                  code={countrie.cca3}
                />
              ))
            )}
          </div>
         )}
      </div>
    </div>
  );
}
