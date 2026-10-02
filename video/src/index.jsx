import React from 'react';
import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  interpolate,
  registerRoot,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const PAGE_WIDTH = 520;
const PAGE_HEIGHT = PAGE_WIDTH * Math.SQRT2; // A4
const GAP = 24;
const HEADER = 84;

// One CV variant: its label above, its pages scrolling top to bottom over the whole clip.
const Variant = ({label, prefix, pages}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, height} = useVideoConfig();
  const viewport = height - HEADER;
  const distance = pages * (PAGE_HEIGHT + GAP) - viewport;
  const y = interpolate(frame, [20, durationInFrames - 20], [0, distance], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{width: PAGE_WIDTH}}>
      <div
        style={{
          height: HEADER,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: 30,
          fontWeight: 700,
          color: '#1E3A5F',
        }}
      >
        {label}
      </div>
      <div style={{height: viewport, overflow: 'hidden'}}>
        <div style={{transform: `translateY(${-y}px)`, display: 'flex', flexDirection: 'column', gap: GAP}}>
          {Array.from({length: pages}, (_, i) => (
            <Img
              key={i}
              src={staticFile(`${prefix}-${i + 1}.png`)}
              style={{width: PAGE_WIDTH, height: PAGE_HEIGHT, boxShadow: '0 6px 24px rgba(0, 0, 0, 0.18)'}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Page counts come from render.sh (pdfinfo); the defaults only serve the Studio preview.
const CvPreview = ({personal, twiced}) => (
  <AbsoluteFill style={{backgroundColor: '#EEF1F5', flexDirection: 'row', justifyContent: 'center', gap: 80}}>
    <Variant label="Personal" prefix="personal" pages={personal} />
    <Variant label="twiceD-branded" prefix="twiced" pages={twiced} />
  </AbsoluteFill>
);

registerRoot(() => (
  <Composition
    id="CvPreview"
    component={CvPreview}
    width={1280}
    height={720}
    fps={30}
    durationInFrames={420}
    defaultProps={{personal: 6, twiced: 7}}
  />
));
