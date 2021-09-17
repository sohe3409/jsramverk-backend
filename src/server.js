"use strict";

const MongoClient = require("mongodb").MongoClient;
const database = require("../db/database.js");
const client = new MongoClient(database.uri);
const ObjectId = require("mongodb").ObjectId;



async function getDocs() {
    let result;

    try {
        await client.connect();
        const database = client.db("editor");
        const docs = database.collection("docs");
        const cursor = docs.find();
        result = await cursor.toArray();
        console.log(result);

        if ((await cursor.count()) === 0) {
            console.log("No documents");
        }
    } finally {
        await client.close();
        return result;
    }
}

async function getDoc(id) {
    let result;

    try {
        await client.connect();
        const database = client.db("editor");
        const docs = database.collection("docs");
        const cursor = docs.find(ObjectId(id));
        result = await cursor.toArray();
        console.log(result);

        if ((await cursor.count()) === 0) {
            console.log("Not found");
        }
    } finally {
        await client.close();
        return result;
    }
}

async function createDoc(body) {
  try {
      await client.connect();
      const database = client.db("editor");
      const docs = database.collection("docs");
      const doc = {
          name: body.name,
          content: body.content,
      };
      const result = await docs.insertOne(doc);
      console.log(
          `A new document with _id: ${result.insertedId} was created.`
      );
  } finally {
      await client.close();
  }
}


async function updateDoc(id, body) {
    try {
        await client.connect();
        const db = client.db("editor");
        const docs = db.collection("docs");
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };

        const doc = {
            $set: {
                name: body.name,
                content: body.content,
            },
        };

        const result = await docs.updateOne(filter, doc);

        if (result.matchedCount == 0) {
            console.log("No match");
        } else {
            console.log(
                `${result.matchedCount} , updated ${result.modifiedCount}`
            );
        }
    } finally {
        await client.close();
    }
}

module.exports = {
    getDocs,
    getDoc,
    createDoc,
    updateDoc
};
