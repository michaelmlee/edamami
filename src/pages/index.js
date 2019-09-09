import React from 'react'
import { Link } from 'gatsby'
import Header from '../components/header'
import Menu from '../components/Menu'
import Layout from '../components/layout/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import "../css/main.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Edamami" keywords={[`Edamami`, `sushi`, `San Diego`, `Tierrasanta` , `food`]} />
    <div style={{
      display: "inline-block", 
      verticalAlign: "top", 
      width: "66.66%"}}
    >
      <h2>What is Edamami?</h2>
      <p>Edamami is a family-friendly restaurant located in Tierrasanta, San Diego since 2005. We specialize in sushi and serve a variety of Japanese style cuisines. Visit our <Link to="/media">media page</Link> for images of our array of tasteful dishes. </p>
      <h2 style={{paddingTop: "16px"}}>Weekly Specials</h2>
    </div>
    <div style={{  
      display: "inline-block", 
      width: `33.33%`, 
      }}
    >
      <Image />
    </div>
  </Layout>
)

export default IndexPage
