import { useEffect, useState } from "react";

interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  opacity: number;
  color?: string;
}

interface SpaceObject {
  id: number;
  type: 'planet' | 'comet' | 'galaxy' | 'spaceship';
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  opacity: number;
}

const StarsBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [spaceObjects, setSpaceObjects] = useState<SpaceObject[]>([]);

  useEffect(() => {
    const generateObjects = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const numStars = 150;
      const newStars: Star[] = [];
      
      // Generate stars
      for (let i = 0; i < numStars; i++) {
        // Add some colored stars for variety
        const colors = [
          undefined, // default white
          undefined, // more chance of white
          undefined, // more chance of white
          '#8BE9FD', // light blue
          '#BD93F9', // purple
          '#FFB86C', // orange
        ];
        
        const star: Star = {
          id: i,
          size: Math.random() * 2.5,
          x: Math.floor(Math.random() * windowWidth),
          y: Math.floor(Math.random() * windowHeight),
          duration: 2 + Math.random() * 3,
          opacity: 0.5 + Math.random() * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        
        newStars.push(star);
      }
      
      setStars(newStars);
      
      // Generate space objects (fewer than stars)
      const numObjects = 12; // keep this number low for performance
      const newObjects: SpaceObject[] = [];
      
      const objectTypes: Array<'planet' | 'comet' | 'galaxy' | 'spaceship'> = [
        'planet', 'planet', 'planet', 'comet', 'comet', 'comet', 'comet', 'galaxy', 'galaxy', 'spaceship'
      ];
      
      for (let i = 0; i < numObjects; i++) {
        const objectType = objectTypes[Math.floor(Math.random() * objectTypes.length)];
        const objectSize = 
          objectType === 'planet' ? 25 + Math.random() * 35 :
          objectType === 'galaxy' ? 50 + Math.random() * 100 :
          objectType === 'comet' ? 2 + Math.random() * 5 :
          10 + Math.random() * 15; // spaceship
        
        const object: SpaceObject = {
          id: i,
          type: objectType,
          size: objectSize,
          x: Math.floor(Math.random() * windowWidth),
          y: Math.floor(Math.random() * windowHeight),
          rotation: Math.random() * 360,
          speed: 20 + Math.random() * 40,
          opacity: 0.1 + Math.random() * 0.2 // keep these very subtle
        };
        
        newObjects.push(object);
      }
      
      setSpaceObjects(newObjects);
    };
    
    generateObjects();
    
    const handleResize = () => {
      generateObjects();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Stars in the background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${star.color ? '' : 'bg-white'}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}px`,
            top: `${star.y}px`,
            opacity: star.opacity,
            backgroundColor: star.color,
            animation: `twinkle ${star.duration}s ease-in-out infinite`
          }}
        />
      ))}
      
      {/* Space objects */}
      {spaceObjects.map((obj) => (
        <div
          key={obj.id}
          className="absolute"
          style={{
            left: `${obj.x}px`,
            top: `${obj.y}px`,
            opacity: obj.opacity,
            transform: `rotate(${obj.rotation}deg)`,
            animation: obj.type === 'comet' 
              ? `comet-move ${obj.speed}s linear infinite` 
              : obj.type === 'spaceship' 
                ? `spaceship-move ${obj.speed}s linear infinite` 
                : ''
          }}
        >
          {obj.type === 'planet' && (
            <div 
              className="rounded-full absolute" 
              style={{
                width: `${obj.size}px`,
                height: `${obj.size}px`,
                background: 'radial-gradient(circle, rgba(255,184,108,0.4) 0%, rgba(189,147,249,0.2) 100%)',
                boxShadow: '0 0 15px rgba(189,147,249,0.3)',
              }}
            />
          )}
          
          {obj.type === 'galaxy' && (
            <div 
              className="absolute"
              style={{
                width: `${obj.size}px`,
                height: `${obj.size/2}px`,
                transform: 'rotate(45deg)',
                background: 'radial-gradient(ellipse, rgba(139,233,253,0.2) 0%, rgba(80,250,123,0.05) 70%, transparent 100%)',
                animation: `spin ${50 + Math.random() * 50}s linear infinite`
              }}
            />
          )}
          
          {obj.type === 'comet' && (
            <div className="relative">
              <div 
                className="rounded-full absolute"
                style={{
                  width: `${obj.size}px`,
                  height: `${obj.size}px`,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 0 4px #fff'
                }}
              />
              <div 
                className="absolute"
                style={{
                  width: `${obj.size * 8}px`,
                  height: `${obj.size}px`,
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
                  transform: 'translateX(-100%)'
                }}
              />
            </div>
          )}
          
          {obj.type === 'spaceship' && (
            <div 
              className="absolute" 
              style={{
                width: `${obj.size}px`,
                height: `${obj.size/3}px`,
                backgroundColor: 'rgba(80, 250, 123, 0.2)',
                clipPath: 'polygon(0% 50%, 20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%)',
                boxShadow: '0 0 5px rgba(80, 250, 123, 0.4)',
              }}
            >
              <div 
                className="absolute"
                style={{
                  width: `${obj.size/3}px`,
                  height: `${obj.size/5}px`,
                  right: `-${obj.size/4}px`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(90deg, rgba(139,233,253,0.5) 0%, rgba(139,233,253,0) 100%)',
                }}
              />
            </div>
          )}
        </div>
      ))}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes twinkle {
            0%, 100% { opacity: ${stars[0]?.opacity || 0.8}; }
            50% { opacity: ${(stars[0]?.opacity || 0.8) / 2}; }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes comet-move {
            0% { transform: translate(0, 0) rotate(${Math.random() * 360}deg); }
            100% { transform: translate(${window.innerWidth}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg); }
          }
          
          @keyframes spaceship-move {
            0% { transform: translate(0, 0) rotate(${Math.random() * 360}deg); }
            50% { transform: translate(${window.innerWidth/4}px, ${window.innerHeight/4}px) rotate(${Math.random() * 360}deg); }
            100% { transform: translate(0, 0) rotate(${Math.random() * 360}deg); }
          }
        `
      }} />
    </div>
  );
};

export default StarsBackground;
