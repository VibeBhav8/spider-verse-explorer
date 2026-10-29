import rawCharacters from './characters.json';
import { Character } from '@/types/character';

export const characters: Character[] = rawCharacters as Character[];

export function getCharacterById(id: string): Character | undefined {
  return characters.find((char) => char.id === id);
}

export function getAllUniverses(): string[] {
  return Array.from(new Set(characters.map((char) => char.universe)));
}
