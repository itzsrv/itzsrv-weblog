module.exports = {
  siteMetadata: {
    siteTitle: 'Saurav Singh',
    siteDescription: 'Personal Blog',
    siteImage: '/banner.png', // main image of the site for metadata
    siteUrl: 'https://itzsrv.com/',
    pathPrefix: '/',
    siteLanguage: 'en',
    ogLanguage: `en_US`,
    author: 'Saurav Singh', // author name
    authorDescription: 'software engineer by day, open source contributor by night', // short text about the author
    avatar: '/avatar.jpg',
    twitterSite: '', // website account on twitter
    twitterCreator: '', // creator account on twitter
    social: [
      {
        icon: `at`,
        url: `mailto:hello@itzsrv.com`
      },
      {
        icon: `twitter`,
        url: `https://twitter.com/itzsrv`
      },
      {
        icon: `github`,
        url: `https://github.com/itzsrv`
      },
      {
        icon: `instagram`,
        url: `https://instagram.com/itzsrv`
      },
      {
        icon: `linkedin`,
        url: `https://www.linkedin.com/in/itzsrv`
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chronoblog',
      options: {
        uiText: {
          // ui text fot translate
          feedShowMoreButton: 'show more',
          feedSearchPlaceholder: 'search',
          cardReadMoreButton: 'read more →',
          allTagsButton: 'all tags'
        },
        feedItems: {
          // global settings for feed items
          limit: 50,
          yearSeparator: true,
          yearSeparatorSkipFirst: true,
          contentTypes: {
            links: {
              beforeTitle: '🔗 '
            }
          }
        },
        feedSearch: {
          symbol: '🔍'
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chronoblog Gatsby Theme`,
        short_name: `Chronoblog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#3a5f7d`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: 'UA-XXXXXXXXX-X'
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `itzsrv`
      }
    }
  ]
};
