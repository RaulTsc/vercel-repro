const withTM = require("next-transpile-modules")(["@fullcalendar"]);

module.exports = withTM({
  serverRuntimeConfig: {
    oauth: {
      client: {
        clientId: "dbf8fc00-d7e1-11e6-be11-4df610fa68f6",
        clientSecret: "9864b910-d742-11e6-b754-976f8d441951",
      },
    },
  },
  publicRuntimeConfig: {
    corsProxyUrl: "https://cors-anywhere.herokuapp.com",
    uploadsBaseUrl: "https://s3.eu-central-1.amazonaws.com/raultom-dev",
    google: {
      mapsUrl: "https://www.google.com/maps",
      mapsApiUrl: "https://maps.googleapis.com/maps/api",
      apiKey: "AIzaSyAP04_pmK1YZzz1T-bPWmESmreNGh02PS0",
    },
    microservices: {
      prismApi: {
        baseUrl: "http://dev.usevisitor.com:2050/api/prism",
      },
      myApp: {
        baseUrl: "http://dev.usevisitor.com:2000",
      },
      heimdall: {
        baseUrl: "http://dev.usevisitor.com:9200/accounts",
      },
      templatesApi: {
        baseUrl: "http://dev.usevisitor.com:10100/api/templates",
      },
      partnerApi: {
        baseUrl: "http://dev.usevisitor.com:9700/api/partner",
      },
    },
  },
});
