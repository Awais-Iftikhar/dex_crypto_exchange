// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./ERC20.sol";
import "hardhat/console.sol";

contract exchange{
    
    event Deposit(address token, address user, uint256 amount, uint256 balance);
	event Withdraw(address token, address user, uint256 amount, uint256 balance);

    mapping (address => mapping (address => uint256)) public tokens;

    function depositToken(address _token,uint256 _amount) public {
        // console.log("deposit token",_token);
        // console.log("deposit caller",msg.sender);

       require(ERC20(_token).transferFrom(msg.sender, address(this),_amount));
       tokens[msg.sender][_token] += _amount;
       emit Deposit(_token, msg.sender, _amount, tokens[msg.sender][_token]);
    }


    function tokenName(address _token) public view returns (string memory) {
        return ERC20(_token).name();
    }

    function withDrawToken(address _token,uint256 _amount) public {
    //    require(ERC20(_token).transfer(msg.sender,_amount));
        require(tokens[msg.sender][_token] >= _amount,"not enough tokens to withdraw");
        ERC20(_token).transfer(msg.sender,_amount);
       tokens[msg.sender][_token] -= _amount;
       emit Withdraw(_token, msg.sender, _amount, tokens[msg.sender][_token]);
    }


    function balanceOf(address _token, address _user) public view returns (uint256){
        return tokens[_user][_token];
    }
}