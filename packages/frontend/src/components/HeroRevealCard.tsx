import type { HeroReveal } from '@king-of-history/shared';

interface HeroRevealCardProps {
  hero: HeroReveal;
}

export function HeroRevealCard({ hero }: HeroRevealCardProps) {
  return (
    <div className="panel hero-reveal-card">
      <h2>{hero.name}</h2>
      <p>{hero.biography}</p>
    </div>
  );
}

