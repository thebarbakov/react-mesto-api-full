import React from "react";

class ImagePopup extends React.Component {
  render() {
    return (
      <div
        className={`popup popup_element ${
          this.props.data != null ? "popup_opened" : ""
        }`}
      >
        <figure className="popup__box-image">
          <button
            className="popup__button-close"
            type="button"
            onClick={this.props.onClose}
          ></button>
          <img
            className="popup__image"
            src={this.props.data?.link}
            alt={this.props.data?.name}
          />
          <figcaption className="popup__description">
            {this.props.data ? this.props.data.name : ""}
          </figcaption>
        </figure>
        <div className="popup__overlay" onClick={this.props.onClose}></div>
      </div>
    );
  }
}

export default ImagePopup;
