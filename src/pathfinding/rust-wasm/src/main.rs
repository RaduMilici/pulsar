trait Summary {
    fn summarize(&self) -> String {
        String::from("Read more...")
    }
}

trait Display {
    fn display(&self) -> String;
}

struct Tweet {
    author: String,
    content: String,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}...", self.author, &self.content[..12])
    }
}

impl Display for Tweet {
    fn display(&self) -> String {
        format!("{}", &self.content)
    }
}

fn main() {
    let tweets: [Tweet; 2] = [
        Tweet {
            author: String::from("test author 1"),
            content: String::from("content1 123456789"),
        },
        Tweet {
            author: String::from("test author 2"),
            content: String::from("content2 123456789"),
        },
    ];

    print_summaries(&tweets);
    print_summaries_generic(&tweets);
}

fn print_summaries(items: &[impl Summary + Display]) {
    println!("******using impl******");
    for item in items {
        println!("summary: {}", item.summarize());
        println!("content: {}", item.display());
    }
}

fn print_summaries_generic<T>(items: &[T])
where
    T: Summary + Display,
{
    println!("******using generics******");
    for item in items {
        println!("summary: {}", item.summarize());
        println!("content: {}", item.display());
    }
}
