Feature: Login Functionality

  Background: Am on the login page
    Given I am at the login page

  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I see the inventory page

  Scenario Outline: Login failure test for <Comment>
    When I enter username "<User>"
    And I enter password "<Password>"
    And I click the login button
    Then I see a login error with "<Error>"
    Examples:
      | Comment                     | User            | Password            | Error                                                                     |
      | Locked user                 | locked_out_user | secret_sauce        | Epic sadface: Sorry, this user has been locked out                        |
      | Unknown user                | unknown_user    | secret_sauce        | Epic sadface: Username and password do not match any user in this service |
      | Bad password                | standard_user   | secret_sauce1       | Epic sadface: Username and password do not match any user in this service |
      | Username Missing            |                 | secret_sauce1       | Epic sadface: Username is required                                        |
      | Password Missing            | standard_user   |                     | Epic sadface: Password is required                                        |
      | White space before          | standard_user   | [SPACE]secret_sauce | Epic sadface: Username and password do not match any user in this service |
      | White space after           | standard_user   | secret_sauce[SPACE] | Epic sadface: Username and password do not match any user in this service |
      | White space in middle       | standard_user   | secret_[SPACE]sauce | Epic sadface: Username and password do not match any user in this service |
      | Username capitalisation     | Standard_user   | secret_sauce        | Epic sadface: Username and password do not match any user in this service |
      | Password capitalisation     | standard_user   | Secret_sauce        | Epic sadface: Username and password do not match any user in this service |
      | Username special characters | standard_user&  | Secret_sauce        | Epic sadface: Username and password do not match any user in this service |
      | Password special characters | standard_user   | Secret_sauce&       | Epic sadface: Username and password do not match any user in this service |
      | Username SQL injection      | ' OR '1'='1     | Secret_sauce        | Epic sadface: Username and password do not match any user in this service |
      | Password SQL injection      | standard_user   | ' OR '1'='1         | Epic sadface: Username and password do not match any user in this service |
