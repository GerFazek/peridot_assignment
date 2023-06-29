Feature: File Validation

    Scenario: Check the purchase_orders.xls file
        Given I have an existing file with name "purchase_orders.xls"
        When I extract the headers from the sheet "Data"
        Then I should see the following headers in the worksheet:
            | Buyer | Buyer | Buyer External ID | Sales Order |
        Then the file should have more than 10 lines