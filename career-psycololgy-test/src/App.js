import React, { useRef, useReducer, useMemo, useCallback } from "react";
import ProgressTestPage from "./pages/ProgressTestPage";
import StartPage from "./pages/StartPage";
import SampleQuestionPage from "./pages/SampleQuestionPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { TestFinishPage } from "./pages/TestFinishPage";
import { HeaderCompo } from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <HeaderCompo />
        </header>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route path="/sample-question" component={SampleQuestionPage} />
          <Route path="/test-progress" component={ProgressTestPage} />
          <Route path="/test-finish" component={TestFinishPage} />
        </Switch>
      </Router>

      <footer></footer>
    </div>
  );
}

export default App;
