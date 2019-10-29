const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Api Routes Access", () => {
    it("Api route Versioning", done => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it("Get to /users", (done)=>{
        chai
            .request(app)
            .get("/api/v1/users")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Welcome To Users Route");
                done();
            });
    });
    it("Get to /articles", (done)=>{
        chai
            .request(app)
            .get("/api/v1/articles")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Welcome To Articles Route");
                done();
            });
    });
    it("Get to /login", (done)=>{
        chai
            .request(app)
            .get("/api/v1/login")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Welcome To Login Route");
                done();
            });
    });
});
