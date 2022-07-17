import React from "react";
import { Link } from "react-router-dom";
import WithRouter from "./WithRouter";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  componentDidUpdate() {
    this.props.isLogged === true && this.props.router.navigate("/");
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password,
    });
  };

  render() {
    return (
      <>
        <form className="autorisation" onSubmit={this.handleSubmit}>
          <h1 className="autorisation__title">Регистрация</h1>
          <input
            className="autorisation__input"
            value={this.state.email}
            onChange={this.handleChange}
            type="email"
            id="signin-email-input"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="autorisation__input"
            id="signin-password-input"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />

          <button
            className={`autorisation__button ${
              this.props.isLoading && "autorisation__buttom_disabled"
            }`}
            type="submit"
          >
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="autorisation__text">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </>
    );
  }
}

export default WithRouter(Register);
