import React from "react";
import { StartPage } from "./StartPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function SampleQuestion() {
  return (
    <div>
      <p>검사 예시</p>
      <div id="progressBar"></div>
      <p>
        직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.
      </p>
      <div id="sampleQuestion">
        <p>질문 어쩌구 저쩌구 저쩌구</p>
        <input type="radio" value="1" />
        <label>왼쪽</label>
        <input type="radio" value="2" />
        <label>오른쪽</label>
      </div>
    </div>
  );
}

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
