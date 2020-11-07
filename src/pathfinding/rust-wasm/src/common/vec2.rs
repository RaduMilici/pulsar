#[derive(Debug)]
pub struct Vec2 {
    pub x: i32,
    pub y: i32,
}

impl Vec2 {
    pub fn magnitude(&self) -> f64 {
        let sum = (self.x * self.x + self.y * self.y) as f64;
        sum.sqrt()
    }

    pub fn distance_to(&self, other: &Vec2) -> f64 {
        self.sub(other).magnitude()
    }

    pub fn dot_product(&self, other: &Vec2) -> i32 {
        self.x * other.x + self.y * other.y
    }

    pub fn sub(&self, other: &Vec2) -> Vec2 {
        Vec2 {
            x: self.x - other.x,
            y: self.y - other.y,
        }
    }
}
