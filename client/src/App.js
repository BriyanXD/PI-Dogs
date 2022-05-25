import "./App.css";
import { Route } from "react-router-dom";

import Landing from "./components/Landing";
import Cards from "./components/Cards";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Landing} exact />
      <Route path="/home" component={Cards} exact />
    </div>
  );
}

export default App;
