import './App.css';
import { Fragment } from 'react';
import Header from './components/header/header.jsx';
import KanbanPage from './pages/kanban';


function App() {
  return (
    <Fragment>
      <Header></Header>
      <KanbanPage></KanbanPage>
    </Fragment>
  );
}

export default App;
