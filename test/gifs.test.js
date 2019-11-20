const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const DBQuery = require('../actions/Gifs');
const uuid = require('uuid/v4');

chai.use(require('chai-json'));
const fs = require('fs');
const { expect } = chai;
chai.use(chaiHttp);

describe("Test GIFS", ()=>{
    it('get all /gifs', (done)=> {
        chai
            .request(app)
            .get("/api/v1/gifs")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Create gifs', (done)=> {
              chai
            .request(app)
            .post("/api/v1/gifs")
            .attach('image',fs.readFileSync('./test/asset/testimage.jpeg'), 'testimage.jpeg')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    }).timeout(50000);

    // Test not to get single gif record
    it("should not get a single student record", (done) => {
        const id = 5;
        chai.request(app)
            .get(`/api/v1/gifs/${id}`)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.error).to.be.an('error');
                done();
            });
    });
    // Test to get single gif record
    it('get One /gif/:ID', (done)=> {
            const data = {
                id: uuid(),
                gifname: "testimage.jpeg1574249796452",
                imageurl: "http://res.cloudinary.com/dxruj63n4/image/upload/v1574249801/f6huhffkzhek4zqolxsz.jpg",
                userid: "ffb41909-955e-4aba-be3e-a4432ddb02c3",
                created_at: "2019-11-20T08:36:41.000Z",
                modified_at: "2019-11-20T08:36:41.806Z"
            };
                const { id, gifname, imageurl,userid,created_at,modified_at } = data;
                DBQuery.createGif(id, gifname, imageurl,userid,created_at,modified_at).then((result)=>{
                let id = result.rows[0].id;
                // start the test
            chai
                .request(app)
                .get(`/api/v1/gifs/${id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.a('object');
                    done();
                });
            }
        );
    });
});
