# AWS Cloud Practitioner: Module 4, Cloud Technology and Services

Study notes and lab guides for Module 4, which covers **Domain 3: Cloud Technology and Services (34% of the exam, the biggest domain)**.

| Lessons | Notes |
|---|---|
| 4.1–4.2 Deploying and Operating | [Console, CLI, SDKs, CloudFormation and CDK, VPN and Direct Connect, and a CloudFormation stack lab](4.1-4.2%20Deploying%20and%20Operating%20in%20AWS.md) |
| 4.3 Systems Manager | [SSM features, and labs: Parameter Store and Run Command](4.3%20AWS%20Systems%20Manager%20%28SSM%29.md) |
| 4.4 DevOps Practices | [CI/CD and developer tools, and a lab: build a VPC with CloudFormation](4.4%20DevOps%20Practices.md) |
| 4.5 Global Infrastructure | [Regions, AZs, edge locations, Local Zones and Outposts, and a lab: S3 buckets in two Regions](4.5%20AWS%20Global%20Infrastructure.md) |
| 4.6 Compute | [EC2, scaling, Lambda, containers and Beanstalk, and labs: launch EC2 and deploy with Elastic Beanstalk](4.6%20Compute%20Services.md) |
| 4.7 Data Services | [RDS, Aurora, DynamoDB and more, and labs: an RDS database and a DynamoDB table](4.7%20Data%20and%20Database%20Services.md) |
| 4.8 Networking | [VPC, security groups and NACLs, Route 53, CloudFront and connectivity](4.8%20Networking.md) |
| 4.9 Storage | [S3 and its storage classes, EBS, EFS and FSx, and labs: buckets, replication, EBS, versioning and lifecycle](4.9%20Storage%20Services.md) |
| 4.10 Analytics and ML | [Athena, Glue, Redshift, Kinesis, SageMaker and the AI services, and a lab: query a CSV with Athena](4.10%20Analytics%20and%20Machine%20Learning.md) |
| 4.11 Other Services | [Integration, business apps, developer tools, end-user computing, Amplify, Cognito and IoT](4.11%20Other%20AWS%20Services.md) |
| 4.12 Services Working Together | [Architecture patterns, and a lab: build a mini app with API Gateway and Lambda](4.12%20How%20AWS%20Services%20Work%20Together.md) |

## Lab files

| File | For |
|---|---|
| [`lab-files/cf-demo-bucket.yaml`](lab-files/cf-demo-bucket.yaml) | Lab 4.2.2: CloudFormation stack (**course resource**) |
| [`lab-files/ssm-run-command.sh`](lab-files/ssm-run-command.sh) | Lab 4.3.3: Run Command (**course resource**) |
| [`lab-files/demo-vpc.yaml`](lab-files/demo-vpc.yaml) | Labs 4.2.2 (Part B) and 4.4.2: VPC with CloudFormation (**course resource**) |
| [`lab-files/TestData.csv`](lab-files/TestData.csv) | Lab 4.10.3: Athena data (**course resource**) |
| [`lab-files/athena-queries.sql`](lab-files/athena-queries.sql) | Lab 4.10.3: Athena queries (**course resource**) |
| [`lab-files/mini-app/lambda_function.py`](lab-files/mini-app/lambda_function.py) | Lab 4.12.3: mini services app (**course resource**) |

All the lab files are the course's own lesson resources.

⚠️ Several labs create resources that **cost money if left running** (EC2, RDS, Elastic Beanstalk and EBS). Every lab lists its cost and how to **clean up**.

The Module 4 quiz is taken on the course website.

## Lab screenshots

Proof of each lab, with a checklist in each folder of what to capture.

| Lab | Screenshots |
|---|---|
| 4.2.2 CloudFormation Stack | [3 screenshots](screenshots/4.2.2%20CloudFormation%20Stack/) |
| 4.3.2 Parameter Store | [2 screenshots](screenshots/4.3.2%20Parameter%20Store/) |
| 4.3.3 Run Command | [3 screenshots](screenshots/4.3.3%20Run%20Command/) |
| 4.4.2 VPC with CloudFormation | [3 screenshots](screenshots/4.4.2%20VPC%20with%20CloudFormation/) |
| 4.5.3.1 S3 Buckets in Two Regions | [1 screenshots](screenshots/4.5.3.1%20S3%20Buckets%20in%20Two%20Regions/) |
| 4.6.2 Launch EC2 | [3 screenshots](screenshots/4.6.2%20Launch%20EC2/) |
| 4.6.4 Elastic Beanstalk | [2 screenshots](screenshots/4.6.4%20Elastic%20Beanstalk/) |
| 4.7.3 RDS Database | [2 screenshots](screenshots/4.7.3%20RDS%20Database/) |
| 4.7.5 DynamoDB | [2 screenshots](screenshots/4.7.5%20DynamoDB/) |
| 4.9.3 S3 Bucket | [2 screenshots](screenshots/4.9.3%20S3%20Bucket/) |
| 4.9.4 S3 Cross-Region Replication | [2 screenshots](screenshots/4.9.4%20S3%20Cross-Region%20Replication/) |
| 4.9.5 Amazon EBS | [2 screenshots](screenshots/4.9.5%20Amazon%20EBS/) |
| 4.9.7 S3 Versioning and Lifecycle | [2 screenshots](screenshots/4.9.7%20S3%20Versioning%20and%20Lifecycle/) |
| 4.10.3 Athena | [2 screenshots](screenshots/4.10.3%20Athena/) |
| 4.12.3 Mini Services App | [3 screenshots](screenshots/4.12.3%20Mini%20Services%20App/) |
