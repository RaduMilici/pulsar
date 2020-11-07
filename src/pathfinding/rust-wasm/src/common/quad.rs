#[derive(Debug)]
pub struct Quad {
    pub width: u32,
    pub height: u32,
}

impl Quad {
    pub fn area(&self) -> u32 {
        self.width * self.height
    }

    pub fn is_square(&self) -> bool {
        self.width == self.height
    }
}
