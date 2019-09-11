require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	siteMetadata: {
		title: 'testing title'
	},
	plugins: [
   {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `reyapr`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
      }
   },
	 {
		 resolve: `gatsby-source-filesystem`,
		 options: {
       name: `src`,
       path: `${__dirname}/src/`,
     },
   },
	'gatsby-transformer-remark',
	'gatsby-plugin-emotion',
		{
			resolve: "gatsby-plugin-typography",
			options: {
				pathToConfigModule: "src/utils/typography"
			}				
		}
	]							
}
