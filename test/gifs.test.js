const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

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
            .attach('images','./test/asset/testimage.jpeg', 'testimage.jpeg')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
