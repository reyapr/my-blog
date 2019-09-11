import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"

const Page = ({ data: { prismicBlogContents } }) => {
  const { data } = prismicBlogContents
  return(
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: data.title.html }}/>
      <div dangerouslySetInnerHTML={{ __html: data.content.html }}/>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query PostBySlug($uid: String!){
    prismicBlogContents(uid: { eq: $uid }) {
      data {
        content {
          html
        }
        title {
          html
        }
      }
    }
  }   
`
