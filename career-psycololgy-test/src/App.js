import React from "react";
import ProgressTest from "./pages/ProgressTest";
import StartPage from "./pages/StartPage";
import SampleQuestion from "./pages/SampleQuestion";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Link to="/">메인화면가기</Link>
        </header>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route path="/sample-question" component={SampleQuestion} />
          <Route path="/test-progress" component={ProgressTest} />
        </Switch>
      </Router>

      <footer></footer>
    </div>
  );
}

export default App;
