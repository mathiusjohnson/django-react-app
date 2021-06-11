import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AppRoute from './components/AppRoute';
import routes from './Config/routes.js';
import { LocationContextProvider } from "./context";
import './styles/App.css';
import Navigation from './components/Navigation/index';
import { AuthProvider } from "./context/UserContext";
import { createClient, Provider } from 'urql';
import { getToken } from './token';

const client = createClient({
  url: 'http://127.0.0.1:8000/graphql/',
  fetchOptions: () => {
    const token = getToken();
    return {
        mode: "cors",
        credentials: 'same-origin',
        contentType: 'application/json',
        headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

function App() {
    
  return (
    <div className="App">
        <Provider value={client}>
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
        </Provider>
    </div>
  );
}

export default App;
