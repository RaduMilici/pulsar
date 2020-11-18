use std::fs::{read_to_string, File};
use std::io::{Error, Read};

fn main() {
    let path = "src/hello.txt";
    let file_content = read_file(path).expect("could not read file");
    println!("*file_content:\n{}", file_content);

    let file_content =
        read_file_with_error_propagation(path).expect("could not read file");
    println!("*file_content from error propagation:\n{}", file_content);

    let file_content =
        read_file_with_read_to_string(path).expect("could not read file");
    println!("*file_content from read_to_string:\n{}", file_content);
}

pub fn read_file(path: &str) -> Result<String, Error> {
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

fn read_file_with_error_propagation(path: &str) -> Result<String, Error> {
    let mut content = String::new();
    File::open(path)?.read_to_string(&mut content)?;
    Ok(content)
}

fn read_file_with_read_to_string(path: &str) -> Result<String, Error> {
    read_to_string(path)
}
