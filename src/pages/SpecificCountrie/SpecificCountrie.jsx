import { useParams } from "react-router-dom";
import "./SpecificCountrie.scss";
import Header from "../../components/Header/Header";
import { secondApi } from "../../api/api";
import { useEffect, useState } from "react";

export default function SpecificCountrie() {
  const { code } = useParams();
  const [countrie, setCountrie] = useState({});

  const getCountrie = async (codeCountrie) => {
    try {
      const response = await secondApi.get(
        `/alpha/${codeCountrie}?fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders`
      );
      setCountrie(response.data);
    } catch (error) {
      console.error("Erro ao buscar país:", error);
    }
  };

  useEffect(() => {
    getCountrie(code);
  }, [code]);


//   console.log(
    // Object.values(countrie.currencies ?? {}).map((currencie) => currencie.name).join(", ")
   (countrie.borders ?? []).forEach((countrie) => {
        console.log("O país é esse: ", countrie)      
    })
//   );

  return (
    <div className="countrie">
      <Header />

      <div className="countrie__content">
        <p>
          {Object.values(countrie.currencies ?? {})
            .map((moeda) => moeda.name)
            .join(", ")}
        </p>
      </div>
    </div>
  );
}
