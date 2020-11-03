use rand::{thread_rng, Rng};

pub struct Damage {
    pub min: i8,
    pub max: i8,
}

// public
impl Damage {
    pub fn roll(&self) -> i8 {
        thread_rng().gen_range(self.min, self.max + 1)
    }
}
