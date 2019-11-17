const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Test GIFS", ()=>{
    it('get all /gifs', (done)=> {
        chai
            .request(app)
            .get("/api/v1/gifs/all")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    // it('Create gifs', (done)=> {
    //
    // });
});
