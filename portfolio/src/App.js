import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Project from "./components/Project/Project";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Switch>
        <Route component={Home} path='/' exact/>
        <Route component={About} path='/about'/>
        <Route component={Project} path='/project'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
