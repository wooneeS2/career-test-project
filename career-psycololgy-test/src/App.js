import React from "react";
import ProgressTest from "./pages/ProgressTest";
import StartPage from "./pages/StartPage";
import SampleQuestion from "./pages/SampleQuestion";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PaginatedQuestions from "./components/QuestionPagination";

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
          <Route path="/sample-question" component={SampleQuestion} />
          <Route path="/test-progress" component={ProgressTest} />
          <Route path="/test" component={PaginatedQuestions} />
        </Switch>
      </Router>

      <footer></footer>
    </div>
  );
}

export default App;
