import React from "react";
import PopupWithForm from "./PopupWithForm.js";

class AddPlacePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardName: "",
      cardLink: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddPlace({
      name: this.state.cardName,
      link: this.state.cardLink,
    })
    .then(() => this.setState({ cardName: "", cardLink: "",}))
    .catch((rej) => console.log('Error: ' + rej))
  };

  render() {
    return (
      <PopupWithForm
        name="new-card"
        title="Новое место"
        isLoading={this.props.isLoading}
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
      >
        <label className="popup__field">
          <input
            type="text"
            className="popup__input"
            id="card-name-input"
            name="cardName"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            onChange={this.handleChange}
            value={this.state.cardName}
          />
          <span className="popup__input-error card-name-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            className="popup__input"
            id="card-link-input"
            name="cardLink"
            placeholder="Ссылка на картинку"
            required
            onChange={this.handleChange}
            value={this.state.cardLink}
          />
          <span className="popup__input-error card-link-input-error"></span>
        </label>
      </PopupWithForm>
    );
  }
}

export default AddPlacePopup;
