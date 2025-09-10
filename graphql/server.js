const app = require("./app");
// use uma env própria p/ GraphQL; default 4000
const port = process.env.GRAPHQL_PORT || process.env.PORT_GRAPHQL || 4000;

app.listen(port, () => {
  console.log(`GraphQL server running on port ${port}`);
});
