import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
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
      path: `/projects`,
    },
  };
  return (
    <header className="header">
      <NavLink to='/about-us'><img className="header__logo" src="./img/logo.svg" width="120" height="120" alt="Logotype Estart"/></NavLink>
      <nav className="header__navigation navigation">
        <ul className="header__navigation-list">
          {Object.values(SiteMenuSettings).map((menuItem) => (
            <li className="navigation__item" key={menuItem.title}>
              <NavLink to={menuItem.path}
                className={`navigation__link ${menuItem.title === SiteMenuSettings.ABOUT_US.title ? `navigation__link--active` : ``}`}>
                {menuItem.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// логин

export default Header;
