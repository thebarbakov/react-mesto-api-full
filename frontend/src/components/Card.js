import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

class Card extends React.Component {
  static contextType = CurrentUserContext;

  handleCardClick = () => {
    this.props.onClickImage(this.props.card);
  };

  handleLikeClick = () => {
    this.props.onLikeCard(this.props.card);
  };
  handleDeleteClick = () => {
    this.props.onDeleteCard(this.props.card);
  };

  render() {
    const isOwn = this.props.card.owner._id === this.context._id;
    const isLiked = this.props.card.likes.some(
      (cardLikers) => cardLikers._id === this.context._id
    );
    return (
      <div className="element">
        <img
          className="element__image"
          src={this.props.card.link}
          alt={this.props.card.name}
          onClick={this.handleCardClick}
        />
        <div className="element__description">
          <p className="element__title">{this.props.card.name}</p>
          <div className="element__like">
            <button
              className={`like__button ${isLiked && "like__button_active"}`}
              type="button"
              onClick={this.handleLikeClick}
            ></button>
            <p className="like__counter">{this.props.card.likes.length}</p>
          </div>
        </div>
        <button
          className={`element__delete ${!isOwn && "element__delete_hidden"}`}
          type="button"
          onClick={this.handleDeleteClick}
        ></button>
      </div>
    );
  }
}

export default Card;
