import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DisplayAddress from './components/DisplayAddress';
import Login from './components/Login';
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/displayAddress" element={<DisplayAddress />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
