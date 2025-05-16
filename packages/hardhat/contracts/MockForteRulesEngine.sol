// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IForteRulesEngine.sol";

/**
 * @title MockForteRulesEngine
 * @dev Mock implementation of the Forte Rules Engine for testing
 */
contract MockForteRulesEngine is IForteRulesEngine {
    mapping(string => bytes) private rules;
    mapping(string => bool) private ruleResults;
    
    /**
     * @dev Validates if a specific action complies with a rule
     * @param ruleName Name of the rule to validate
     * @param params Parameters for the rule validation
     * @return True if the action complies with the rule
     */
    function validateRule(string memory ruleName, bytes memory params) external view override returns (bool) {
        return ruleResults[ruleName];
    }
    
    /**
     * @dev Gets the parameters for a specific rule
     * @param ruleName Name of the rule
     * @return Parameters of the rule
     */
    function getRuleParameters(string memory ruleName) external view override returns (bytes memory) {
        return rules[ruleName];
    }
    
    /**
     * @dev Sets a rule with specific parameters
     * @param ruleName Name of the rule to set
     * @param parameters Parameters for the rule
     */
    function setRule(string memory ruleName, bytes memory parameters) external override {
        rules[ruleName] = parameters;
    }
    
    /**
     * @dev Sets the result of a rule validation (for testing)
     * @param ruleName Name of the rule
     * @param result Result of the validation
     */
    function setRuleResult(string memory ruleName, bool result) external {
        ruleResults[ruleName] = result;
    }
}