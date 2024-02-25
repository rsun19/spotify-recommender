import React from 'react';

interface PlayerProps {
    current: Record<string, string>;
    next: Record<string, string>;
}

const Player: React.FC<PlayerProps> = ({current, next}) => {
    return (
        <div id="progress-bar">
            {/* EDITED FROM FLOWBITE: https://flowbite.com/docs/components/progress/ */}
            <span className="text-base font-medium text-blue-700 mb-1">{current.song}</span>
            <div className="flex justify-between">
                <span className="text-base font-medium text-blue-700 mb-1">{current.artist}</span>
                <span className="text-sm font-medium text-blue-700">{current.progress}</span>
            </div>
            <div className='flex items-center justify-between'>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: current.progress }}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;