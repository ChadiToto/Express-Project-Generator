let server = require("../index.js");
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

let id = "";

describe("Model API", () => {
  /**
   * Test the GET ALl Route
   */
  describe("GET /api/model", () => {
    it("It should get all the models", (done) => {
      chai
        .request(server)
        .get("/api/model")
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("array");
          done();
        });
    });
  });

  /**
   * Test the POST Route
   */
  describe("POST /api/model/", () => {
    it("It should create a new Model", (done) => {
      const model = { fields };
      chai
        .request(server)
        .post(`/api/model`)
        .send(model)
        .end((err, response) => {
          id = response.body.id;
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test the GET by ID Route
   */
  describe("GET /api/model/:id", () => {
    it("It should get a Model by ID", (done) => {
      chai
        .request(server)
        .get(`/api/model/${id}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test the PUT Route
   */
  describe("PUT /api/model/:id", () => {
    it("It should update the Model with id " + id, (done) => {
      const model = { fields };
      chai
        .request(server)
        .put(`/api/model/${id}`)
        .send(model)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test the DELETE Route
   */
  describe("DELETE /api/model/:id", () => {
    it("It should delete the Model with id " + id, (done) => {
      chai
        .request(server)
        .delete(`/api/model/${id}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });
});
