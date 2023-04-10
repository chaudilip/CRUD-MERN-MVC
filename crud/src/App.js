import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import ShowStudent from './ShowStudent';
import InputData from './InputData';
import Home from './css/Home';
import EditStudent from './EditStudent';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/addStudent" element={<InputData />} />
        <Route path="/students/getAll" element={<ShowStudent />} />
        <Route path="/students/:id" element={<EditStudent/>} />
      </Routes>
    </Router>     
  );
}

export default App;
