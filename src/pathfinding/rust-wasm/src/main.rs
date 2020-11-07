mod common {
    pub mod quad;
    pub mod vec2;
}

use common::{quad::Quad, vec2::Vec2};

fn main() {
    let pos_1 = Vec2 {x: 3, y: 3};
    let pos_2 = Vec2 {x: 5, y: 5};

    println!("pos_1 sub pos_2: {:?}", pos_1.sub(&pos_2));
    println!("pos_1 dot prod pos_2: {}", pos_1.dot_product(&pos_2));
    println!("pos_1 distance to pos_2: {}", pos_1.distance_to(&pos_2));

    let quad = Quad {width: 15, height: 13};
    println!("quad area: {}", quad.area());
    println!("quad is_square: {}", quad.is_square());

    let positions = vec![&pos_1, &pos_2];

    for position in &positions {
        println!("position {:?}", position);
    }
    println!("position {:?}", positions);

    #[derive(Debug)]
    enum PossiblePositions {
        Vector2(Vec2),
        Tuple((i32, i32)),
    }

    let mut positions = vec![
        PossiblePositions::Vector2(pos_1),
        PossiblePositions::Vector2(pos_2),
        PossiblePositions::Tuple((2, 3)),
    ];

    positions.push(PossiblePositions::Tuple((4, 5)));

    for position in &positions {
        println!("position {:?}", position);
    }
}
