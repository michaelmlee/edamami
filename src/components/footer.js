import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Footer = () => (
  <footer>
    <div className="container">
      <div className="col1">
        <h3>Pages</h3>
        <ul>
          <li>
            <Link
              to="/menu"
              style={{
                color: `black`,
                textDecoration: `none`,
              }}>Menu
            </Link>
          </li>
          <li>
            <Link
              to="/media"
              style={{
                  color: `black`,
                  textDecoration: `none`,
              }}>Media
            </Link>
          </li>
          <li>
          <Link
            to="/specials"
            style={{
                color: `black`,
                textDecoration: `none`,
            }}>Specials
            </Link>
          </li>
          <li>
            <Link
              to="/location"
              style={{
                  color: `black`,
                  textDecoration: `none`,
              }}>Location
            </Link>
          </li>
        </ul>
      </div>
      <div className="col2">
        <h3>Connect With Us</h3>
        <p>social icons here</p>
      </div>
      <div className="col3">
        <h3>Location</h3>
        <p>5950 Santo Rd. Suite G<br/>
           San Diego CA, 92124</p>
      </div>
      <p>© {new Date().getFullYear()}
      {` `}
      <Link to="/">Edamami</Link></p>
    </div>
  </footer>
)

export default Footer
