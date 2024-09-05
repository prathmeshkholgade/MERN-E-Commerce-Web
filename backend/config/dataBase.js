const mongoose = require("mongoose");
const db_Url = process.env.ATLAS_URL;
main()
  .then(() => console.log("conneted database successfully"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(db_Url);
}

module.exports = mongoose.connection;
