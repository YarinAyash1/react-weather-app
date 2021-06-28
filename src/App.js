import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage/';
import FavoritesPage from './pages/FavoritesPage/';
import { AppHeader } from './cmps/AppHeader/';
import './assets/styles/global.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/favorites" component={ FavoritesPage } />
          <Route path="/" component={ HomePage } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
