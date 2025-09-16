Feature: Checkout Functionality

  Background: "standard_user" is ready to check out
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have 2 products in my cart
    And I am on my checkout page

  Scenario: Successfully checkout
    When I fill in the checkout form with the following details:
      | firstname | lastname   | zipCode  |
      | Fred      | Flintstone | BED R0CK |
    And I click on the Continue button
    And I click on the Finish button
    Then I see the order was successful

  Scenario: Successfully checkout with manipulated session token
    When I manipulate the session token in localStorage
    And I fill in the checkout form with the following details:
      | firstname | lastname   | zipCode  |
      | Fred      | Flintstone | BED R0CK |
    And I click on the Continue button
    And I click on the Finish button
    Then I see the order was successful

  Scenario: Unsuccessfully checkout with clearing cookies and local storage
    When I fill in the checkout form with the following details:
      | firstname | lastname   | zipCode  |
      | Fred      | Flintstone | BED R0CK |
    And I clear the browser cookies
    And I clear the local storage
    And I click on the Continue button
    Then I see the login page
    And I see a login error with "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in."

  Scenario Outline: Unsuccessful checkout with missing <Missing>
    When I fill in the checkout form with the following details:
      | firstname   | lastname   | zipCode   |
      | <Firstname> | <Lastname> | <Zip code> |
    And I click on the Continue button
    Then I see the error "<Error>"
    Examples:
      | Missing    | Firstname | Lastname   | Zip code | Error                          |
      | first name |           | Flintstone | BED R0CK | Error: First Name is required  |
      | last name  | Fred      |            | BED R0CK | Error: Last Name is required   |
      | zip code   | Fred      | Flintstone |          | Error: Postal Code is required |
