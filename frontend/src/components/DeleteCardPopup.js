import React from "react";
import PopupWithForm from "./PopupWithForm.js";

class DeleteCardPopup extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onDeleteCard();
  };

  render() {
    return (
      <PopupWithForm
        name="new-card"
        isOpen={this.props.isOpen}
        title="Вы уверены?"
        isLoading={this.props.isLoading}
        onClose={this.props.onClose}
        buttonText="Да"
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default DeleteCardPopup;
