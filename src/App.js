import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Bars from './Components/topBar';
import BgAnim from './Components/bgAnim';
import QuizPage from './pages/quizPage';

function App() {
  return (
    <Router>
      <div className="App">
        <BgAnim/>
        <Bars/>
        <Routes>
          <Route path="/" element={<QuizPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
