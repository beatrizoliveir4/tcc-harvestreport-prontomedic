// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Permissions {    
    address public admin;
    address[] private doctors;
    
    constructor() {
        admin = msg.sender;
    }

    function onlyAdmin(address _address) public view returns (bool) {
        if (_address == admin) {
            return true;
        } else { return false; }
    }

    function onlyDoctor(address _address) public view returns (bool) {
        uint last_index;

        last_index = doctors.length - 1;
        
        if (onlyAdmin(_address)) { return true; }

        for (uint i=0; i <= last_index; i++) {
            if (_address == doctors[i]) {
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

    function pushDoctor(address _doctor) public restricted {
        doctors.push(_doctor);
    }

    function getDoctors() public view restricted returns (address[] memory) {
        return doctors;
    }

    function close() public payable restricted {
        selfdestruct(payable(admin));
    }
}