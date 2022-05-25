// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IPermissions {
    function onlyAdmin(address _address) external view returns (bool);
    function onlyAuthorized(address _address) external view returns (bool);
}

contract HarvestReport{
    address[] public deployedHarvests;
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

    modifier onlyAuthorized() {
        bool res;
        res = IPermissions(access_control).onlyAuthorized(msg.sender);
        require(res);
        _;
    }

    function pushDeployedHarvests(address _harvest) public {
        deployedHarvests.push(_harvest);
    }

    function getDeployedHarvests() public view returns (address[] memory) {
        return deployedHarvests;
    }

    function close() public payable onlyAdmin {
        selfdestruct(payable(msg.sender));
    }
}