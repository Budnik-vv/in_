import React from 'react'
import { createBrowserHistory } from 'history';
import {
    Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import {Navbar} from "./components/NavBar";
import NewsListPage from "./pages/NewsListPage";
import NewsPage from "./pages/NewsPage";

export const history = createBrowserHistory();

const App = () => {
    return <Router history={history}>
        <Navbar />
        <div className="App">
            <Switch>
                <Route exact path="/news">
                    <NewsListPage/>
                </Route>
                <Route path="/news/:newsId">
                    <NewsPage/>
                </Route>
                <Redirect to="/news"/>
            </Switch>
        </div>
    </Router>
}

export default App;
