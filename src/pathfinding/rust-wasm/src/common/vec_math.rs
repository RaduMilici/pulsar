use std::collections::HashMap;

enum Parity {
    Odd(usize),
    Even(usize),
}

pub fn find_mean(numbers: &Vec<i32>) -> f64 {
    let mut sum = 0;

    for number in numbers {
        sum += number;
    }

    sum as f64 / numbers.len() as f64
}

pub fn find_median(numbers: &Vec<i32>) -> f64 {
    let mut numbers = numbers.clone();
    numbers.sort();

    let length = numbers.len();
    let middle_index = length / 2;

    match get_parity(length) {
        Parity::Odd(_) => numbers[middle_index] as f64,
        Parity::Even(_) => {
            let a = numbers[middle_index - 1];
            let b = numbers[middle_index];
            find_mean(&vec![a, b])
        }
    }
}

pub fn find_mode(numbers: &Vec<i32>) -> i32 {
    let mut occurrences: HashMap<i32, i32> = HashMap::new();

    for number in numbers {
        let count = occurrences.entry(*number).or_insert(0);
        *count += 1;
    }

    let mut occurrences: Vec<(i32, i32)> = occurrences
        .iter()
        .map(|(number, occurrences)| (*number, *occurrences))
        .collect();

    occurrences.sort_by(|(_, occurrences_a), (_, occurrences_b)| {
        occurrences_b.cmp(occurrences_a)
    });

    let (number, _) = occurrences[0];
    number
}

fn get_parity(vec_len: usize) -> Parity {
    if vec_len % 2 != 0 {
        Parity::Odd(vec_len)
    } else {
        Parity::Even(vec_len)
    }
}
