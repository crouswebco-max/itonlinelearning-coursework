#!/bin/bash
# Lab 3.4.4: EC2 user data for the AWS WAF demo (from the course's lesson resource).
# Installs the Apache web server and creates a simple home page.
# Fixed: the echo line must be ONE line, so the > redirect reaches the file path.
yum update -y
yum install -y httpd
echo "<h1> Hello from AWS WAF Demo!</h1>" > /var/www/html/index.html
systemctl start httpd
systemctl enable httpd
