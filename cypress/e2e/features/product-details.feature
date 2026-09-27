Feature: Product Details Functionality

  Background: User is logged in on the inventory page
    Given I am logged in as "standard_user" with password "secret_sauce"

  Scenario: View product details from inventory page
    When I click on the product "Sauce Labs Backpack"
    Then I see the product details page for "Sauce Labs Backpack"
    And I see the product description is not empty
    And I see the product price is "$29.99"

  Scenario: Add and remove product from cart on product details page
    When I click on the product "Sauce Labs Backpack"
    And I add the product to my cart from the details page
    Then I see 1 products in my cart
    And I see the remove button on the details page
    When I remove the product from my cart from the details page
    Then I see 0 products in my cart

  Scenario: Navigate back to inventory page from product details
    When I click on the product "Sauce Labs Backpack"
    And I click on the back to products button
    Then I see the inventory page
