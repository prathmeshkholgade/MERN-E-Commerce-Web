const mongoose = require("mongoose");
const db_Url = process.env.ATLAS_URL;
main()
  .then(() => console.log("conneted database successfully"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(db_Url);

  // After connection, drop the 'username_1' index on the 'users' collection
  try {
    const db = mongoose.connection;
    await db.collection("users").dropIndex("username_1"); // Drop the index
    console.log("Dropped 'username_1' index successfully");
  } catch (err) {
    // Handle errors like the index not existing
    if (err.code === 27) {
      console.log("Index doesn't exist, no need to drop");
    } else {
      console.error("Error dropping index:", err.message);
    }
  }
}
// async function main() {
//   await mongoose.connect(db_Url);
// }

module.exports = mongoose.connection;
