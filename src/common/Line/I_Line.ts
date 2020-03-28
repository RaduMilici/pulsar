import Vector from '../Vector'

export default interface I_Line {
    length: number;
    
      midpoint: Vector;
    
      clone(): I_Line;
    
      equals(line: I_Line): boolean;
    
      intersects(line: I_Line): boolean;
    
      intersectionPoint(line: I_Line): Vector;
    
      makeDisjoinedSets(): void;
    
      static PointsFromArray(lines: I_Line[]): Vector[];
    
      static IsUnique(line: I_Line, lines: I_Line[]): boolean;
    
      static RemoveDuplicates(lines: I_Line[]): I_Line[];
}
