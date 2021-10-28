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

async function getAll() {
    let db;
    let result;

    try {
        db = await database.getDb();
        result = await db.collection.aggregate([
               {$unwind:"$docs"},
               { "$group": { _id: "$docs",
                              name: {$first: "$docs.name"},
                              content: {$first: "$docs.content"},
                              mode: {$first: "$docs.mode"},
                              allowed_users: {$first: "$docs.allowed_users"}}}
        ]).toArray();

        console.log("RESULT", result)
    }

    finally {
        await db.client.close()
        return result
    }
}

async function newUser(email) {
    let db;
    let result;
    let allDocs;

    try {
        allDocs = await getAll();
        db = await database.getDb();

        allDocs.forEach(async (item) => {
            let filter = { email: { $eq: email } }
            const doc =  { $push: { docs: {name: item.name, content: item.content, mode: item.mode, allowed_users: item.allowed_users} } }
            if (item.allowed_users.includes(email)) {
                await db.collection.updateOne(filter, doc)
            }
        })
        .then(() => { db.client.close()})

    }

    finally {
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
                      "docs.$.allowed_users" : body.doc.allowed_users
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

async function inviteDoc() {
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
    getAll,
    newUser,
    createDoc,
    updateDoc
};
