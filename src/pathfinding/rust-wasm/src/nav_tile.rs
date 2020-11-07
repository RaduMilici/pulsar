use super::Vec2;

pub struct NavTile {
    position: Vec2,
}

impl NavTile {
    pub fn new(position: Vec2) -> NavTile {
        NavTile { position }
    }

    pub fn distance_to(&self, other: NavTile) -> f64 {
        self.position.distance_to(other.position)
    }
}
