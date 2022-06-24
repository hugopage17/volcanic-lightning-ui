import { useState, useEffect } from 'react';
import { PaletteMode } from '@mui/material';

 const useSetTheme = () => {
    const themeDefault = localStorage.getItem('theme') as PaletteMode | undefined;
    const [theme, setTheme] = useState<PaletteMode | undefined>(themeDefault);

    useEffect(() => {
        localStorage.setItem('theme', theme as string ?? 'light');
    }, [theme]);

    return { theme, setTheme } 
}

export default useSetTheme;
