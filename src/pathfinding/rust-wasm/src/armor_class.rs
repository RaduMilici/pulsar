pub enum ArmorClass {
    Plate,
}

// public
impl ArmorClass {
    pub fn mitigation_percentage(armor_class: &ArmorClass) -> f32 {
        match armor_class {
            ArmorClass::Plate => 0.4,
        }
    }
}
