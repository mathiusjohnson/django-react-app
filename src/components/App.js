import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AppRoute from './AppRoute';
import routes from '../Config/routes.js';
import '../styles/App.css';
import Header from './Header';
import { People } from './PersonList';
import Navigation from './Navigation/index';

function App() {
  return (
    <div className="App">
        <Router>
        <Navigation />
        <Switch>
              <Route exact path = '/'
                render={() => {
                  return (
                    <Redirect to ="/home"/>
                  )
                }} />
              {routes.map((route) => (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))}
            </Switch>

        </Router>
    </div>
  );
}

export default App;
