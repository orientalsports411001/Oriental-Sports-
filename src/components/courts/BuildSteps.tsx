import React from 'react';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

/** The stages of a court build — a real sequence, so the numbers carry meaning. */
export const BUILD_STEPS = [
  { name: 'Site visit', note: 'We measure the site, check levels and drainage, and agree the layout with you.' },
  { name: 'Sub-base', note: 'Ground preparation and a stable base laid to a drainage slope.' },
  { name: 'Surface', note: 'Acrylic, cushioned acrylic, modular tiles, timber or turf — chosen by sport.' },
  { name: 'Fencing, nets & lights', note: 'Perimeter fencing, posts and nets, and floodlighting for evening play.' },
  { name: 'Lines & handover', note: 'Regulation line marking, a final walk-through, and the court is yours.' },
];

export const BuildSteps: React.FC<{ title?: string }> = ({ title = 'What a build covers' }) => (
  <div className="build-steps-block">
    <Reveal as="p" className="eyebrow">{title}</Reveal>
    <Stagger as="ol" className="build-steps" stagger={0.08}>
      {BUILD_STEPS.map((step, i) => (
        <StaggerItem as="li" key={step.name} className="build-step">
          <span className="build-step-num" aria-hidden="true">{i + 1}</span>
          <span className="build-step-name">{step.name}</span>
          <span className="build-step-note">{step.note}</span>
        </StaggerItem>
      ))}
    </Stagger>
  </div>
);

export default BuildSteps;
