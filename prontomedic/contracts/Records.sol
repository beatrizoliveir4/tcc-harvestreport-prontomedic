// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IPermissions {
    function onlyAdmin(address _address) external view returns (bool);
    function onlyDoctor(address _address) external view returns (bool);
}

interface IPatients {
    function pushRecord(address _record) external;
}

contract Records {
    struct Record {
        uint id;
        uint date;
        string description;
        address[] anex;
    }

    address public owner;
    address public access_control;
    address private patient;
    Record private record;
    
    constructor(
        address _access_control,
        address _patient,
        uint _id,
        uint _date,
        string memory _description,
        address[] memory _anex
    ) {
        access_control = _access_control;
        owner = msg.sender;
        patient = _patient;

        record.id = _id;
        record.date = _date;
        record.description = _description;
        record.anex = _anex;
        IPatients(patient).pushRecord(address(this));
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

    function setRecord(
        string memory _description,
        address[] memory _anex
    ) public onlyDoctor {
        record.description = _description;
        record.anex = _anex;
    }

    function getRecord() public onlyDoctor view returns (Record memory) {
        return record;
    }

    function close() public onlyAdmin payable {
        selfdestruct(payable(owner));
    }
}