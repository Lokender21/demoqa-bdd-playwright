@login
Feature: DemoQA Login Functionality
  As a registered user of DemoQA platform
  I want to login with my credentials
  So that I can access my profile and books

  Background:
    Given I am on the DemoQA login page

  @smoke @login-success
  Scenario: Successful login with valid credentials
    When I enter username "testuser" and password "Password123!"
    And I click the login button
    Then I should be redirected to the profile page

  @login-failure
  Scenario: Login fails with invalid password
    When I enter username "testuser" and password "WrongPassword"
    And I click the login button
    Then I should see an invalid credentials error message

  @login-failure
  Scenario: Login fails with empty username
    When I enter username "" and password "Qwerty@22"
    And I click the login button
    Then I should see an invalid credentials error message

  @login-failure
  Scenario: Login fails with empty password
    When I enter username "testuser" and password ""
    And I click the login button
    Then I should see an invalid credentials error message