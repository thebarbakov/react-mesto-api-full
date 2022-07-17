import React from "react";
import logo from "../images/logo_white.svg";
import { Routes, Route, Link } from "react-router-dom";
import WithRouter from "./WithRouter";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  openMobileMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  handleExit = () => {
    this.setState({ isMenuOpen: false })
    this.props.onSignOut()
  };

  render() {
    return (
      <>
        <div
          className={`header__menu ${
            this.state.isMenuOpen && "header__menu_active"
          }`}
        >
          <p className="header__user-info">{this.props.loggedEmail}</p>
          <Link
            to="/sign-in"
            className="header__link header__link_exit"
            onClick={this.handleExit}
          >
            Выйти
          </Link>
        </div>
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
          <Routes>
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              }
            />
            <Route
              exact
              path="/"
              element={
                <>
                  <div className="header__control">
                    <p className="header__user-info">
                      {this.props.loggedEmail}
                    </p>
                    <Link
                      to="/sign-in"
                      className="header__link header__link_exit"
                      onClick={this.props.onSignOut}
                    >
                      Выйти
                    </Link>
                  </div>
                  <div
                    className={`header__button-menu ${
                      this.state.isMenuOpen && "header__button-menu_active"
                    }`}
                    onClick={this.openMobileMenu}
                  />
                </>
              }
            />
          </Routes>
        </header>
      </>
    );
  }
}

export default WithRouter(Header);
