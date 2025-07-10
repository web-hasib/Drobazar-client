import React from 'react';

const ThemeButton = ({label,onClick}) => {
    return (
         <button
         onClick={onClick}
      className={`cursor-pointer
        px-4 py-2 rounded-full 
        flex items-center gap-2 
        text-slate-500
        shadow-[-2px_-2px_5px_rgba(255,_255,_255,_0.8),_2px_2px_5px_rgba(0,_0,_0,_0.25)]
        
        transition-all

        hover:shadow-[-1px_-1px_2px_rgba(255,_255,_255,_0.6),_1px_1px_2px_rgba(0,_0,_0,_0.3),inset_-1px_-1px_3px_rgba(255,_255,_255,_1),inset_1x_1px_4px_rgba(0,_0,_0,_0.3)]
        hover:text-violet-500
    `}
    >
      
      {label}
    </button>
    );
};

export default ThemeButton;