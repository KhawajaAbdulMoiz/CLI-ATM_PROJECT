#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";
console.log(chalk.bgRedBright.white.bold("------------| ATM |------------\n"));
// Initialize variables
let myBalance = 50000;
let pincode = 2005;
// Prompt user to enter PIN
let pinanswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.blue("Enter Your Pin Number :")
    }
]);
// Verify PIN entered by the user
if (pinanswer.pin === pincode) {
    console.log(chalk.white("Correct Pin Code"));
    // Present options to the user
    let options = await inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: chalk.magentaBright("Select an Option"),
            choices: ["fastwithdraw", "checkbalance", "deposit"]
        }
    ]);
    // Output user's choice
    console.log(options);
    // Handle fast withdraw option
    if (options.option === "fastwithdraw") {
        let amountw = await inquirer.prompt([
            {
                name: "amount",
                type: "list",
                message: chalk.magentaBright("Select Withdrawl Amount : "),
                choices: [500, 1000, 5000, 10000, 50000, 75000]
            }
        ]);
        // Check if withdrawal amount exceeds balance
        if (amountw.amount > myBalance) {
            console.log(chalk.red(`Insufficient balance\nYour Current balance is ${myBalance}`));
        }
        else {
            myBalance -= amountw.amount;
            console.log(chalk.white(`Withdrawal Successfull: ${amountw.amount}. Your remaining balance is: ${myBalance}`));
        }
    }
    // Handle check balance option
    if (options.option === "checkbalance") {
        console.log(chalk.white(`Your Balance is: ${myBalance}`));
    }
    ;
    // Handle deposit option
    if (options.option === "deposit") {
        let dep = await inquirer.prompt([
            {
                name: "add",
                type: "number",
                message: chalk.blue("Enter Amount to Deposit : ")
            }
        ]);
        myBalance += dep.add;
        console.log(chalk.white(`Deposited amount ${dep.add}. Your balance is : ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Wrong Pin"));
}
;
