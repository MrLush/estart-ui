import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      LOGO
      <nav>
        <NavLink to='/projects'>Projects</NavLink>
        <NavLink to='/about-us'>About Us</NavLink>
        <NavLink to='/create-project'>Create a project</NavLink>
        <NavLink to='/login-page'>Login</NavLink>
      </nav>
    </header>
  );
}

export default Header;