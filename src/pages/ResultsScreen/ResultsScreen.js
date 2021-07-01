import "./ResultsScreen.scss";
import { Button } from "semantic-ui-react";
import { Pie } from "react-chartjs-2";

const ResultsScreen = ({ setItVoted, chain }) => {
  const data = {
    labels: [
      "Partido Chairo",
      "PRIANRD",
      "Fifis",
      "Conservadores",
      "Mafia del Poder",
      "Independiente",
      "Voto Nulo",
    ],
    datasets: [
      {
        label: "# de Votos",
        data: chain.getResults(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(11, 11, 11, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(11, 11, 11, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="results">
      <h2>Resultados actuales</h2>
      <Button onClick={() => setItVoted(false)} className="go-back-button">
        Volver a pantalla de voto
      </Button>

      <div className="chart-containter">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ResultsScreen;
