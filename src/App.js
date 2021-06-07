import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AppRoute from './components/AppRoute';
import routes from './Config/routes.js';
import { LocationContextProvider } from "./context";
import './styles/App.css';
import Navigation from './components/Navigation/index';
import { AuthProvider } from "./context/UserContext";

function App() {
    
  return (
    <div className="App">

        <Router>
            <LocationContextProvider>
                <AuthProvider>

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

                </AuthProvider>     
            </LocationContextProvider>
        </Router>
    </div>
  );
}

export default App;
