
import React, { useRef, useState }from 'react';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const LoginPage = () => {
  const ColorButton = styled(Button)(() => ({
  color: "black",
  borderColor: "#4CA4AA",
  fontWeight: 400,
  marginBottom: 25 + `px`,
  width: 300 + `px`,
  '&:hover': {
    backgroundColor: "#4CA4AA",
    borderColor: "#4CA4AA",
    color: "white"
  },
}));

  const loginRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [isSignInForm, SetSignInForm] = useState (true)

  const loginForm = () => {
    return (
      <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">{isSignInForm ? `Sign in` : `Sign up`}</h1>
        <form className="login__form form" action="" method="POST">
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <Input inputRef={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required={true}
            fullWidth={true}
            />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <Input
            fullWidth={true}
            inputRef={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required={true}/>
          </div>
          {!isSignInForm && <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Name</label>
            <Input
            fullWidth={true}
            inputRef={nameRef} className="login__input form__input" type="text" name="user-name" placeholder="Name" required={true}/>
          </div>}
          <ColorButton
            className="login__submit form__submit button"
            type="submit"
            variant="outlined"
          >{isSignInForm ? `Sign in` : `Sign up`}</ColorButton>
        </form>
        <div>
          <p>{isSignInForm ? `New to Estart?` : `Already have an account?`}</p>
          <a href="#" onClick={() => SetSignInForm(!isSignInForm)}>{isSignInForm ? `Create an account` : `Sign in`}</a>
        </div>
      </section>
    </div>
    )
  }

  return loginForm();
}

export default LoginPage;
