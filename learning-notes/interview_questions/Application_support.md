- What is Application Support?
    - Application support ensures business applications run smoothly in production, handles incidents, fixes issues, monitors systems, and coordinates with development teams.
- What is L1, L2, L3 support?
    - L1 Basic monitoring, ticket creation, initial troubleshooting
    - L2 Deeper investigation, logs, database queries, API checks
    - L3 Development team fixes code issues
- What is an Incident?
    - An incident is any unexpected interruption or reduction in the quality of service.
    - Example:
    - Payment transaction failed
    - API not responding
    - Batch job failure
- What is SLA?
    - SLA = Service Level Agreement
    - It defines:
        - Resolution time
        - Response time
    - Example:
        - Critical incident → resolve within 1 hour
- What is RCA?
    - RCA = Root Cause Analysis
    - After a major incident we analyze:
        - What happened
        - Why it happened
        - How to prevent it again

- Explain your role in Ugro Capital.
    - I work as an Application Support Engineer providing L1/L2 support for MSME(Micro, Small, and Medium Enterprises) lending systems.
    - My responsibilities include monitoring applications using Grafana and AWS CloudWatch, troubleshooting API failures, executing PostgreSQL queries for data validation, and resolving incidents raised in Jira.
    - I also coordinate with development and infrastructure teams and prepare RCA for major incidents.

- What happens when a loan transaction fails?
    - Check monitoring alerts (Grafana / CloudWatch)
    - Check application logs
    - Validate API request in Postman
    - Check database using PostgreSQL query
    - Identify root cause
    - Escalate if needed

- Difference between INNER JOIN and LEFT JOIN
    - INNER JOIN - Returns only matching records.
    ```sql
    SELECT *
    FROM customers c
    INNER JOIN loans l
    ON c.id = l.customer_id;
    ```
    - LEFT JOIN - Returns all rows from left table.
    ```sql
    SELECT *
    FROM customers c
    LEFT JOIN loans l
    ON c.id = l.customer_id;
    ```

- Find duplicate records
    - SELECT column_name, COUNT(*)
    FROM table_name
G   ROUP BY column_name
    HAVING COUNT(*) > 1;

- Difference between WHERE and HAVING
    - Filters rows before grouping - Filters after GROUP BY
    - Cannot use aggregate functions - Can use aggregate functions