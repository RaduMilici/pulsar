use rand::{thread_rng, Rng};
use std::cmp::Ordering;
use std::io::stdin;

fn main() {
    println!("guess the secret number");
    let secret_number = thread_rng().gen_range(1, 101);
    println!("secret_number {}", secret_number);

    loop {
        println!("enter a number");

        let mut guess = String::new();
        stdin()
            .read_line(&mut guess)
            .expect("could not read line");
        let guess: u32 = match guess.trim().parse() {
            Ok(number) => number,
            Err(_) => {
                println!("you did not enter a number");
                continue;
            }
        };

        println!("you have entered {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("too small"),
            Ordering::Greater => println!("too big"),
            Ordering::Equal => {
                println!("you win");
                break;
            }
        }
    }
}
