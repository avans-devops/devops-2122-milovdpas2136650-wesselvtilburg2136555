const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    client: client,
    getDb: async function () {
        return new Promise((resolve, reject) => {
            if (!dbConnection) {
                console.log('Opening connection');
                client.connect(function (err, db) {
                    if (err || !db) {
                        reject(err);
                    }

                    dbConnection = db.db("myapp");
                    console.log("Successfully connected to MongoDB.");

                    resolve(dbConnection);
                });
            } else {
                resolve(dbConnection);
            }
        });
    }
};