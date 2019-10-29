var  request = require('request');
var base_url = "http://localhost:3000";
describe("Server can start and is working", function () {
    describe("Get /", function () {
        it('should return a 200 status code', function (done) {
            request.get(base_url, function (error, response) {
                expect(response.statusCode).toBe(200);
                done();
            })
        });
    })
});
