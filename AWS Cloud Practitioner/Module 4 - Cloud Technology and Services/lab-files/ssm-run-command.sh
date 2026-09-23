# Lab 4.3.3: commands for Systems Manager Run Command (course lesson resource).
# Paste these into the "Commands" box of the AWS-RunShellScript document.
# They run on the EC2 instance as root, without SSH.
echo "Hello from AWS Systems Manager!" > /home/ec2-user/ssm-test.txt
ls -l /home/ec2-user
