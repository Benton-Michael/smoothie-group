import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import CreateSip from './components/CreateSip';
import NotFound from './components/NotFound/NotFound';
import {useState} from 'react';
import GetAllSmoothies from './components/GetAllSmoothies';
import Account from './components/Account';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="App">
      {/* Nav Menu */}
        <Menu isLoggedIn={isLoggedIn}/>

        <Routes>
          <Route path='/' element={<Welcome setIsLoggedIn={setIsLoggedIn}/>} default />
          <Route path="/all" element={<GetAllSmoothies/>} />
          <Route path='/new' element={<CreateSip />} />
          <Route path='/account' element={<Account/>} />

          <Route path='*' element={<NotFound/>} />

        </Routes>
    </div>
  );
}

export default App;
