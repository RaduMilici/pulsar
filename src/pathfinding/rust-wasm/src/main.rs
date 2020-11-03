mod armor_class;
mod character;
mod damage;

fn main() {
    let mut zug = character::Character {
        name: String::from("Zug"),
        armor_class: armor_class::ArmorClass::Plate,
        health: 127,
        damage: damage::Damage { min: 10, max: 30 },
    };

    let mut crug = character::Character {
        name: String::from("Crug"),
        armor_class: armor_class::ArmorClass::Plate,
        health: 127,
        damage: damage::Damage { min: 10, max: 30 },
    };

    zug.attack(&mut crug);
    crug.attack(&mut zug);

    let mut round_number = 0;

    loop {
        round_number = round_number + 1;
        println!("---round {}---", round_number);
        crug.attack(&mut zug);
        if zug.is_dead() {
            break;
        }

        zug.attack(&mut crug);
        if crug.is_dead() {
            break;
        }
    }
}
