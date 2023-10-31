import React, { Component } from "react";
import Cookies from "js-cookie";
import "/static/css/button.css";
import "/static/css/auth.css";

export default class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };
  }

  handleLogin = () => {
    const csrfToken = Cookies.get("csrftoken");

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };
    fetch("api/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        window.location.href = "/employeeData";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <div className="auth-page">
        <div className="auth-form">
          <span className="auth-header">Manager</span>

          <span
            className="auth-header"
            style={{
              fontSize: "1rem",
            }}
          >
            Login
          </span>

          <form className="form-wrapper-auth">
            <input
              className="input-field"
              type="email"
              placeholder="Your email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Your password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />

            <button
              className="form-wrapper"
              type="button"
              onClick={this.handleLogin}
            >
              Sign in
            </button>
          </form>
          <p className="auth-link">
            You don't have an account?{" "}
            <span
              style={{
                color: "#8498cf",
                fontSize: ".9rem",
                fontWeight: "bold",
              }}
            >
              <a
                href="register"
                style={{ textDecoration: "none", color: "#8498cf" }}
              >
                Register{" "}
              </a>
            </span>
          </p>
        </div>
      </div>
    );
  }
}
