export const pickOne = <T>(list: T[]): T => list[Math.floor(Math.random() * list.length)] as T;
