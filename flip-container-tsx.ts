import React, { ReactNode } from 'react';
import '../styles/flip.css';

interface FlipContainerProps {
  isFlipped: boolean;
  children: ReactNode[];
}

const FlipContainer: React.FC<FlipContainerProps> = ({ isFlipped, children }) => {
  return (
    <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
      <div className="flipper">
        <div className="front">{children[0]}</div>
        <div className="back">{children[1]}</div>
      </div>
    </div>
  );
};

export default FlipContainer;
