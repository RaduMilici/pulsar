mod common {
    pub mod vec_math;
}

use common::vec_math::{find_mean, find_median, find_mode};

fn main() {
    let numbers = vec![1, 1, 2, 2, 3, 5, 5, 5, 5];

    let mean = find_mean(&numbers);
    println!("mean {}", mean);

    let median = find_median(&numbers);
    println!("median {}", median);

    let mode = find_mode(&numbers);
    println!("mode {}", mode);
}
