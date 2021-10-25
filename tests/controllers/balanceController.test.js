const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

const app = require("../../index");
const balanceService = require("../../services/balanceService");

const { expect } = chai;

chai.use(chaiHttp);

describe("balanceController", () => {
  const testUser = {
    id: "1001",
    assets: {
      btc: "0.5",
      eth: "1",
    },
  };

  describe("getTotalBalance success", () => {
    beforeEach(() => {
      sinon
        .stub(balanceService, "getUserBalance")
        .returns(Promise.resolve(testUser));
      sinon
        .stub(balanceService, "getAssetsBalance")
        .returns(Promise.resolve(30000));
    });

    after(() => {
      sinon.restore();
    });

    it("should return correct total balance for test user", async () => {
      const id = "1001";
      let res = await chai.request(app).get(`/balances/${id}`);
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("totalBalance");
      expect(res.body).to.deep.equal({ totalBalance: 30000 });
    });
  });

  describe("getTotalBalance failure", () => {
    const id = "2000";

    afterEach(() => {
      sinon.restore();
    });

    it("should throw an error for invalid user", async () => {
      sinon
        .stub(balanceService, "getUserBalance")
        .throws(new Error(`User ${id} not found`));
      let res = await chai.request(app).get(`/balances/${id}`);
      expect(res.status).to.be.equal(400);
      expect(res.error).to.have.property("text");
      expect(res.error.text).to.be.equal(`User ${id} not found`);
    });

    it("should throw an error when there is an error fetching balances", async () => {
      sinon
        .stub(balanceService, "getUserBalance")
        .returns(Promise.resolve(testUser));
      sinon
        .stub(balanceService, "getAssetsBalance")
        .throws(new Error("Error fetching balances"));
      let res = await chai.request(app).get(`/balances/${id}`);
      expect(res.status).to.be.equal(400);
      expect(res.error).to.have.property("text");
      expect(res.error.text).to.be.equal("Error fetching balances");
    });
  });
});
