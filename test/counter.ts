import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Counter } from "../typechain/Counter";

chai.use(solidity);
const { expect } = chai;

describe("Counter", () => {
    let counter: Counter;
    beforeEach(async () => {
      // signer in Ethers.js is an object that represents an Ethereum account
      const signers = await ethers.getSigners();
      // ContractFactory in ethers.js is an abstraction used to deploy new smart contracts
      const counterFactory = await ethers.getContractFactory(
        "Counter",
        signers[0]
      );
      // Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract
      counter = (await counterFactory.deploy()) as Counter;
      // Once the contract is deployed, we can call our contract methods and use them to get the state of the contract
      await counter.deployed();
      const initialCount = await counter.getCount();
      // 3
      expect(initialCount).to.eq(0);
      expect(counter.address).to.properAddress;
    });
    // 4
    describe("count up", async () => {
      it("should count up", async () => {
        await counter.countUp();
        let count = await counter.getCount();
        expect(count).to.eq(1);
      });
    });
    describe("count down", async () => {
      // 5
      it("should fail", async () => {
        // this test will fail
        await counter.countDown();
      });
      it("should count down", async () => {
        await counter.countUp();
      await counter.countDown();
        const count = await counter.getCount();
        expect(count).to.eq(0);
      });
    });
  });