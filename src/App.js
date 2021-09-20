import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";

import NotesPage from './layouts/NotesPage';

function App() {
  return (

      <Switch>
        <Route path="/notespage"><NotesPage /></Route>
        <Redirect from="*" to="/notespage" />
      </Switch>
  );
}

export default App;