# Lab 3.4.6: retrieve the secret with the AWS CLI (lesson resource).
# Run this in AWS CloudShell, or a terminal with the AWS CLI set up.
# Note: the course's copy says --select-id, which is a typo. The option is --secret-id.

# Get the full secret (JSON with SecretString, ARN, version and so on)
aws secretsmanager get-secret-value --secret-id DemoCredentials

# Get just the secret's value
aws secretsmanager get-secret-value --secret-id DemoCredentials --query SecretString --output text
