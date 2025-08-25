import { useNavigate, useParams } from "react-router-dom";
import "./SpecificCountrie.scss";
import Header from "../../components/Header/Header";
import { secondApi } from "../../api/api";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { IoArrowBack } from "react-icons/io5";

export default function SpecificCountrie() {
  const { code } = useParams();
  const [countrie, setCountrie] = useState({});
  const [loading, setLoading] = useState(true);
  const [bordersName, setBordersName] = useState([]);

  const getCountrie = async (codeCountrie) => {
    try {
      const response = await secondApi.get(
        `/alpha/${codeCountrie}?fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders`
      );
      setCountrie(response.data);
    } catch (error) {
      console.error("Erro ao buscar país:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBorderCountries = async (codes) => {
    try {
      const response = await secondApi.get(
        `/alpha?codes=${codes.join(",")}&fields=name`
      );
      setBordersName(response.data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  let navigate = useNavigate();

  const goTo = () => {
    navigate("/");
  };

  useEffect(() => {
    setLoading(true);
    getCountrie(code);
  }, [code]);

  useEffect(() => {
    if (countrie.borders) getBorderCountries(countrie.borders);
  }, [countrie]);

  return (
    <div className="countrie">
      <Header />

      {loading ? (
        <div className="countrie__loading-component">
          <CircularProgress size="4rem" />
        </div>
      ) : (
        <div className="countrie__content">
          <div className="countrie__content__btn" onClick={goTo}>
            <IoArrowBack size={14} className="countrie__content__btn__arrow" />
            <p>Back</p>
          </div>
          <div className="countrie__content__container"></div>
        </div>
      )}
    </div>
  );
}
