import React, { Component } from "react";
import Cookies from "js-cookie";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "/static/css/button.css";
import "/static/css/auth.css";
import PasswordStrengthBar from "react-password-strength-bar";
import zxcvbn from "zxcvbn";

export default class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleRegister = () => {
    if (zxcvbn(this.state.password).score < 2) {
      NotificationManager.warning(
        "Your password is weak. Please choose a stronger password.",
        "Warning"
      );
      return;
    }
    const csrfToken = Cookies.get("csrftoken");

    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    };

    fetch("api/register", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username: this.state.name,
        email: this.state.email,
        password: this.state.password,
        is_active: true,
        is_staff: false,
      }),
    })
      .then((response) => {
        NotificationManager.success("Registered sucessfully!", "Sucess");
        console.log("Tudo certo!");
      })
      .catch((error) => {
        NotificationManager.error(
          "Check the data you entered, especially your password!",
          "Error"
        );
        console.log(error);
      });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState({ password });
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
            Register
          </span>

          <form className="form-wrapper-auth">
            <input
              className="input-field"
              type="text"
              placeholder="Your name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
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
            <PasswordStrengthBar password={this.state.password} />
            <button
              type="button"
              className="form-wrapper"
              onClick={this.handleRegister}
            >
              Sign up
            </button>
          </form>
          <p className="auth-link">
            You do have an account?{" "}
            <span
              style={{
                color: "#8498cf",
                fontSize: ".9rem",
                fontWeight: "bold",
              }}
            >
              <a href="/" style={{ textDecoration: "none", color: "#8498cf" }}>
                Login
              </a>{" "}
            </span>
          </p>
        </div>
      </div>
    );
  }
}
