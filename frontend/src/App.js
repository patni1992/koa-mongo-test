import Header from './components/Header'
import ControllerList from './pages/Controller/ControllerList'
import {
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
          <Route path="/">
            <ControllerList />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
