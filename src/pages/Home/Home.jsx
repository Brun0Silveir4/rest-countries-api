import Header from "../../components/Header/Header";
import "./Home.scss";
import api from "../../api/api";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import FilterSelect from "../../components/FilterSelect/FilterSelect";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");

  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  const getCountries = async () => {
    await api
      .get("/all?fields=name,capital,population,region")
      .then((response) => setCountries(response.data));
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    console.log(region)
  }, [region])


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
      </div>
    </div>
  );
}
