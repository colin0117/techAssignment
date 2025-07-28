Feature: Cart Functionality for slow user

  # In a different file due to the Background in cart.feature

  # This does work without any adjustments. If ot fails, the checkout button click
  # could be given an alternative step definition which extends the timeout for that
  # single operation, i.e. el.click({timeout: 10000})

  Background: "performance_glitch_user" is ready to check out
    Given I am logged in as "performance_glitch_user" with password "secret_sauce"
    And I have 2 product in my cart
    And I am on my cart page  

  Scenario: Successfully checkout with slow performance user
    When I click on the Checkout button
    And I fill in the checkout form with the following details:
      | firstname | lastname   | zipCode  |
      | Fred      | Flintstone | BED R0CK |
    And I click on the Continue button
    And I click on the Finish button
    Then I see the order was successful
