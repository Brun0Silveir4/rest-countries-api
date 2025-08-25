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
        `/alpha/${codeCountrie}?fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders,flags`
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

  console.log(bordersName);

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
          <div className="countrie__content__container">
            <div className="countrie__content__container__image">
              <img
                src={countrie?.flags?.png}
                alt=""
                className="countrie-flag"
              />
            </div>
            <div className="countrie__content__container__texts">
              <div className="countrie__content__container__texts__title">
                <p>{countrie?.name}</p>
              </div>

              <div className="countrie__content__container__texts__values">
                <div className="first-half">
                  <div className="first-half__element">
                    <p className="bold">Native Name:</p>
                    <p>{countrie?.nativeName}</p>
                  </div>

                  <div className="first-half__element">
                    <p className="bold">Population:</p>
                    <p>{countrie?.population.toLocaleString("pt-BR")}</p>
                  </div>

                  <div className="first-half__element">
                    <p className="bold">Region:</p>
                    <p>{countrie?.region}</p>
                  </div>

                  <div className="first-half__element">
                    <p className="bold">Sub Region:</p>
                    <p>{countrie?.subregion}</p>
                  </div>

                  <div className="first-half__element">
                    <p className="bold">Capital:</p>
                    <p>{countrie?.capital}</p>
                  </div>
                </div>
                <div className="second-half">
                  <div className="second-half__element">
                    <p className="bold">Top Level Domain:</p>
                    <p>{countrie?.topLevelDomain}</p>
                  </div>

                  <div className="second-half__element">
                    <p className="bold">Currencies:</p>
                    <p>
                      {countrie?.currencies
                        ?.map((currencie) => currencie.name)
                        .join(", ")}
                    </p>
                  </div>

                  <div className="second-half__element">
                    <p className="bold">Languages:</p>
                    <p>
                      {countrie?.languages?.map((lang) => lang.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="countrie__content__container__texts__borders">
                <p className="title-borders">Border Countries:</p>

                <div className="countrie__content__container__texts__borders__border-group">
                  {bordersName.length > 0 ? (
                    bordersName.map((countrie, i) => (
                      <div className="border-item" key={i}>
                        <p>{countrie.name}</p>
                      </div>
                    ))
                  ) : (
                    <p>No Border Countries Was Found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
