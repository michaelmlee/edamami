import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Menu from "./menu"
import StoreStatus from "./storeStatus/storeStatus"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `white`,
      borderBottom: '#ddd 1px solid',
    }}
  >
    <div
      className="container"
    >
      <h1 style={{ display: "inline" }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <StoreStatus />
      <Menu />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
