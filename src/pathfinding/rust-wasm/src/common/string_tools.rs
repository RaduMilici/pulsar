pub fn is_vowel(character: &str) -> bool {
    let vowels = ["a", "e", "i", "o", "u"];
    vowels.contains(&character)
}

pub fn split_string_to_vec(text: &String) -> Vec<String> {
    let words: Vec<String> =
        text.split_whitespace().map(String::from).collect();
    words
}
