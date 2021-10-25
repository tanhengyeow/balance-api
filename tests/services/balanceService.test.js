const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

const balanceService = require("../../services/balanceService");
const helpers = require("../../services/helpers/getCurrencyPrice");

const { expect } = chai;

chai.use(chaiHttp);

describe("balanceService", () => {
  const testUser = {
    id: "1001",
    assets: {
      btc: "0.5",
      eth: "2",
    },
  };

  describe("getAssetsBalance success", () => {
    beforeEach(() => {
      const lastPrices = {
        btc: 60000,
        eth: 3000,
      };
      const stub = sinon.stub(helpers, "getCurrencyPrice");
      stub
        .withArgs(testUser.assets.btc, "btc")
        .returns(Promise.resolve(lastPrices.btc * testUser.assets.btc));
      stub
        .withArgs(testUser.assets.eth, "eth")
        .returns(Promise.resolve(lastPrices.eth * testUser.assets.eth));
    });

    after(() => {
      sinon.restore();
    });

    it("should return correct assets balance", async () => {
      expect(await balanceService.getAssetsBalance(testUser.assets)).to.equal(
        36000
      );
    });
  });

  describe("getAssetsBalance failure", () => {
    beforeEach(() => {
      sinon.stub(helpers, "getCurrencyPrice").returns(Promise.reject());
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should throw an error when there is an error fetching balances", async () => {
      try {
        await balanceService.getAssetsBalance(testUser.assets);
      } catch (e) {
        expect(e.message).to.be.equal("Error fetching balances");
      }
    });
  });
});
