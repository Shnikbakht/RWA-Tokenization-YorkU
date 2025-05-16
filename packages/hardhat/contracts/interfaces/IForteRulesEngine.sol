// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IForteRulesEngine
 * @dev Interface for the Forte Rules Engine
 */
interface IForteRulesEngine {
    /**
     * @dev Validates if a specific action complies with a rule
     * @param ruleName Name of the rule to validate
     * @param params Parameters for the rule validation encoded as bytes
     * @return True if the action complies with the rule
     */
    function validateRule(string memory ruleName, bytes memory params) external view returns (bool);
    
    /**
     * @dev Gets the parameters for a specific rule
     * @param ruleName Name of the rule
     * @return Parameters of the rule encoded as bytes
     */
    function getRuleParameters(string memory ruleName) external view returns (bytes memory);
    
    /**
     * @dev Sets a rule with specific parameters
     * @param ruleName Name of the rule to set
     * @param parameters Parameters for the rule encoded as bytes
     */
    function setRule(string memory ruleName, bytes memory parameters) external;
}