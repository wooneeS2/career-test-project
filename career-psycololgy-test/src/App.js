import React, { useRef, useReducer, useMemo, useCallback } from "react";
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

export const AnswerDispatch = React.createContext(null);
const initialState = {
  answers: [
    {
      id: "",
      value: "",
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "APPEND_ANSWER":
      return {
        answers: state.answers.concat(action.answer),
      };
      defualt: return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { answers } = state;
  // const [{ id, value }, onChange, onReset] = useInputs({
  //   id: "",
  //   value: "",
  // });

  // const onAppend = useCallback(() => {
  //   dispatch({
  //     type: "APPEND_ANSWER",
  //     answers: {
  //       id,
  //       value,
  //     },
  //   });
  //   onreset();
  // }, [id, value]);

  return (
    <AnswerDispatch.Provider value={dispatch}>
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
    </AnswerDispatch.Provider>
  );
}

export default App;
