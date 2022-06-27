import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import CreateSip from './components/CreateSip';
import NotFound from './components/NotFound/NotFound';
import {useState} from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="App">
      {/* Nav Menu */}
        <Menu isLoggedIn={isLoggedIn}/>

        <Routes>
          <Route path='/' element={<Welcome setIsLoggedIn={setIsLoggedIn}/>} default />
          <Route path='/new' element={<CreateSip/>} />
          <Route path='*' element={<NotFound/>} />

        </Routes>
    </div>
  );
}

export default App;
