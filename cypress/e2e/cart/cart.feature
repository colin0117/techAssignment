Feature: Cart Functionality

  Background: "standard_user" is ready to check out
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have 2 product in my cart
    And I am on my cart page

  Scenario: Successfully checkout
    When I click on the Checkout button
    And I fill in the checkout form with the following details:
      | firstname | lastname   | zipCode  |
      | Fred      | Flintstone | BED R0CK |
    And I click on the Continue button
    And I click on the Finish button
    Then I see the order was successful

  Scenario: Successfully checkout with manipulated session token
    When I click on the Checkout button
    And I manipulate the session token in localStorage
    And I fill in the checkout form with the following details:
      | firstname | lastname   | zipCode  |
      | Fred      | Flintstone | BED R0CK |
    And I click on the Continue button
    And I click on the Finish button
    Then I see the order was successful

  Scenario: Unsuccessfully checkout with clearing cookies and local storage
    When I click on the Checkout button
    And I fill in the checkout form with the following details:
      | firstname | lastname   | zipCode  |
      | Fred      | Flintstone | BED R0CK |
    And I clear the browser cookies
    And I clear the local storage
    And I click on the Continue button
    Then I see the login page
    And I see a login error with "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in."

  Scenario Outline: Unsuccessful checkout with missing <Missing>
    When I click on the Checkout button
    And I fill in the checkout form with the following details:
      | firstname   | lastname   | zipCode   |
      | <Firstname> | <Lastname> | <Zip code> |
    And I click on the Continue button
    Then I see the error "<Error>"
    Examples:
      | Missing    | Firstname | Lastname   | Zip code | Error                          |
      | first name |           | Flintstone | BED R0CK | Error: First Name is required  |
      | last name  | Fred      |            | BED R0CK | Error: Last Name is required   |
      | zip code   | Fred      | Flintstone |          | Error: Postal Code is required |

  Scenario: Successfully remove products from cart and checkout
    When I see 2 items in the cart
    And I remove the first item from the cart
    Then I see 1 items in the cart
    And I click on the Checkout button
    And I fill in the checkout form with the following details:
      | firstname | lastname   | zipCode  |
      | Fred      | Flintstone | BED R0CK |
    And I click on the Continue button
    When I click on the Finish button
    Then I see the order was successful

# Additional tests

# Ensure Cancel takes you back to previous pages
# Ensure items on checkout page match what was selected earlier
# Verify the combined amount and the tax calculations