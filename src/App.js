import './App.css';
import Gallery from './Components/Gallery/Gallery';
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login />} />
        <Route path='/Home' element={ <Gallery />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
