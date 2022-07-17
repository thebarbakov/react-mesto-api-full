class ApiAuth {
    constructor(config){
        this._urlRequest = config.urlRequest
        this._headers = config.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    }

    registerUser({email, password}){
        return fetch(`${this._urlRequest}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ password, email})
        })
        .then( res => this._checkResponse(res))
    }

    loginUser({email, password}){
        return fetch(`${this._urlRequest}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ password, email})
        })
        .then( res => this._checkResponse(res))
    }

    verifyUserInfo(){
        return fetch(`${this._urlRequest}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("userData")).token || "",
            }
        })
        .then( res => this._checkResponse(res))
    }
    
}

const apiAuth = new ApiAuth(
    {
        urlRequest: 'https://mesto.calsser.ru/api',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

export default apiAuth