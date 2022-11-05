
async function main() {
    const [deployer] = await ethers.getSigners();
    let token = await ethers.getContractFactory("ERC20");
        this.usd = await token.deploy("usdt","USD",10);
        await this.usd.deployed()
        // console.log('token1',this.usd.address);
        let exchange = await ethers.getContractFactory("exchange");
        this.exchangeToken = await exchange.deploy();
        await this.exchangeToken.deployed()


        console.log("usd addres",this.usd.address)
        console.log("exchange addres",this.exchangeToken.address)

        //new
        https://goerli.etherscan.io/address/0x327990a7cbf592db39a37f438d4e4457c689dee3
        // 0x8f5fAffaE2F850EE556Fb6bBFD4a9C7fB3654EfB

        old
        // usd addres 0x5BEeEa76a581c407Bb92cFbb3bFE54542b794ebe
        // exchange addres 0xa575502f788DB155efB3Fca50a592A7A4Ce2c816
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });