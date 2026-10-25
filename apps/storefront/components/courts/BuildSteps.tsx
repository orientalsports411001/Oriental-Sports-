'use client';

import React from 'react';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

/** The stages of a court build — a real sequence, so the numbers carry meaning. */
export const BUILD_STEPS = [
  { name: 'Site Survey & Feasibility', note: 'On-site technical evaluation to assess ground contours, soil conditions, laser levels, and playing orientation.' },
  { name: 'Sub-Base & Drainage', note: 'Excavation, precision grading, and asphalt or PCC sub-base engineering with dual-plane drainage gradient.' },
  { name: 'Surface System Application', note: 'Application of multi-layer acrylic cushion coats, synthetic turf, sprung timber, or modular sports tiles.' },
  { name: 'Fencing, Lighting & Enclosures', note: 'Erection of perimeter fencing, structural glass cages, tournament-grade LED floodlights, and in-ground posts.' },
  { name: 'Line Marking & Handover', note: 'Regulation boundary line application, net installation, joint inspection walk-through, and client handover.' },
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
