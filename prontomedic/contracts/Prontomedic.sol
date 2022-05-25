// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IPermissions {
    function onlyAdmin(address _address) external view returns (bool);
    function onlyDoctor(address _address) external view returns (bool);
}

contract Prontomedic{
    address[] public deployedPatients;
    address public access_control;
    
    constructor(address _access_control) {
        access_control = _access_control;
    }

    modifier onlyAdmin() {
        bool res;
        res = IPermissions(access_control).onlyAdmin(msg.sender);
        require(res);
        _;
    }

    modifier onlyDoctor() {
        bool res;
        res = IPermissions(access_control).onlyDoctor(msg.sender);
        require(res);
        _;
    }

    function pushDeployedPatients(address _patient) public {
        deployedPatients.push(_patient);
    }

    function getDeployedPatients() public view returns (address[] memory) {
        return deployedPatients;
    }

    function close() public payable onlyAdmin {
        selfdestruct(payable(msg.sender));
    }
}