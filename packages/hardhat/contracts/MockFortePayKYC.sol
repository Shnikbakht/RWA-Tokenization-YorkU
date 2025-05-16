  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IFortePayKYC.sol";

/**
 * @title MockFortePayKYC
 * @dev Mock implementation of the FortePay KYC system for testing
 */
contract MockFortePayKYC is IFortePayKYC {
    mapping(address => KYCLevel) private userLevels;
    mapping(address => uint16) private userJurisdictions;
    
    /**
     * @dev Gets the KYC level of a user
     * @param user Address of the user
     * @return KYC level of the user
     */
    function getUserKYCLevel(address user) external view override returns (KYCLevel) {
        return userLevels[user];
    }
    
    /**
     * @dev Checks if a user has at least the required KYC level
     * @param user Address of the user
     * @param requiredLevel Required KYC level
     * @return True if the user has at least the required KYC level
     */
    function isUserVerified(address user, KYCLevel requiredLevel) external view override returns (bool) {
        return uint256(userLevels[user]) >= uint256(requiredLevel);
    }
    
    /**
     * @dev Gets the jurisdiction (country code) of a user
     * @param user Address of the user
     * @return Jurisdiction as a uint16 country code
     */
    function getUserJurisdiction(address user) external view override returns (uint16) {
        return userJurisdictions[user];
    }
    
    /**
     * @dev Sets the KYC level of a user (for testing)
     * @param user Address of the user
     * @param level KYC level to set
     */
    function setUserKYCLevel(address user, KYCLevel level) external {
        userLevels[user] = level;
    }
    
    /**
     * @dev Sets the jurisdiction of a user (for testing)
     * @param user Address of the user
     * @param jurisdiction Jurisdiction to set
     */
    function setUserJurisdiction(address user, uint16 jurisdiction) external {
        userJurisdictions[user] = jurisdiction;
    }
}