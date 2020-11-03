use crate::armor_class;
use crate::damage;

pub struct Character {
    pub name: String,
    pub armor_class: armor_class::ArmorClass,
    pub health: i8,
    pub damage: damage::Damage,
}

// public
impl Character {
    pub fn is_dead(&self) -> bool {
        if self.health <= 0 {
            println!("{} is dead", self.name);
            return true;
        }

        return false;
    }

    pub fn attack(&self, target: &mut Character) {
        target.take_damage(self.damage.roll());
    }
}

// private
impl Character {
    fn take_damage(&mut self, damage: i8) {
        if self.is_dead() {
            return;
        };

        let mitigated_damage = self.mitigate_damage(damage);
        println!(
            "{} took {} damage ({} mitigated)",
            self.name,
            mitigated_damage,
            damage - mitigated_damage
        );
        self.health -= mitigated_damage;
    }

    fn mitigate_damage(&self, damage: i8) -> i8 {
        let damage_mitigated =
            damage as f32 * armor_class::ArmorClass::mitigation_percentage(&self.armor_class);
        damage - damage_mitigated as i8
    }
}
