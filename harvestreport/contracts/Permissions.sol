// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Permissions {    
    address public admin;
    address[] private authorized;
    
    constructor() {
        admin = msg.sender;
    }

    function onlyAdmin(address _address) public view returns (bool) {
        if (_address == admin) {
            return true;
        } else { return false; }
    }

    function onlyAuthorized(address _address) public view returns (bool) {
        uint last_index;

        last_index = authorized.length - 1;
        
        if (onlyAdmin(_address)) { return true; }

        for (uint i=0; i <= last_index; i++) {
            if (_address == authorized[i]) {
                return true;
            } else if (i == last_index) {
                return false;
            }
        }
    }

    modifier restricted () {
        require(onlyAdmin(msg.sender));
        _;
    }

    function pushAuthorized(address _authorized) public restricted {
        authorized.push(_authorized);
    }

    function getAuthorized() public view restricted returns (address[] memory) {
        return authorized;
    }

    function close() public payable restricted {
        selfdestruct(payable(admin));
    }
}