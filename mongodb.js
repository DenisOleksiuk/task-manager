const { MongoClient, ObjectId } = require("mongodb");

const id = new ObjectId();

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Error => ", error);
    }

    const db = client.db(databaseName);

    db.collection("tasks")
      .deleteOne({ description: "Do jobs" })
      .then((res) => {
        console.log(res.deletedCount);
      })
      .catch((e) => {
        console.log(e);
      });
  }
);
