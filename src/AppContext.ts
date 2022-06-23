import { createContext } from "react";
import { GeoJSON } from '@global-volcanic-lightning/types';
import { PaletteMode } from '@mui/material';

const AppContext = createContext<{
    lightning: GeoJSON | null;
    loading: boolean;
    error: boolean;
    setLightning?: () => void;
    toggleLoading: () => void;
    selectedPanel: string;
    setPanel: any;
    theme: PaletteMode | undefined;
    setTheme: any;
}>({
    lightning: null,
    loading: false,
    setLightning: () => null,
    selectedPanel: 'Map',
    error: false,
    setPanel: () => null,
    toggleLoading: () => null,
    theme: 'light',
    setTheme: () => null
});

export default AppContext;
