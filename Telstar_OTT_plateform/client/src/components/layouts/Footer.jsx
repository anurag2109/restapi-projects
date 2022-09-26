import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="page-footer font-small blue">
          <div className="footer-copyright text-center py-3">
            © {new Date().getFullYear()} Copyright:
            <a href="/"> MDBootstrap.com</a>
          </div>
        </footer>
      </div>
    );
  }
}
