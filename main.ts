#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class student{
    static counter = 10000
    id:number;
    name:string;
    courses:string[];
    balance:number;

    constructor(name:string){
        this.id = student.counter++
        this.name = name
        this.courses =[]; //initialize an empty array for courses
        this.balance=100;
    }

    enroll_course(course:string){
        this.courses.push(course)
    }
    view_balance(){
        console.log(chalk.blueBright(`Balance for ${this.name} : ${chalk.yellowBright(this.balance)}`))
    }
    pay_fees(amount:number){
        // this.balance-= amount;
        // this.balance = this.balance-amount
        if(amount > this.balance){
            console.log(chalk.redBright("Insufficient balance"))
        }
        else{
            this.balance = this.balance-amount
            console.log(chalk.yellowBright(`$${amount}`),chalk.greenBright(`fees paid successfully for ${chalk.magentaBright(this.name)}`));
        }   
    }
    show_status(){
        console.log(chalk.inverse(`ID : ${chalk.yellowBright(this.id)}`))
        console.log(chalk.inverse(`Name : ${chalk.magentaBright(this.name)}`))
        console.log(chalk.inverse(`Courses: ${chalk.cyanBright(this.courses)}`))
        console.log(chalk.inverse(`Balance : ${chalk.yellowBright(this.balance)}`))
    }
}

// Defining a student manager class to manage students
class student_manager{
    students:student[]

    constructor(){
        this.students = []
    }
    add_student(name:string){
        let Student = new student(name)
        this.students.push(Student)
        console.log(chalk.greenBright(`student ${chalk.magentaBright(name)} added successfully. Student ID : ${chalk.yellowBright(Student.id)}`))
    }
    enroll_course(student_id:number,course:string){
        let student = this.find_student(student_id);
        if(student){
            student.enroll_course(course)
            console.log(chalk.greenBright(`${chalk.magentaBright(student.name)} enrolled in ${chalk.cyanBright(course)} successfully`))
        }
    }
    view_balance(student_id:number){
        let student = this.find_student(student_id);
        if(student){
            student.view_balance()
        }
        else{
            console.log(chalk.inverse.red("Student not found, please enter a correct student id"))
        }
    }
    pay_student_fee(student_id:number,amount:number){
        let student = this.find_student(student_id);
        if(student){
            student.pay_fees(amount)
        }
        else{
            console.log(chalk.inverse.red("Student not found, please enter a correct student id"))
        }

    }
    show_student_status(student_id:number){
        let student = this.find_student(student_id);
        if(student){
            student.show_status()
        }
        else{
            console.log(chalk.inverse.red("Student not found, please enter a correct student id"))
        }
    }
    // METHOD TO FIND A STUDENT BY STUDENT ID
    find_student(student_id:number){
       return this.students.find(std => std.id === student_id);
    }
}

// Main function to run the program

async function main() {
    console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
    console.log(chalk.magentaBright.inverse("Welcome to iqrz-Student-Management-System"))
    console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");

    let Student_manager = new student_manager();

    while(true){
        // Asking user to keep program running
        let choice = await inquirer.prompt([
            {
                name:"choices",
                type:"list",
                message:"Select an option",
                choices:[
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ])

// Using a switch case to handle usrs choice
switch(choice.choices){
    case"Add Student":
    let name_input = await inquirer.prompt([
        {
            name:"name",
            type:"input",
            message:"Enter a student name :"
        }
    ]);
    Student_manager.add_student(name_input.name)
    break;

    case "Enroll Student":
    let course_input = await inquirer.prompt([
        {
            name:"student_id",
            type:"number",
            message:"enter a student id"
        },
        {
            name:"course",
            type:"input",
            message:"Enter a course name"
        }
    ]);
    Student_manager.enroll_course(course_input.student_id,course_input.course)
    break;

    case "View Student Balance":
    let view_student_balance = await inquirer.prompt([
        {
            name:"student_id",
            type:"number",
            message:"Enter student ID",
        }
    ]);
    Student_manager.view_balance(view_student_balance.student_id)
    break;
    
    case "Pay Fees":
    let pay_fee = await inquirer.prompt([
        {
            name:"student_id",
            type:"number",
            message:"Enter student id"
        },
        {
            name:"amount",
            type:"number",
            message:"Enter the amount to pay"
        }
    ])    
    Student_manager.pay_student_fee(pay_fee.student_id,pay_fee.amount)
    break;

    case "Show Status":
    let show_status = await inquirer.prompt([
        {
            name:"student_id",
            type:"number",
            message:"Enter student ID"
        }
    ]);
    Student_manager.show_student_status(show_status.student_id)
    break;

    case "Exit":
    console.log("Exiting...")
    process.exit();
}
    }
}                   
main()