Feature: Login Functionality

  Background: Am on the login page
    Given I am at the login page

  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I see the homepage

  Scenario Outline: Login failure test for <Comment>
    When I enter username "<User>"
    And I enter password "<Password>"
    And I click the login button
    Then I see a login error with "<Error>"
    Examples:
      | Comment      | User            | Password      | Error                                                                     |
      | Locked user  | locked_out_user | secret_sauce  | Epic sadface: Sorry, this user has been locked out                        |
      | Unknown user | unknown_user    | secret_sauce  | Epic sadface: Username and password do not match any user in this service |
      | Bad password | standard_user   | secret_sauce1 | Epic sadface: Username and password do not match any user in this service |

# Additional tests

# validate missing username
# validate missing password
# various tests based around white space before/in/after name and password
# various tests based around capitalisation in name and password
# try passwords with special characters
# as an input element, try SQL injection strings for both user and password
# can login as one user, and then logout and login as a different user
