# Employee-Tracker-Project

## Description

In this project, I was tasked with creating an application that allows a company to view and add new employees, update employee roles, view and add departments, and view and add roles to the company database using MySQL. 

## Table of Contents

[Install](#install)
[Overview](#overview)
[Links](#links)

## Install

Important: 
MySQL needs to installed on your local machine.

To use the application, open a terminal that can use node.js, navigate to the folder containing the application and run <npm install>. After the previous install is complete, log into MySQL by using <mysql -u root -p>. After logging into MySQL, run <use company_db;>, <node ./db/schema.sql;>, and <node ./db/seeds.sql;> to seed the database. After completion, you will need to exit MySQL by running <exit>. Once you have exited, run <node index.js> to start using the application!

## Overview

- For this project, I used an inquirer prompt to display the collection of questions that the user can select. The user will then be able to select one of the options and be able to get or input the data needed for the database. Upon finishing the section they are on, the user will be brought back to the list of questions to continue using the app, or exit and close the app. 
- Each option has a MySQL query that will run once the option is selected. This will gather all of the affected fields across multiple tables to allow the user to access the data needed to complete their action. 


## Links

-Github link: https://github.com/JacobYaws/Employee-Tracker-Project

    -To download, navigate to the repository and click on the green 'Code' button. Copy the ssh link and clone it in a terminal by using 'git clone git@github.com:JacobYaws/Employee-Tracker-Project.git'

-Demonstrational video - https://drive.google.com/file/d/1SAf9S-Nh-dXuhv9cFwUrnwA-y5OuXKrM/view

        