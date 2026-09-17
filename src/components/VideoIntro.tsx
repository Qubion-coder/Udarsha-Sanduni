import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface VideoIntroProps {
  onComplete: () => void;
  onMusicStart: () => void;
  readyToTransition: boolean;
}

export const VideoIntro: React.FC<VideoIntroProps> = ({ onComplete, onMusicStart, readyToTransition }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnded = () => {
    onMusicStart();
    onComplete();
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-stone-900 flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <video
        ref={videoRef}
        src="/Wedding_invitation_intro_video_20260917235539.mp4"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isPlaying ? 'blur-none opacity-100' : 'blur-md opacity-60'}`}
        playsInline
        onEnded={handleVideoEnded}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center pointer-events-none">
        <div className="absolute top-[15%] flex flex-col items-center">
           <h2 className="text-white/90 text-[11px] sm:text-xs font-sans tracking-[0.4em] uppercase mb-6 drop-shadow-md">
             Wedding Invitation
           </h2>
           <h1 className="text-white text-5xl sm:text-6xl font-names drop-shadow-xl">
             Udarsha <span className="font-light mx-2">&</span> Sanduni
           </h1>
        </div>
      </div>
      
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
          <button
            onClick={handlePlayClick}
            disabled={!readyToTransition}
            className={`absolute bottom-[20%] px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-sans tracking-[0.2em] uppercase text-[10px] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] ${!readyToTransition ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:bg-white/30 hover:border-white/50'}`}
          >
            {readyToTransition ? 'View Invitation' : 'Loading...'}
          </button>
        </div>
      )}
    </motion.div>
  );
};
