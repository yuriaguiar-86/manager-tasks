import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Baseboard from './components/Baseboard/Baseboard';
import Container from './components/Layout/Container/Container';
import Navbar from './components/Navbar/Navbar';
import Company from './components/Pages/Company';
import Contact from './components/Pages/Contact';
import Home from './components/Pages/Home';
import NewProject from './components/Pages/NewProject';
import Project from './components/Pages/Project';
import Projects from './components/Pages/Projects';

function App() {
  return (
    <Router>
      <Navbar />

      <Container>
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/projects" element={ <Projects /> } />
            <Route path="/company" element={ <Company /> } />
            <Route path="/contact" element={ <Contact />} />
            <Route path="/newproject" element={ <NewProject />} />
            <Route path="/project/:id" element={ <Project />} />
        </Routes>
      </Container>

      <Baseboard />
    </Router>
  );
}

export default App;
