import React from "react";
import { StartPage } from "./StartPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SampleQuestion } from "./SampleQuestion";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Link to="/">메인화면</Link>
        </header>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route path="/sample-question" component={SampleQuestion} />
        </Switch>
      </Router>

      <footer></footer>
    </div>
  );
}

export default App;
