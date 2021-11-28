import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Project from "./components/Project/Project";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";

function App() {
  return (
    <div>
      <Login />
      <Logout />
      <BrowserRouter>
        {/* <NavBar/> */}
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={About} path="/about" />
          <Route component={Project} path="/project" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
