import React from "react";
import ProgressTestPage from "./pages/ProgressTestPage";
import StartPage from "./pages/StartPage";
import SampleQuestionPage from "./pages/SampleQuestionPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { TestFinishPage } from "./pages/TestFinishPage";

const GoMain = () => {
  return (
    <IconButton color="primary" aria-label="add to shopping cart">
      <HomeIcon />
    </IconButton>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Link to="/">
            <GoMain />
          </Link>
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
