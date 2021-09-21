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


async function createDoc(body) {
  let db;

  try {
      db = await database.getDb();
      const doc = {
          name: body.name,
          content: body.content,
      };
      const result = await db.collection.insertOne(doc);
      console.log(
          `A new document with _id: ${result.insertedId} was created.`
      );
  } finally {
      await db.client.close();
  }
}


async function updateDoc(id, body) {
  let db;

  try {
        db = await database.getDb();
        const filter = { _id: ObjectId(id) };

        const doc = {
            $set: {
                name: body.name,
                content: body.content,
            },
        };

        const result = await db.collection.updateOne(filter, doc);

        if (result.matchedCount == 0) {
            console.log("No match");
        } else {
            console.log(
                `${result.matchedCount} , updated ${result.modifiedCount}`
            );
        }
    } finally {
        await db.client.close();
    }
}

module.exports = {
    getDocs,
    createDoc,
    updateDoc
};
