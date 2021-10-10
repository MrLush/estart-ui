import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';

const Header = ({authorizationStatus, authInfo}) => {
  const SiteMenuSettings = {
    PROJECTS: {
      title: `Projects`,
      path: `/projects`,
    },
    ABOUT_US: {
      title: `Abouts us`,
      path: `/about-us`,
    },
    CREATE_A_PROJECT: {
      title: `Create a project`,
      path: `/create-project`,
    },
    MY_PROJECTS: {
      title: `My projects`,
      path: `/my-projects `,
    }
  };
  const [activePage, setActivePage] = useState(SiteMenuSettings.ABOUT_US.title);

  return (
    <header className="header">
      <NavLink to='/about-us'><img className="header__logo" src="./img/logo.svg" width="120" height="120" alt="Logotype Estart"/></NavLink>
      <nav className="header__navigation">
        <ul className="header__navigation-list">
          {Object.values(SiteMenuSettings).map((menuItem) => (
            <li className="navigation__item" key={menuItem.title}>
              <NavLink
                onClick={() => setActivePage(menuItem.title)}
                to={menuItem.path}
                className={`navigation__link ${menuItem.title === activePage ? `navigation__link--active` : ``}`}
              >
                {menuItem.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {authorizationStatus ?
        <div className={`header__icon`}>
          <FaceIcon
            sx={{
              fontSize: 40,
              color: `#4CA4AA`,
            }}
          />
        </div> :
        <NavLink to='/login-page' className={`login__link`}>
          <div className={`login__wrapper`}>
            <LoginIcon
              className={`header__icon`}
              sx={{
              fontSize: 40,
              color: `#4CA4AA`,
            }}
            />
            <span className={`login__text`}>Log In</span>
          </div>
        </NavLink>
      }
    </header>
  );
}

const mapStateToProps = ({authorizationStatus, authInfo}) => ({
  authorizationStatus,
  authInfo,
});

export { Header };
export default connect(mapStateToProps)(Header);
