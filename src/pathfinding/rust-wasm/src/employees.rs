use crate::common::string_tools::split_string_to_vec;
use std::collections::{hash_map::Entry, HashMap};
use std::io;

struct Employee {
    pub name: String,
    pub position: String,
}

struct Command {
    verb: String,
    employee: Employee,
}

pub fn manage_employees() {
    let mut employees: HashMap<String, String> = HashMap::new();
    println!("valid commands:\n*add [name] to [position]\n*remove [name] from [position]");

    loop {
        let input = read_line_as_vec();

        if !has_sufficient_arguments(&input) {
            continue;
        }

        let command = get_command_from_input(&input);

        match &command.verb[..] {
            "add" => add_employee(&command.employee, &mut employees),
            "remove" => remove_employee(&command.employee, &mut employees),
            _ => println!("unknown command"),
        }

        println!("{:?}", employees);
    }
}

fn get_command_from_input(input: &Vec<String>) -> Command {
    Command {
        verb: input[0].clone(),
        employee: Employee {
            name: input[1].clone(),
            position: input[3].clone(),
        },
    }
}

fn read_line_as_vec() -> Vec<String> {
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("could not read input");
    split_string_to_vec(&input)
}

fn has_sufficient_arguments(arguments: &Vec<String>) -> bool {
    if arguments.len() < 4 {
        println!("insufficient arguments");
        return false;
    }
    return true;
}

fn add_employee(employee: &Employee, employees: &mut HashMap<String, String>) {
    employees.insert(employee.name.clone(), employee.position.clone());
}

fn remove_employee(
    employee: &Employee,
    employees: &mut HashMap<String, String>,
) {
    if let Entry::Occupied(entry) = employees.entry(employee.name.clone()) {
        entry.remove_entry();
    }
}
