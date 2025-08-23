import { isWeb } from '@gluestack-ui/nativewind-utils/IsWeb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export const COLORS_IMPORTED = {
    SUCCESS_BACKGROUND: '#EBF4EB',
    PRIMARY_COLOR: '#199F65',
    DASHED_BORDER: '#C8CACF'
};

export const THEME = {
    AUTO: 'auto',
    LIGHT: 'light',
    DARK: 'dark'
} as const;

// Define theme-related types
export type ColorMode = 'light' | 'dark';
export type ThemeOption = 'auto' | ColorMode;

// Interface for the context value
export interface ColorModeContextType {
    colorMode: ColorMode;
    toggleColorMode: () => void;
    setColorMode: (mode: ColorMode) => void;
    selectedTheme: ThemeOption;
    setSelectedTheme: (theme: ThemeOption) => void;
}

// Default context value
const defaultContextValue: ColorModeContextType = {
    colorMode: 'light',
    toggleColorMode: () => {},
    setColorMode: () => {},
    selectedTheme: 'auto',
    setSelectedTheme: () => {}
};

// Create the context
export const ColorContext = createContext<ColorModeContextType>(defaultContextValue);

// Storage key constant
export const THEME_STORAGE_KEY = 'THEME_MODE';

// Props for the provider
interface ColorModeProviderProps {
    children: ReactNode;
}

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
    const [colorMode, setColorMode] = useState<ColorMode>('light');
    const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('auto');

    // Load initial theme from storage
    useEffect(() => {
        const loadInitialTheme = async () => {
            try {
                const storedTheme = await getStoredTheme();
                const theme = storedTheme ?? 'auto';
                setSelectedTheme(theme);
                applyTheme(theme);
            } catch (error) {
                applyTheme('auto'); // Fallback to auto on error
            }
        };

        loadInitialTheme();
    }, []);

    // Sync theme across browser tabs (web only)
    useEffect(() => {
        if (!isWeb) return;

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === THEME_STORAGE_KEY && event.newValue) {
                const newTheme = event.newValue as ThemeOption;
                setSelectedTheme(newTheme);
                applyTheme(newTheme);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []); // No dependencies since this is a one-time setup

    // Listen to system theme changes when in 'auto' mode
    useEffect(() => {
        if (selectedTheme !== 'auto') return;

        const updateSystemTheme = (scheme: 'dark' | 'light' | null) => {
            setColorMode(scheme === 'dark' ? 'dark' : 'light');
        };

        if (isWeb) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const listener = (e: MediaQueryListEvent) => updateSystemTheme(e.matches ? 'dark' : 'light');
            mediaQuery.addEventListener('change', listener);
            return () => mediaQuery.removeEventListener('change', listener);
        } else {
            const listener = ({ colorScheme }: Appearance.AppearancePreferences) => updateSystemTheme(colorScheme ?? 'light');
            const subscription = Appearance.addChangeListener(listener);
            return () => subscription.remove();
        }
    }, [selectedTheme]);

    // Get theme from storage
    const getStoredTheme = async (): Promise<ThemeOption | null> => {
        const storedValue = isWeb ? localStorage.getItem(THEME_STORAGE_KEY) : await AsyncStorage.getItem(THEME_STORAGE_KEY);
        return storedValue === 'light' || storedValue === 'dark' || storedValue === 'auto' ? (storedValue as ThemeOption) : null;
    };

    // Persist theme to storage
    const persistTheme = async (theme: ThemeOption) => {
        try {
            if (isWeb) {
                localStorage.setItem(THEME_STORAGE_KEY, theme);
            } else {
                await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
            }
        } catch (error) {}
    };

    // Apply the theme based on selection or system preference
    const applyTheme = (theme: ThemeOption) => {
        if (theme === 'light' || theme === 'dark') {
            setColorMode(theme);
        } else {
            // Auto: Use system preference
            const systemColorScheme = isWeb
                ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light'
                : Appearance.getColorScheme() || 'light';
            setColorMode(systemColorScheme);
        }
    };

    // Toggle between light and dark modes
    const toggleColorMode = () => {
        const newMode = colorMode === 'dark' ? 'light' : 'dark';
        setColorMode(newMode);
        setSelectedTheme(newMode);
        persistTheme(newMode);
    };

    // Handle theme change
    const handleThemeChange = (theme: ThemeOption) => {
        setSelectedTheme(theme);
        applyTheme(theme);
        persistTheme(theme);
    };

    return (
        <ColorContext.Provider
            value={{
                colorMode,
                toggleColorMode,
                setColorMode,
                selectedTheme,
                setSelectedTheme: handleThemeChange
            }}>
            {children}
        </ColorContext.Provider>
    );
};

// Custom hook to use the color mode context
export const useColorMode = (): ColorModeContextType => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error('useColorMode must be used within a ColorModeProvider');
    }
    return context;
};
