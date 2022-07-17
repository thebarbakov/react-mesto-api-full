import React from "react";

class PopupWithForm extends React.Component {
  render() {
    return (
      <div
        className={`popup popup_${this.props.name} ${
          this.props.isOpen && this.props.isOpen !== null ? "popup_opened" : ""
        }`}
      >
        <div className="popup__container">
          <button
            className="popup__button-close"
            type="button"
            onClick={this.props.onClose}
          ></button>
          <h2 className="popup__title">{this.props.title}</h2>

          <form
            className="popup__form"
            name={this.props.name}
            onSubmit={this.props.onSubmit}
          >
            <fieldset className="popup__set">
              {this.props.children}
              <button
                type="submit"
                className={`popup__button-save ${
                  this.props.isLoading & this.props.isOpen &&
                  "popup__button-save_disabled"
                }`}
              >
                {this.props.isLoading & this.props.isOpen
                  ? "Сохранение..."
                  : this.props.buttonText
                  ? this.props.buttonText
                  : "Сохранить"}
              </button>
            </fieldset>
          </form>
        </div>
        <div className="popup__overlay" onClick={this.props.onClose}></div>
      </div>
    );
  }
}

export default PopupWithForm;
