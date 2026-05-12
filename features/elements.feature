@elements
Feature: DemoQA Elements Interactions
  As a user of an AI platform
  I want to interact with various UI elements
  So that I can verify the platform responds correctly

  @smoke @textbox
  Scenario: Fill and submit text box form
    Given I am on the DemoQA text box page
    When I fill the text box with name "Lokender Singh" and email "lokender@ren3test.com"
    And I submit the text box form
    Then the output should display name containing "Lokender Singh"
    And the output should display email containing "lokender@ren3test.com"

  @radio
  Scenario: Select Yes radio button
    Given I am on the DemoQA radio button page
    When I click the "Yes" radio button
    Then I should see radio result "Yes"

  @radio
  Scenario: Select Impressive radio button
    Given I am on the DemoQA radio button page
    When I click the "Impressive" radio button
    Then I should see radio result "Impressive"

  @buttons @smoke
  Scenario: Double click action on button
    Given I am on the DemoQA buttons page
    When I double click the button
    Then I should see the message "You have done a double click"

  @buttons
  Scenario: Right click action on button
    Given I am on the DemoQA buttons page
    When I right click the button
    Then I should see the right click message "You have done a right click"

  @checkbox
  Scenario: Select home checkbox and verify result
    Given I am on the DemoQA checkbox page
    When I expand all checkboxes
    And I click the home checkbox
    Then I should see checkbox selection result