import '../styles/App.css';
import Header from './Header';
import { People } from './PersonList';

function App() {
  return (
    <div className="App">
        <h1>People</h1>
      <Header />
      <People />
    </div>
  );
}

export default App;
