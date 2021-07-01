import React, { useState } from "react";
import { toast } from "react-toastify";
import "./VotingScreen.scss";
import { Button, Form } from "semantic-ui-react";
import { Grid, Card } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBone,
  faUserSecret,
  faMale,
  faUserTie,
  faGem,
  faAngry,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

const VotingScreen = ({ setItVoted, chain }) => {
  const [preferences, setPreferences] = useState([]);
  const [identifier, setIdentifier] = useState("");
  const [categoriesStyles] = useState([
    {
      category: "Veterinaria",

      style: "",
    },
    {
      category: "Comida",

      style: "",
    },
    {
      category: "Juguetes",

      style: "",
    },
    {
      category: "Ropa",

      style: "",
    },
    {
      category: "Estética",

      style: "",
    },
    {
      category: "Guardería",

      style: "",
    },
    {
      category: "Entrenamiento",

      style: "",
    },
  ]);

  const [errorSave, setErrorSave] = useState(false);
  const [errorIdentifier, setErrorIdentifier] = useState(false);
  const [errorLengthId, setErrorLengthId] = useState(false);
  const onClickPreference = (preference, index) => {
    if (preferences.length === 1 && !preferences.includes(preference)) {
      const categoryErased = preferences.splice(0, 1)[0];
      setPreferences(preferences);

      let ind = -1;
      categoriesStyles.forEach((cat, i) => {
        if (cat.category === categoryErased) {
          ind = i;
        }
      });
      categoriesStyles[ind] = { category: categoryErased, style: "" };
    }

    //  Comprobar que no se repitan
    if (!preferences.includes(preference)) {
      setPreferences([...preferences, preference]);
      //  Cambiar el classname a active
      categoriesStyles[index] = { category: preference, style: "active" };
    } else {
      setPreferences(preferences.filter((pref) => pref !== preference));
      categoriesStyles[index] = { category: preference, style: "" };
    }

    setErrorSave(false);
  };

  const onClickSave = async () => {
    if (preferences.length < 1) {
      setErrorSave(true);
    } else if (identifier === "") {
      setErrorIdentifier(true);
    } else if (identifier.length < 8) {
      setErrorLengthId(true);
    } else {
      //  verificar que no haya votado
      if (chain.itVoted(identifier)) {
        toast.error("Ya has votado previamente");
        return;
      }
      //  Llevar a cabo voto

      chain.addBlock({ identifier, vote: preferences[0] });

      setItVoted(true);
      toast.success("Tu voto ha sido guardado");
      toast.warning("Minando voto...");
    }
  };
  return (
    <>
      <div className="first-preferences">
        <Form>
          <Form.Input
            className="input"
            type="text"
            placeholder="Clave de Elector"
            name="identifier"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
            }}
          />
        </Form>

        <h4>Elige a tu candidato </h4>

        <Button
          type="submit"
          className="save-preferences-button"
          onClick={() => onClickSave()}
        >
          Guardar Voto
        </Button>
        {errorSave && <p className="error-message">Debes elegir 1 opción</p>}
        {errorIdentifier && (
          <p className="error-message">Debes escribir tu clave de elector</p>
        )}
        {errorLengthId && (
          <p className="error-message">
            La clave de elector tiene 8 caracteres
          </p>
        )}

        <Grid className="grid-preferences">
          <Grid.Row columns={3}>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Partido Chairo", 0)}
                className={categoriesStyles[0].style}
              >
                <FontAwesomeIcon icon={faAngry} />
                <h6>Partido Chairo</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("PRIANRD", 1)}
                className={categoriesStyles[1].style}
              >
                <FontAwesomeIcon icon={faBone} />
                <h6>PRIANRD</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Fifis", 2)}
                className={categoriesStyles[2].style}
              >
                <FontAwesomeIcon icon={faGem} />
                <h6>Fifis</h6>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Conservadores", 3)}
                className={categoriesStyles[3].style}
              >
                <FontAwesomeIcon icon={faUserTie} />
                <h6>Conservadores</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Mafia del Poder", 4)}
                className={categoriesStyles[4].style}
              >
                <FontAwesomeIcon icon={faUserSecret} />

                <h6>Mafia del Poder</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Independiente", 5)}
                className={categoriesStyles[5].style}
              >
                <FontAwesomeIcon icon={faMale} />
                <h6>Independiente</h6>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column></Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Voto Nulo", 6)}
                className={categoriesStyles[6].style}
              >
                <FontAwesomeIcon icon={faBan} />
                <h6>Voto Nulo</h6>
              </Card>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default VotingScreen;
