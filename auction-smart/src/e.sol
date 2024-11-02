// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

contract PRH {
    struct hospital {
        uint hId;
        string hospitalName;
        string imgUrl;
        uint nRecords;
        string manager;
        string phone;
        string email;
        user[] users;
    }
    
    struct user {
        address h_address;
        address u_address;
        uint userId;
        record[] records;
    }
    
    struct record {
        uint rId;
        string date;
        string expiry;
        string recordUrl;
        string r_status;
    }
    
    address owner;
    uint public hId = 0;
    uint public userId = 0;
    uint public rId = 0;
    
    address[] public accessers = [
        0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, // airport
        0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, // public hospital
        0x5B38Da6a701c568545dCfcB03FcB875f56beddC4  // public school
    ];
    
    hospital[] public hospitals;
    mapping(address => uint) public h_map;
    mapping(address => uint) public u_map;

    constructor() {
        owner = msg.sender;
    }
    
    function addHospital(
        string calldata _hName,
        string calldata _imgUrl,
        string calldata _manager,
        string calldata _phone,
        string calldata _email
    ) public {
        hospital storage newHospital = hospitals.push();
        newHospital.hId = hId;
        newHospital.hospitalName = _hName;
        newHospital.imgUrl = _imgUrl;
        newHospital.nRecords = 0;
        newHospital.manager = _manager;
        newHospital.phone = _phone;
        newHospital.email = _email;
        
        h_map[msg.sender] = hId;
        hId++;
    }
    
    function viewhospitals() public view returns (hospital[] memory) {
        return hospitals;
    }
    
    function addUserData(
        address u_add,
        string calldata _date,
        string calldata _expiryDate,
        string calldata _recordUrl,
        string calldata _rstatus
    ) external {
        require(h_map[msg.sender] < hospitals.length, "Hospital not registered");
        
        uint _hId = h_map[msg.sender];
        record memory newRecord = record(rId, _date, _expiryDate, _recordUrl, _rstatus);
        
        if (u_map[u_add] == 0 && hospitals[_hId].users.length == 0) {
            // Create new user directly in storage
            hospitals[_hId].users.push();
            uint newUserIndex = hospitals[_hId].users.length - 1;
            
            hospitals[_hId].users[newUserIndex].h_address = msg.sender;
            hospitals[_hId].users[newUserIndex].u_address = u_add;
            hospitals[_hId].users[newUserIndex].userId = userId;
            hospitals[_hId].users[newUserIndex].records.push(newRecord);
            
            u_map[u_add] = userId;
            userId++;
        } else {
            bool userFound = false;
            for (uint i = 0; i < hospitals[_hId].users.length; i++) {
                if (hospitals[_hId].users[i].u_address == u_add) {
                    hospitals[_hId].users[i].records.push(newRecord);
                    userFound = true;
                    break;
                }
            }
            
            if (!userFound) {
                // Create new user directly in storage
                hospitals[_hId].users.push();
                uint newUserIndex = hospitals[_hId].users.length - 1;
                
                hospitals[_hId].users[newUserIndex].h_address = msg.sender;
                hospitals[_hId].users[newUserIndex].u_address = u_add;
                hospitals[_hId].users[newUserIndex].userId = userId;
                hospitals[_hId].users[newUserIndex].records.push(newRecord);
                
                u_map[u_add] = userId;
                userId++;
            }
        }
        
        hospitals[_hId].nRecords++;
        rId++;
    }
    
    function fetchUserProfile() public view returns (user memory) {
        bool isAccess = false;
        
        for (uint i = 0; i < accessers.length; i++) {
            if (accessers[i] == msg.sender || msg.sender == owner) {
                isAccess = true;
                break;
            }
        }
        
        require(isAccess || u_map[msg.sender] != 0, "Not Accessible");

        for (uint i = 0; i < hospitals.length; i++) {
            for (uint j = 0; j < hospitals[i].users.length; j++) {
                if (hospitals[i].users[j].u_address == msg.sender) {
                    return hospitals[i].users[j];
                }
            }
        }
        
        revert("User not found");
    }
}