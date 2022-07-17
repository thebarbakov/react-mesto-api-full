import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class EditProfilePopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      profileName: null,
      profileJob: null,
    };
  }

  componentDidUpdate() {
    if (
      this.state.profileName !== this.context.name &
      (this.state.profileName === null || this.state.profileName === undefined || this.props.isOpen === false)
    ) {
      this.setState({
        profileName: this.context.name,
        profileJob: this.context.about,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateUser(this.state);
  };

  render() {
    return (
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isLoading={this.props.isLoading}
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
      >
        <label className="popup__field">
          <input
            type="text"
            className="popup__input"
            id="profile-name-input"
            name="profileName"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            value={this.state.profileName ? this.state.profileName : ""}
            onChange={this.handleChange}
          />
          <span className="popup__input-error profile-name-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input"
            id="profile-job-input"
            name="profileJob"
            placeholder="Работа"
            required
            minLength="2"
            maxLength="200"
            value={this.state.profileJob ? this.state.profileJob : ""}
            onChange={this.handleChange}
          />
          <span className="popup__input-error profile-job-input-error"></span>
        </label>
      </PopupWithForm>
    );
  }
}

EditProfilePopup.contextType = CurrentUserContext;

export default EditProfilePopup;
