import { createContext } from "react";
import { GeoJSON } from '@global-volcanic-lightning/types';
import { PaletteMode } from '@mui/material';

const AppContext = createContext<{
    lightning: GeoJSON | null;
    loading: boolean;
    error: boolean;
    reload: () => void;
    selectedPanel: string;
    setPanel: any;
    theme: PaletteMode | undefined;
    setTheme: any;
}>({
    lightning: null,
    loading: false,
    selectedPanel: 'Map',
    error: false,
    setPanel: () => null,
    reload: () => null,
    theme: 'light',
    setTheme: () => null
});

export default AppContext;
