import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProgressTestPage from "./pages/ProgressTestPage";
import StartPage from "./pages/StartPage";
import SampleQuestionPage from "./pages/SampleQuestionPage";
import { TestFinishPage } from "./pages/TestFinishPage";
import { HeaderComponent } from "./components/Header";
import TestResultPage from "./pages/TestResultPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />

        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route path="/sample-question" component={SampleQuestionPage} />
          <Route path="/test-progress" component={ProgressTestPage} />
          <Route path="/test-finish" component={TestFinishPage} />
          <Route path="/test-result" component={TestResultPage} />
        </Switch>
      </Router>

      <footer></footer>
    </div>
  );
}

export default App;
