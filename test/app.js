

/* global it describe */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

const database = require("../db/database.js");
const collectionName = "docs";

chai.use(chaiHttp);

describe('app', () => {
  before(() => {
        (async (resolve) => {
            const db = await database.getDb();
                .next()
                .then(async function(info) {
                    if (info) {
                        await db.docs.drop();
                    }
                })
                .catch(function(err) {
                    console.error(err);
                })
                .finally(async function() {
                    await db.client.close();
                    resolve();
                });
        });
    });


    describe('GET /', () => {
        it('should get 200', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });


    describe('POST /create', () => {
      it('should get 201', (done) => {
           let doc = {
               name: "test",
               content: "testing"
           };

           chai.request(server)
               .post("/create/")
               .send(doc)
               .end((err, res) => {
                   res.should.have.status(201);

                   done();
               });
         });
    });



    describe('PUT /update/id', () => {
    it('should get 204', (done) => {
          let id;
          let doc = {
              name: "updated",
              content: "updating"
          };
          chai.request(server)
                .get("/list")
                .end((err, res) => {
                    id = res.body.data[0]._id;


                    chai.request(server)
                        .put(`/update/${id}`)
                        .send(doc)
                        .end((err, res) => {
                            res.should.have.status(204);
                            done();
                        });
                });
          });
    });

    describe('GET /list', () => {
           it('should return status 200 and one object', (done) => {
               chai.request(server)
                   .get("/list")
                   .end((err, res) => {
                        res.should.have.status(200);

                       done();
                   });
           });
    });
});
