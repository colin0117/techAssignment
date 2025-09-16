Feature: Cart Functionality

  Background: "standard_user" is on the cart page
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have 2 products in my cart
    And I am on my cart page

  Scenario: Successfully remove products from cart and verify cart
    When I see 2 items in the cart
    And I remove the first item from the cart
    Then I see 1 items in the cart

  Scenario: Successfully remove products from cart and verify inventory
    When I see 2 items in the cart
    And I remove the first item from the cart
    And I click on the Continue Shopping button
    Then I see 1 products in my cart