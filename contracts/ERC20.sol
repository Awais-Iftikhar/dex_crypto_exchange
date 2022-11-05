//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;
import "./IERC20.sol";
import "./MetaData.sol";
import "hardhat/console.sol";

contract ERC20 is IERC20, MetaData{
    string public token_name;
    string public token_symbol;
    uint256 public token_decimals  = 18;
    uint256 public totalSupply;
        
    address public owner;
    mapping (address => uint256) balances;
    mapping(address => mapping(address => uint256)) private _allowance;

    constructor(
    string memory _name, 
    string memory _symbol,
    uint256 _totalSupply
    ){
        totalSupply  = _totalSupply * (10**token_decimals);
        token_name = _name;
        token_symbol = _symbol;
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }
    function name() public view override returns(string memory){
        return token_name;
    }

    function symbol() public view override returns(string memory){
        return token_symbol;
    }

     function decimals() public view override returns(uint256){
        return token_decimals;
    }
    function transfer(address _to, uint256 _amount) external override returns (bool){
        //  console.log(balances[msg.sender]);
        // console.log("caller",msg.sender);
        //         console.log("to",_to);

        require((balances[msg.sender] >= _amount), 'Not enough tokens');
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }

    function balanceOf(address _account) external view override returns(uint256){
        return balances[_account];
    }

    function approve(address _spender,uint256 _amount) external override returns(bool){
        require(balances[msg.sender] >= _amount,"insufficient amount for approval");
        _allowance[msg.sender][_spender] += _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }
    function allowance(address _owner, address _spender) external override view returns (uint256){
        return _allowance[_owner][_spender];
    }

    function transferFrom(address _from, address _to, uint256 _amount) external override returns (bool){
        // console.log('from',_from);

        // console.log(_to);
        // console.log(msg.sender);
        // console.log(balances[_from]);
        //  console.log(_amount);

        require(balances[_from] >= _amount,"insufficient amount");
        require(_allowance[_from][_to] >= _amount,"insufficient allowance");

        _allowance[_from][_to] -= _amount;
        // console.log("from address",_from);
        balances[_from] -= _amount;
        balances[_to] += _amount;
        // console.log("to address",_to);
        emit Transfer(msg.sender,_to,_amount);
        return true;
    }

    modifier isOwner() {
        require(msg.sender == owner,"not an owner");
        _;
    }

    function changeSupply(uint256 _totalSupply) public isOwner {
        totalSupply = _totalSupply * (10**token_decimals);
    }
    
    function changeOwner(address _newOwner) public isOwner {
        owner = _newOwner;
    }
    function getOwner() external view returns (address) {
        return owner;
    }


}