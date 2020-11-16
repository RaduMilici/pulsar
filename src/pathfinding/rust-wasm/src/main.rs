use std::fs::File;
use std::io::{Error, Read};

fn main() {
    let file_content = read_file("src/hello.txt").expect("could not read file");
    println!("file_content:\n{}", file_content);
}

fn read_file(path: &str) -> Result<String, Error> {
    let file = File::open(path);

    let mut file = match file {
        Ok(f) => f,
        Err(e) => return Err(e),
    };

    let mut content = String::new();

    match file.read_to_string(&mut content) {
        Ok(_) => Ok(content),
        Err(e) => Err(e),
    }
}
