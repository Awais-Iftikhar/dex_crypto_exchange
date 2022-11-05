const { expect } = require("chai");

const tokens = (value) => {
    return ethers.utils.parseEther(value.toString());
}
describe("test tokens:", () => {
    let owner,user1,user2;
    beforeEach(async() => {
        [owner, user1, user2] = await ethers.getSigners();
        let token = await ethers.getContractFactory("ERC20");
        this.contract = await token.deploy("usdt","USD",100);
        await this.contract.deployed()
    })
    it('has correct supply' , async () => {
        expect(await this.contract.totalSupply()).to.equal(tokens(100))
    })
    it('has correct name' , async () => {
        expect(await this.contract.name()).to.equal("usdt")
    })
    it('has correct symbol' , async () => {
        expect(await this.contract.symbol()).to.equal("USD")
    })

    it('transfer tokens and event check' , async() => {

        let transaction = await this.contract.transfer(user1.address,tokens(99));
        let result  = await transaction.wait()
        const [from,to,value] = result.events[0].args;
        expect(from).to.equal(owner.address);
        expect(to).to.equal(user1.address);
        expect(value).to.equal(await this.contract.balanceOf(user1.address));


    })
    // it('check approval' , async() => {

    //     let transaction = await this.contract.allowance(owner.address,user1.address);
    //     console.log(transaction);


    // })
})