Feature: Logout and Session Management Functionality

  Background: User is logged in
    Given I am logged in as "standard_user" with password "secret_sauce"

  Scenario: Successfully log out via the sidebar menu
    When I open the sidebar menu
    And I click on the logout link
    Then I see the login page

  Scenario: Prevent access to inventory page after logout
    When I open the sidebar menu
    And I click on the logout link
    And I try to visit the inventory page directly
    Then I see the login page
    And I see a login error with "Epic sadface: You can only access '/inventory.html' when you are logged in."

  Scenario: Reset app state from the sidebar menu
    And I have 2 products in my cart
    When I open the sidebar menu
    And I click on the reset app state link
    And I close the sidebar menu
    Then I see 0 products in my cart
