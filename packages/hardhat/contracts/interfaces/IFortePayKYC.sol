// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IFortePayKYC
 * @dev Interface for the FortePay KYC system
 */
interface IFortePayKYC {
    /**
     * @dev KYC levels for investors
     */
    enum KYCLevel {
        NONE,        // 0: No KYC verification
        BASIC,       // 1: Basic KYC (email, phone verification)
        ADVANCED,    // 2: Advanced KYC (ID verification)
        ACCREDITED   // 3: Accredited investor verification
    }
    
    /**
     * @dev Gets the KYC level of a user
     * @param user Address of the user
     * @return KYC level of the user
     */
    function getUserKYCLevel(address user) external view returns (KYCLevel);
    
    /**
     * @dev Checks if a user has at least the required KYC level
     * @param user Address of the user
     * @param requiredLevel Required KYC level
     * @return True if the user has at least the required KYC level
     */
    function isUserVerified(address user, KYCLevel requiredLevel) external view returns (bool);
    
    /**
     * @dev Gets the jurisdiction (country code) of a user
     * @param user Address of the user
     * @return Jurisdiction as a uint16 country code (ISO 3166-1 numeric)
     */
    function getUserJurisdiction(address user) external view returns (uint16);
}