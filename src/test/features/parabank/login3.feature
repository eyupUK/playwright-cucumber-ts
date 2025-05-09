@login4
Feature: Login Feature
    As a user of the Parabank application
    I want to log in to my account
    So that I can access my banking features
    
    Background:
        Given User goes to home page
    
    Scenario: Successful login with valid credentials
        Given User enters credentials
        When User clicks on LOG IN
        Then User should be redirected to the account overview page
    