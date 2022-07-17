import React from "react";
import WithRouter from "./WithRouter";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidUpdate(){
    this.props.isLogged === true && this.props.router.navigate('/')
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
      <form className="autorisation" onSubmit={this.handleSubmit}>
        <h1 className="autorisation__title">Вход</h1>
        <input
          className="autorisation__input"
          value={this.state.email}
          onChange={this.handleChange}
          id="signin-email-input"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="autorisation__input"
          id="signin-password-input"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
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
          Войти
        </button>
      </form>
    );
  }
}

export default WithRouter(Login);
