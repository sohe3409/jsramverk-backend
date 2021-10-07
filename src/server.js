"use strict";

const database = require("../db/database.js");
const ObjectId = require("mongodb").ObjectId;

async function getDocs() {
    let db;
    let result;

    try {
        db = await database.getDb();
        result = await db.collection.find({}).toArray();
    }
    finally {
        await db.client.close()
        return result
    }
}

async function getDoc(id) {
    let db;
    let result;

    try {
        db = await database.getDb();
        result = await db.collection.findOne({ email: id })
    }
    finally {
        await db.client.close()
        return result
    }
}

async function updateDoc(id, body) {
      let db;

      try {
          db = await database.getDb();
          if (body.doc.allowed_users.length > 1) {
              const filter = { email: {$in: body.doc.allowed_users}, "docs.name": body.prev };

              const doc =  {
                  $set: {
                      "docs.$.name" : body.doc.name,
                      "docs.$.content" : body.doc.content,
                      // "docs.$.allowed_users" : body.doc.allowed_users
                  }
              }

              const result = await db.collection.updateMany(filter, doc);

              console.log("UPDATE ALL", result)
          } else {
              const filter = { _id: ObjectId(id), "docs.name": body.prev };

              const doc =  {
                  $set: {
                      "docs.$.name" : body.doc.name,
                      "docs.$.content" : body.doc.content,
                      "docs.$.allowed_users" : body.doc.allowed_users
                  }
              }

              const result = await db.collection.updateOne(filter, doc);
              console.log("UPDATE ONE", result)
          }
        } finally {
            await db.client.close();
        }

}



async function createDoc(id, body) {
  let db;

  try {
        db = await database.getDb();

        if (body.doc.allowed_users.length > 1) {
            const filter = { email: {$in: body.doc.allowed_users} };

            const doc =  { $push: { docs: body.doc } }

            const result = await db.collection.updateMany(filter, doc);

            console.log("CREATE ALL", result)
        } else {

            const filter = { _id: ObjectId(id) };

            const doc =  { $push: { docs: body.doc } }

            const result = await db.collection.updateOne(filter, doc);
            console.log("CREATE ONE", result)
        }
    } finally {
        await db.client.close();
    }
}


module.exports = {
    getDocs,
    getDoc,
    createDoc,
    updateDoc
};
