import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { characters, getCharacterById } from "@/data/characters";
import CharacterDetailView from "@/components/character/CharacterDetailView";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return characters.map((char) => ({
    id: char.id,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const character = getCharacterById(params.id);

  if (!character) {
    return {
      title: "Hero Dossier Not Found | Spider-Verse Explorer",
      description: "Classified dimensional data not found.",
    };
  }

  return {
    title: `${character.name} (${character.universe}) | Spider-Verse Archive`,
    description: character.bio,
    openGraph: {
      title: `${character.name} - ${character.alias}`,
      description: character.bio,
      images: [
        {
          url: character.imageUrl,
          alt: character.name,
        },
      ],
    },
  };
}

export default function CharacterPage({ params }: PageProps) {
  const character = getCharacterById(params.id);

  if (!character) {
    notFound();
  }

  return (
    <CharacterDetailView
      character={character}
      allCharacters={characters}
    />
  );
}
