const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const blogPage = await graphql(`
    {
      allPrismicBlogContents {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `)
  
  blogPage.data.allPrismicBlogContents.edges.forEach(( edge ) => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve(`src/templates/post.js`),
      context: {
        uid: edge.node.uid 
      }
    })
  })

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}

