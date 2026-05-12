@forms
Feature: DemoQA Practice Form
  As a user of an AI platform
  I want to fill and submit forms
  So that I can register my details in the system

  Background:
    Given I am on the DemoQA practice form page

  @smoke @form-submit
  Scenario: Successfully submit the practice form with all details
    When I fill in first name "Lokender" and last name "Singh"
    And I enter email "lokender@ren3test.com"
    And I select gender "Male"
    And I enter mobile number "9876543210"
    And I fill current address "Noida, Uttar Pradesh, India"
    And I select hobby "Reading"
    And I submit the form
    Then I should see the confirmation modal with title "Thanks for submitting the form"
    And the submitted first name should be "Lokender Singh"

  @form-submit
  Scenario: Submit form with female gender selection
    When I fill in first name "Priya" and last name "Sharma"
    And I enter email "priya@ren3test.com"
    And I select gender "Female"
    And I enter mobile number "9876543211"
    And I fill current address "Delhi, India"
    And I select hobby "Music"
    And I submit the form
    Then I should see the confirmation modal with title "Thanks for submitting the form"
    And the submitted first name should be "Priya Sharma"