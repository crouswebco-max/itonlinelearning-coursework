# AWS Cloud Practitioner: Module 3, Security and Compliance

Study notes and lab guides for Module 3, which covers **Domain 2: Security and Compliance (30% of the exam)**.

| Lessons | Notes |
|---|---|
| 3.1.1–3.1.6 Shared Responsibility Model | [Security OF and IN the cloud, how it changes by service, exam tips and a sorting exercise](3.1%20Shared%20Responsibility%20Model.md) |
| 3.2.1–3.2.4 Governance, Compliance and Logging | [Artifact, Config, Organizations, encryption, and logging basics](3.2%20Governance%2C%20Compliance%20and%20Logging.md) |
| 3.3.1–3.3.4 IAM | [Users, groups, roles, policies, best practices, and the three ways to access AWS](3.3%20Identity%20and%20Access%20Management%20%28IAM%29.md) |
| 3.3.3, 3.3.5–3.3.7 Labs | [Create an IAM user and test it, CloudShell, set up the CLI, and create a role](3.3%20Labs%20-%20IAM%20User%2C%20CloudShell%2C%20CLI%20and%20Roles.md) |
| 3.4.1–3.4.3 Security Services | [Security groups and NACLs, WAF, Shield, GuardDuty, Inspector, Macie and more](3.4%20Security%20Services.md) |
| 3.4.4–3.4.6 Labs | [AWS WAF with a sample rule, Security Hub, and Secrets Manager](3.4%20Labs%20-%20WAF%2C%20Security%20Hub%20and%20Secrets%20Manager.md) |
| 3.5.1–3.5.4 Monitoring and Logging | [CloudTrail and CloudWatch, then labs: enable CloudTrail and create a billing alarm](3.5%20Monitoring%20and%20Logging.md) |

**Lab files** (the course's lesson resources):
- [`lab-files/waf-demo-user-data.sh`](lab-files/waf-demo-user-data.sh): for 3.4.4, with the `echo` line fixed
- [`lab-files/secrets-manager-commands.sh`](lab-files/secrets-manager-commands.sh): for 3.4.6, with `--select-id` corrected to `--secret-id`

⚠️ Some labs use services that **cost money** (WAF, Security Hub and Secrets Manager). Each lab lists the cost and how to **clean up**.

The Module 3 quiz is taken on the course website.

## Lab screenshots

Proof of each lab, with a checklist in each folder of what to capture.

| Lab | Screenshots |
|---|---|
| 3.3.3 IAM User and Access Test | [3 screenshots](screenshots/3.3.3%20IAM%20User%20and%20Access%20Test/) |
| 3.3.5-3.3.6 CloudShell and CLI | [2 screenshots](screenshots/3.3.5-3.3.6%20CloudShell%20and%20CLI/) |
| 3.3.7 IAM Role | [2 screenshots](screenshots/3.3.7%20IAM%20Role/) |
| 3.4.4 AWS WAF | [4 screenshots](screenshots/3.4.4%20AWS%20WAF/) |
| 3.4.5 Security Hub | [2 screenshots](screenshots/3.4.5%20Security%20Hub/) |
| 3.4.6 Secrets Manager | [2 screenshots](screenshots/3.4.6%20Secrets%20Manager/) |
| 3.5.3 CloudTrail | [3 screenshots](screenshots/3.5.3%20CloudTrail/) |
| 3.5.4 CloudWatch Alarm | [2 screenshots](screenshots/3.5.4%20CloudWatch%20Alarm/) |
