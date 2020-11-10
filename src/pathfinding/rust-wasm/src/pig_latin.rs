pub fn to_pig_latin(text: &String) -> String {
    let words: Vec<String> =
        text.split_whitespace().map(String::from).collect();
    let mut pig_latin: Vec<String> = Vec::new();

    for word in &words {
        pig_latin.push(manipulate_pig_vowel(word));
    }

    let pig_latin: String = pig_latin.into_iter().collect();
    pig_latin
}

fn manipulate_pig_vowel(word: &String) -> String {
    let first_letter = &word[..1];
    let rest_of_word = &word[1..];

    if is_vowel(&first_letter) {
        format!("{}{}-hay ", first_letter, rest_of_word)
    } else {
        format!("{}-{}ay ", rest_of_word, first_letter)
    }
}

fn is_vowel(character: &str) -> bool {
    let vowels = ["a", "e", "i", "o", "u"];
    vowels.contains(&character)
}
