import { Route, Switch, Redirect } from 'react-router-dom';

import AboutUs from './pages/AboutUs';
import CreateProject from './pages/CreateProject';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import Projects from './pages/Projects';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './App.css';


function App() {
  return (
    <div>
       <Header />
      <Main>
        <Switch>
          <Route path='/about-us'>
            <AboutUs />
          </Route>
          <Route path='/projects'>
            <Projects />
          </Route>
          <Route path='/create-project'>
            <CreateProject />
          </Route>
          <Route path='/login-page'>
            <LoginPage />
          </Route>
          <Route path='/current-project/:projectId'>
            <ProjectPage />
          </Route>
          <Route path='/'>
            <Redirect to='/about-us' />
          </Route>
        </Switch>
      </Main>
      <Footer/>
    </div>
  );
}

export default App;
