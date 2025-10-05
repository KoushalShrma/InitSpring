import React from 'react';

interface AnimatedKLogoProps {
    size?: number;
}

export const AnimatedKLogo: React.FC<AnimatedKLogoProps> = ({ size = 80 }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Outer rotating ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-neon border-r-brand-neon animate-spin"></div>
                
                {/* Inner pulsing ring */}
                <div className="absolute inset-2 rounded-full border-2 border-brand-neon opacity-50 animate-pulse"></div>
                
                {/* The K letter */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                        className="font-bold text-brand-neon animate-pulse"
                        style={{ fontSize: size * 0.5 }}
                    >
                        K
                    </span>
                </div>
                
                {/* Orbiting dots */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                    <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-brand-neon rounded-full"></div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 bg-cyan-400 rounded-full"></div>
                </div>
            </div>
            
            <div className="text-center">
                <p className="text-brand-neon font-semibold animate-pulse">
                    Building your project...
                </p>
                <p className="text-dark-text-secondary text-sm mt-1">
                    
                </p>
            </div>
        </div>
    );
};
