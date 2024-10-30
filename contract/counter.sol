// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract BIT_KCA {
    //Declaring the state variable
    uint256 number;
    string public message;

    //Constructors
    constructor(uint256 _startingPoint, string memory _startingMessage){
        number = _startingPoint;
        message = _startingMessage;
    }

    //Reading Function
    function getNumber() external view returns(uint256) {
        return number;
    }

    //Writing Functions
    //Increasing the Number by 1
    function increaseNumber() external {
        number++;
    }

    //Decreasing the Number by 1
    function decreaseNumber() external {
        number--;
    }

    //Function to update the message
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

}