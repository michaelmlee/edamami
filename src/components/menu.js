import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Menu = () => (
  <ul
    className={"menubar"}
  >
    <li><Link
      to="/menu"
      style={{
          color: `black`,
          textDecoration: `none`,
      }}
    >Menu</Link></li>
    <li><Link
      to="/media"
      style={{
          color: `black`,
          textDecoration: `none`,
      }}
    >Media</Link></li>
    <li><Link
      to="/specials"
      style={{
          color: `black`,
          textDecoration: `none`,
      }}
    >Specials</Link></li>
    <li><Link
      to="/location"
      style={{
          color: `black`,
          textDecoration: `none`,
      }}
    >Location</Link></li>
  </ul>
)

Menu.propTypes = {
}

Menu.defaultProps = {
}

export default Menu
