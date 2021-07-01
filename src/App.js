import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import VotingScreen from "./pages/VotingScreen";
import ResultsScreen from "./pages/ResultsScreen";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { chain } from "./utils/blokchain";

function App() {
  const [itVoted, setItVoted] = useState(false);
  console.log(JSON.stringify(chain, null, 2));

  return (
    <div className="App">
      <h1 className="title">Sistema de votación descentralizado</h1>
      {!itVoted ? (
        <VotingScreen setItVoted={setItVoted} chain={chain} />
      ) : (
        <ResultsScreen setItVoted={setItVoted} chain={chain} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnHover
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
}

export default App;
