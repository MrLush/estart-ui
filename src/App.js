import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import AboutUs from './pages/AboutUs';
import CreateProject from './pages/CreateProject';
import LoginPage from './pages/Login/LoginPage';
import ProjectPage from './pages/ProjectPage';
import Projects from './pages/Projects';

import Footer from './components/Footer/Footer';
import Main from './components/Main';
import './scss/app.scss';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
