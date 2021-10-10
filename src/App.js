import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import AboutUs from './pages/AboutUs';
import CreateProject from './pages/CreateProject';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import Projects from './pages/Projects';
import EditProject from './pages/EditProject';
import MyProjects from './pages/MyProjects';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute';
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
            <PrivateRoute exact
              path='/create-project'
              render={() => <CreateProject />}>
            </PrivateRoute>
            <Route path='/login-page'>
              <LoginPage />
            </Route>
            <Route path='/current-project/:projectId'>
              <ProjectPage />
            </Route>
            <Route path='/edit-project/:projectId'>
              <EditProject />
            </Route>
            <Route path='/my-projects'>
              <MyProjects />
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
