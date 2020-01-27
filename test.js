const supertest = require("supertest");
const app = require("./index");

// testing with valid post request
describe("POST /", () => {
    it("it shoud return text analyze and status code 200", done => {
        supertest(app)
            .post("/analyze")
            .send({ "text": "hello 2 times  " })
            .expect(200)
            .expect({ "textLength": { "withSpaces": 15, "withoutSpaces": 11 }, "wordCount": 3, "characterCount": [{ "e": 2 }, { "h": 1 }, { "i": 1 }, { "l": 2 }, { "m": 1 }, { "o": 1 }, { "s": 1 }, { "t": 1 }] })
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
});

// testing with empty text
describe("POST /", () => {
    it("it shoud return text analyze and status code 200", done => {
        supertest(app)
            .post("/analyze")
            .send({ "text": "" })
            .expect(200)
            .expect({"textLength":{"withSpaces":0,"withoutSpaces":0},"wordCount":0,"characterCount":[]})
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
});


// testing with invalid post request, client error
describe("POST /", () => {
    it("it shoud return invalid request for unsupported input and status code 400", done => {
        supertest(app)
            .post("/analyze")
            .send({ "text": 2 })
            .expect(400)
            .expect({
                error: {
                    message: 'Invalid request. Please check you have valid request. Only (POST) json data of {"text":"your text"} is supported.'
                }
            })
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
});

// testing for any unhandled paths
describe("POST /", () => {
    it("it shoud return invalid URL for any unhandled paths and status code 501", done => {
        supertest(app)
            .post("/example")
            .send({ "text": 2 })
            .expect(501)
            .expect({ error: { message: 'Please check you have the correct URL.' } })
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
});

describe("GET /", function () {
    it("it shoud return invalid URL for any unhandled paths and status code 501", done => {
        supertest(app)
            .get("/")
            .expect(501)
            .expect({ error: { message: 'Please check you have the correct URL.' } })
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
});