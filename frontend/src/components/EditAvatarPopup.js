import React from "react";
import PopupWithForm from "./PopupWithForm.js";

class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.avatarRef = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateAvatar({ avatarUrl: this.avatarRef.current.value });
  };

  render() {
    return (
      <PopupWithForm
        name="profile-avatar"
        title="Обновить аватар"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        isLoading={this.props.isLoading}
        onSubmit={this.handleSubmit}
      >
        <label className="popup__field">
          <input
            type="url"
            className="popup__input"
            id="profile-avatar-input"
            name="avatarLink"
            placeholder="URL"
            required
            ref={this.avatarRef}
          />
          <span className="popup__input-error profile-avatar-input-error"></span>
        </label>
      </PopupWithForm>
    );
  }
}

export default EditAvatarPopup;
