use crate::common::string_tools::{is_vowel, split_string_to_vec};

pub fn to_pig_latin(text: &String) -> String {
    let words = split_string_to_vec(text);
    let mut pig_latin: Vec<String> = Vec::new();

    for word in &words {
        pig_latin.push(manipulate_pig_vowel(word));
    }

    let pig_latin: String = pig_latin.into_iter().collect();
    pig_latin
}

fn manipulate_pig_vowel(word: &String) -> String {
    let first_letter = &word[..1];

    if is_vowel(&first_letter) {
        format!("{}-hay ", word)
    } else {
        let rest_of_word = &word[1..];
        format!("{}-{}ay ", rest_of_word, first_letter)
    }
}
