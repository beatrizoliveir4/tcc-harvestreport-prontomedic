// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IPermissions {
    function onlyAdmin(address _address) external view returns (bool);
    function onlyDoctor(address _address) external view returns (bool);
}

interface IProntomedic {
    function pushDeployedPatients(address _patient) external; 
}

contract Patients {
    struct BasicInfo {
        uint birthday;
        string document;
        string name;
        string sex;
        string observation;
    }

    address public owner;
    address public access_control;
    address public prontomedic;
    address[] private records;
    BasicInfo private basic_information;
    
    constructor(
        uint _birthday, 
        string memory _document,
        string memory _name,
        string memory _sex,
        string memory _observation,
        address _access_control,
        address _prontomedic
    ) {
        owner = msg.sender;

        basic_information.birthday = _birthday;
        basic_information.document = _document;
        basic_information.name = _name;
        basic_information.sex = _sex;
        basic_information.observation = _observation;
        access_control = _access_control;
        prontomedic = _prontomedic;

        IProntomedic(prontomedic).pushDeployedPatients(address(this));
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

    function setBasicInformation(
        uint _birthday,
        string memory _document, 
        string memory _name, 
        string memory _sex, 
        string memory _observation
    ) public onlyDoctor {
        basic_information.birthday = _birthday;
        basic_information.document = _document;
        basic_information.name = _name;
        basic_information.sex = _sex;
        basic_information.observation = _observation;        
    }

    function getBasicInformation() public onlyDoctor view returns (BasicInfo memory) {
        return basic_information;
    }

    function pushRecord(address _record) public { 
        records.push(_record);
    }

    function getRecords() public onlyDoctor view returns (address[] memory) {
        return records;
    }

    function close() public payable onlyAdmin {
        selfdestruct(payable(owner));
    }
}