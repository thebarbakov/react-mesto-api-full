class Api {
  constructor(config) {
    this._urlRequest = config.urlRequest;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._urlRequest}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token || "",
      },
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._urlRequest}/cards`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token || "",
      },
    }).then((res) => this._checkResponse(res));
  }

  getInitialInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  setUserInfo(newUserInfo) {
    return fetch(`${this._urlRequest}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token || "",
      },
      body: JSON.stringify(newUserInfo),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  setUserAvatar(newAvatar) {
    return fetch(`${this._urlRequest}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token || "",
      },
      body: JSON.stringify(newAvatar),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addCard(cardData) {
    return fetch(`${this._urlRequest}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token || "",
      },
      body: JSON.stringify(cardData),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._urlRequest}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token || "",
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeLikeStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._urlRequest}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          ...this._headers,
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userData")).token ||
            "",
        },
      }).then((res) => {
        return this._checkResponse(res);
      });
    } else {
      return fetch(`${this._urlRequest}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          ...this._headers,
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userData")).token ||
            "",
        },
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  }
}

const api = new Api({
  urlRequest: "https://mesto.calsser.ru/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
