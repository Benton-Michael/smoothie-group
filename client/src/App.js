import './App.css';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import CreateSip from './components/CreateSip';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      {/* Nav Menu */}
        <Menu />

        <Routes>
          <Route path='/' element={<Welcome/>} default />
          <Route path='/new' element={<CreateSip/>} />
          <Route path='*' element={<NotFound/>} />

        </Routes>
    </div>
  );
}

export default App;
