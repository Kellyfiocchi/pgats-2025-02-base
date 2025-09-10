const app = require("./app");
// priorize REST_PORT; caia para PORT; default 3000
const port = process.env.REST_PORT || process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
