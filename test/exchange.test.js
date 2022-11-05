
const { expect, use } = require("chai");

const tokens = (value) => {
    return ethers.utils.parseEther(value.toString());
}
describe.only("test cases:", () => {
    let owner,user1,user2;
    beforeEach(async() => {
        [owner, user1, user2] = await ethers.getSigners();
        let token = await ethers.getContractFactory("ERC20");
        this.usd = await token.deploy("usdt","USD",10);
        await this.usd.deployed()
        // console.log('token1',this.usd.address);
        let exchange = await ethers.getContractFactory("exchange");
        this.exchangeToken = await exchange.deploy();
        await this.exchangeToken.deployed()
        // console.log('token2',this.exchangeToken.address);
        // console.log('owner',owner.address);

    })

    it('has correct supply' , async () => {
        expect(await this.usd.totalSupply()).to.equal(tokens(10))
    })
    it('has correct name' , async () => {
        expect(await this.usd.name()).to.equal("usdt")
    })
    it('has correct symbol' , async () => {
        expect(await this.usd.symbol()).to.equal("USD")
    })

    it('transfer tokens and event check' , async() => {

        let transaction = await this.usd.transfer(user1.address,tokens(5));
        let result  = await transaction.wait()
        const [from,to,value] = result.events[0].args;
        expect(from).to.equal(owner.address);
        expect(to).to.equal(user1.address);
        expect(value).to.equal(await this.usd.balanceOf(user1.address));


    })


    it('deposit tokens' , async() => {
        await this.usd.approve(this.exchangeToken.address,tokens(5));
        expect(await this.usd.allowance(owner.address,this.exchangeToken.address)).to.equal(tokens(5));

        let transaction = await this.exchangeToken.depositToken(this.usd.address,tokens(5));
        await transaction.wait()
        expect(await this.exchangeToken.balanceOf(this.usd.address,owner.address)).to.equal(tokens(5));

        console.log(await this.exchangeToken.balanceOf(this.usd.address,owner.address))

    })
    
 
    // it('check approval' , async() => {
    //     console.log(await this.usd.allowance(owner.address,this.exchangeToken.address));

    //     let allowance = await this.usd.approve(this.exchangeToken.address,tokens(1));
    //     let result = await allowance.wait();
    //     console.log( result.events[0].args);

    //    console.log(await this.usd.allowance(owner.address,this.exchangeToken.address));
        


    // })
    it('Deposit and withdraw tokens' , async() => {
        console.log("usd balance",await this.usd.balanceOf(owner.address))
        //  // console.log(await this.exchangeToken.tokens());
        // console.log("initial token balance",await this.exchangeToken.balanceOf(this.usd.address,owner.address));
        await this.usd.approve(this.exchangeToken.address,tokens(5));
         let deposit = await this.exchangeToken.depositToken(this.usd.address,tokens(5));
        let result1  = await deposit.wait()
        // const [from,to,value] = result1.events;
        // console.log(result1.events[1].args)
        // console.log("token balance after deposit",await this.exchangeToken.balanceOf(this.usd.address,owner.address));
        // console.log("usd balance after deposit",await this.usd.balanceOf(owner.address));

        await this.exchangeToken.withDrawToken(this.usd.address,tokens(5));
        // console.log("token balance after withdraw",await this.exchangeToken.balanceOf(this.usd.address,owner.address));
        // console.log("usd balance after withdraw",await this.usd.balanceOf(owner.address));

        // let result = await transaction.wait()
        // console.log(await this.usd.balanceOf(owner.address))



    })
    it('failed to deposit' , async() => {
        await  expect( this.exchangeToken.connect(user1).depositToken(this.usd.address,tokens(60))).to.be.revertedWith("insufficient amount");
    })

    it('Failed to withdraw' , async() => {
        await expect(this.exchangeToken.withDrawToken(this.usd.address,tokens(60))).to.be.revertedWith("not enough tokens to withdraw");
    })

    // it('Approval' , async() => {
    //     await this.usd.approve(this.exchangeToken.address,tokens(2));
    //     // console.log(await this.usd.allowance(owner.address,this.exchangeToken.address));
    //     // let approve = await this.usd.approve(this.exchangeToken.address,tokens(2));
    //     // let result = await approve.wait();
    //     // console.log( result.events[0].args);
    //     await this.exchangeToken.depositToken(this.usd.address,tokens(1));
    //     // console.log(await this.usd.allowance(owner.address,this.exchangeToken.address));
    //     // await this.exchangeToken.depositToken(this.usd.address,tokens(2));

    //     // await this.exchangeToken.depositToken(this.usd.address,tokens(1));

    // })

    it('fail to deposit because insufficient allowance' , async() => {
        // console.log(await this.usd.balanceOf(user1.address))
        // await this.usd.transfer(user1.address,tokens(1));
        // console.log(await this.usd.balanceOf(user1.address))

        // await this.usd.connect(user1).approve(this.exchangeToken.address,tokens(1));
        // console.log(await this.usd.allowance(user1.address,this.exchangeToken.address));


        // await expect(this.exchangeToken.connect(user1).depositToken(this.usd.address,tokens(1))).to.be.revertedWith("insufficient allowance");
        await expect(this.exchangeToken.depositToken(this.usd.address,tokens(5))).to.be.revertedWith("insufficient allowance");

    })

    it('check owner' , async() => {
        // console.log(await this.usd.balanceOf(user1.address))
        // await this.usd.transfer(user1.address,tokens(1));
        // console.log(await this.usd.balanceOf(user1.address))

        // await this.usd.connect(user1).approve(this.exchangeToken.address,tokens(1));
        // console.log(await this.usd.allowance(user1.address,this.exchangeToken.address));


        // await expect(this.exchangeToken.connect(user1).depositToken(this.usd.address,tokens(1))).to.be.revertedWith("insufficient allowance");
        expect (await this.usd.getOwner()).to.be.equals(owner.address);

    })
    
})