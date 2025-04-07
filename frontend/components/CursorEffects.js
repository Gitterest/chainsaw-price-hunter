import React, { useState, useEffect, useRef } from 'react';

const CursorEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRefs = useRef([]); // To store references to cursor elements

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // ---  Adapt the logic from index.js here ---
    // For example, if index.js had a function to update cursor positions:
    // updateCursorPositions(mousePosition, cursorRefs.current); 

    // ---  Include the scripts (if linking, and only on the client) ---
    // This is a simplified example; you might need to handle loading states
    // and errors.  Consider using a library like `react-script-tag` for better
    // script management.
    const script1 = document.createElement('script');
    script1.src = 'https://cursoreffects.com/src/rainbowCursor.js';
    script1.async = true;
    document.body.appendChild(script1);

    // ... include other scripts similarly ...

    const scriptIndex = document.createElement('script');
    scriptIndex.src = 'https://cursoreffects.com/index.js';
    scriptIndex.async = true;
    document.body.appendChild(scriptIndex);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      // --- Clean up scripts if necessary (e.g., remove event listeners they added) ---
      document.body.removeChild(script1);
      // ... remove other scripts ...
      document.body.removeChild(scriptIndex);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Render the cursor elements ---
  // This assumes you'll have .cursor elements.  You might need to adjust
  // based on how index.js creates/manages them.
  return (
    <>
      {Array.from({ length: 11 }).map((_, index) => (
        <div
          key={index}
          className="cursor"
          ref={(el) => (cursorRefs.current[index] = el)}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            // You might not need to set initial positions here if index.js handles it
            // left: mousePosition.x,
            // top: mousePosition.y,
          }}
        />
      ))}
    </>
  );
};

export default CursorEffects;