mod pig_latin;
mod common {
    pub mod vec_math;
}

use common::vec_math::{find_mean, find_median, find_mode};
use pig_latin::to_pig_latin;

fn main() {
    let numbers = vec![1, 1, 2, 2, 3, 5, 5, 5, 5];

    let mean = find_mean(&numbers);
    println!("mean {}", mean);

    let median = find_median(&numbers);
    println!("median {}", median);

    let mode = find_mode(&numbers);
    println!("mode {}", mode);

    let text = String::from("alfa echo india oscar uniform");
    let pig_latin = to_pig_latin(&text);
    println!("vowel pig latin: {}", pig_latin);

    let text = String::from("bravo charlie delta foxtrot");
    let pig_latin = to_pig_latin(&text);
    println!("consonant pig latin: {}", pig_latin);
}
