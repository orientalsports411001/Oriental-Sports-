import React from 'react';
import { Target, MapPin, Layers, Building2 } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export const WhyOriental: React.FC = () => {
  const pillars = [
    {
      icon: Target,
      number: '01',
      title: 'SPORTS EXPERTISE',
      desc: 'Our staff understands the mechanics of the game. From custom bat knocking and digital electronic racquet stringing to tournament paddle balance and weight grading.',
    },
    {
      icon: MapPin,
      number: '02',
      title: 'LOCAL PUNE KNOWLEDGE',
      desc: 'Deep familiarity with Pune’s playing conditions—seasonal humidity swings affecting cricket willow, summer heat on outdoor acrylic courts, and Deccan red clay vs hardcourt requirements.',
    },
    {
      icon: Layers,
      number: '03',
      title: 'GEAR + INFRASTRUCTURE',
      desc: 'The only sports house in Pune connecting individual athletic equipment with complete turn-key court construction, synthetic turf arenas, and institutional sports setups.',
    },
    {
      icon: Building2,
      number: '04',
      title: 'PHYSICAL STORE IN CAMP',
      desc: 'A physical presence on MG Road in Camp where you can inspect equipment before buying, test grips in hand, discuss court blueprints, and receive honest athletic guidance.',
    },
  ];

  return (
    <section className="section-padding bg-dark" aria-label="Why Oriental Sports">
      <div className="container">
        {/* Section Heading */}
        <div style={{ maxWidth: '720px', marginBottom: 'var(--space-3xl)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-plate-gold)',
              marginBottom: '10px',
            }}
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-plate-gold)' }} />
            <span>THE ORIENTAL ADVANTAGE</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display-xl)',
              fontSize: 'clamp(2.75rem, 6.5vw, 4.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--color-pure-white)',
              margin: '0 0 16px 0',
            }}
          >
            WHY ORIENTAL SPORTS
          </h2>

          <p style={{ color: '#D1CBBF', fontSize: '1.0625rem', lineHeight: 1.5, fontFamily: 'var(--font-heading)' }}>
            Built on genuine athletic knowledge and physical presence in Pune.
          </p>
        </div>

        {/* 4 Value Props Grid with SpotlightCards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <SpotlightCard
                key={pillar.number}
                style={{
                  backgroundColor: '#161616',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  padding: '32px 24px',
                }}
                spotlightColor="rgba(201, 162, 39, 0.15)"
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '2px',
                        backgroundColor: 'rgba(201, 162, 39, 0.12)',
                        border: '1px solid rgba(201, 162, 39, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-plate-gold)',
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-display-xl)',
                        fontSize: '2rem',
                        color: 'rgba(201, 162, 39, 0.5)',
                        lineHeight: 1,
                      }}
                    >
                      {pillar.number}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display-xl)',
                      fontSize: '1.75rem',
                      lineHeight: 0.95,
                      color: 'var(--color-pure-white)',
                      marginBottom: '12px',
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#B0AAA0',
                      lineHeight: 1.55,
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
