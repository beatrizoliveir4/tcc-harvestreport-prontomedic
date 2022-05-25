// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IPermissions {
    function onlyAdmin(address _address) external view returns (bool);
    function onlyAuthorized(address _address) external view returns (bool);
}

interface IHarvestReport {
    function pushDeployedHarvests(address _address) external; 
}

contract Harvests {
    struct BasicInfo {
        uint id;
        string crop_production;
        uint crop_weight; // kg
        string description;
    }

    struct SafetyReport {
        address sender;
        uint id;
        uint distribution_id;
        string description;
    }

    struct Distribution {
        address sender;
        uint id;
        uint crop_weight; // kg
        string crop_origin;
        string crop_destination;
        string description;
    }
    
    address public owner;
    address public access_control;
    address public harvestreport;
    BasicInfo private basic_information;
    Distribution[] private distribution;
    SafetyReport[] private safety_reports;
    
    constructor(
        address _harvestreport,
        uint _id,
        string memory _crop_production,
        uint _crop_weight,
        string memory _description
    ) {
        harvestreport = _harvestreport;
        owner = msg.sender;
        basic_information.id = _id;
        basic_information.crop_production = _crop_production;
        basic_information.crop_weight = _crop_weight;
        basic_information.description = _description;

        IHarvestReport(harvestreport).pushDeployedHarvests(address(this));
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

    function getBasicInformation() public view returns (BasicInfo memory) {
        return basic_information;
    }

    function pushDistribution(
        uint _id,
        uint _crop_weight,
        string memory _crop_origin,
        string memory _crop_destination,
        string memory _description
    ) public { 
        address sender = msg.sender;
        Distribution memory _distribution;
        _distribution = Distribution(sender, _id, _crop_weight, _crop_origin, _crop_destination, _description);
        distribution.push(_distribution);
    }

    function getDistribution() public view returns (Distribution[] memory) {
        return distribution;
    }

    function pushSafetyReport(
        uint _id,
        uint _distribution_id,
        string memory _description
    ) public { 
        address sender = msg.sender;
        SafetyReport memory _safety_reports;
        _safety_reports = SafetyReport(sender, _id, _distribution_id, _description);
        safety_reports.push(_safety_reports);
    }

    function getSafetyReport() public view returns (SafetyReport[] memory) {
        return safety_reports;
    }

    function close() public payable onlyAdmin {
        selfdestruct(payable(owner));
    }
}