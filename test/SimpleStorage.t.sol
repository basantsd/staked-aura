// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/SimpleStorage.sol";

contract SimpleStorageTest is Test{
    SimpleStorage simpleStorage;

    function setUp() public {
        simpleStorage = new SimpleStorage();
    }

    function testSetValue() public {
        simpleStorage.setValue(42);
        assertEq(simpleStorage.getValue(),42);
    }

    function testSetValue(uint256 _value) public {
        simpleStorage.setValue(_value);
        assertEq(simpleStorage.getValue(), _value);
    }
}