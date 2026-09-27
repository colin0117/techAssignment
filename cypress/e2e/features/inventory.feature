Feature: Inventory Functionality

  Background: Login and verify on the products page
    Given I am logged in as "standard_user" with password "secret_sauce"

  Scenario: All products load correctly
    Then All products are loaded correctly

  Scenario Outline: Products are sorted <Comment>
    When I sort products by "<SortingOption>"
    Then The products are sorted by "<Comment>"
    Examples:
      | Comment          | SortingOption       |
      | Name ascending   | Name (A to Z)       |
      | Name descending  | Name (Z to A)       |
      | Price ascending  | Price (low to high) |
      | Price descending | Price (high to low) |

  Scenario Outline: User can add and remove <Count> products from cart
    When I add <Count> product to my cart
    Then I see <Count> products in my cart
    Then I can remove <Count> product from my cart
    Then I see 0 products in my cart
    Examples:
      | Count |
      | 1     |
      | 2     |
      | 3     |

  Scenario: Confirm can only add item once
    When I add the product "Sauce Labs Backpack" to my cart
    Then The product "Sauce Labs Backpack" shows a remove button
    And The product "Sauce Labs Backpack" does not show an add to cart button
    And I see 1 products in my cart

  Scenario: Add and remove products individually, ensuring counts goes up and down as expected
    When I add the product "Sauce Labs Backpack" to my cart
    Then I see 1 products in my cart
    When I add the product "Sauce Labs Bike Light" to my cart
    Then I see 2 products in my cart
    When I remove the product "Sauce Labs Backpack" from my cart
    Then I see 1 products in my cart
    When I remove the product "Sauce Labs Bike Light" from my cart
    Then I see 0 products in my cart