const mongoose = require("mongoose");
const db_Url = process.env.ATLAS_URL;
main()
  .then(() => console.log("conneted database successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/newsamarat");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// async function main() {
//   await mongoose.connect(db_Url);
// }

module.exports = mongoose.connection;
