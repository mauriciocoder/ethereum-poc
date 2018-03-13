pragma solidity ^0.4.20;


contract Inbox {

    string public message;

    function Inbox(string m) public {
        setMessage(m);
    }

    function setMessage(string m) public {
        message = m;
    }

    function getMessage() public view returns (string) {
        return message;
    }
}
