Feature: E2E tests not restricted to a single page

  Background: "standard_user" is ready to check out
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have 2 products in my cart
    And I am on my cart page

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