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
    // it("Get to /auth/signin", (done)=>{
    //     chai
    //         .request(app)
    //         .get("/api/v1/auth/signin")
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             done();
    //         });
    // });

});

describe('/POST Create User', ()=>{
    it("Post to /auth/create-user to check if it validates for blank fields", (done)=>{

        let user = {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : "",
            gender : "",
            jobRole : "",
            department : "",
            address : ""
        };
        chai
            .request(app)
            .post("/api/v1/auth/create-user")
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res).to.be.a('object');
                done();
            });
    });
    it("Post to /auth/create-user to check  if user is persisted into the database", (done)=>{
        let user = {
            firstName : "test",
            lastName : "test",
            email : "test3@gmail.com",
            password : "test123",
            confirmPassword : "test123",
            gender : "male",
            jobRole : "manager",
            department : "ict",
            address : "2752"
        };
        chai
            .request(app)
            .post("/api/v1/auth/create-user")
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });


});

describe('POST /auth/signin', () => {
    it('should login a user', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: "test@gmail.com",
                password: "test123",
            })
            .end((err, res) => {
                // expect(res).to.not.throw(err);
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body.message).to.equal('Success');
                expect(res.body.data).to.have.property('userId');
                expect(res.body.data).to.have.property('token');
                done();
            });
    });
});
