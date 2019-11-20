import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import CompanyDetail from "./components/CompanyDetail";

function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/search" component={Search}/>
            <Route path="/companies/:id" exact component={CompanyDetail}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
