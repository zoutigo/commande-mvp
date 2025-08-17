// constants/Colors.ts

// Palette marque
export const BRAND_ORANGE = '#F04E23'; // P (logo)
export const BRAND_TEAL = '#007A83'; // “auline” (logo)

// Thème clair & sombre (clés attendues par les Themed* Expo + extras)
const Colors = {
  light: {
    text: '#102A43',
    background: '#FFFFFF',
    tint: BRAND_TEAL,
    tabIconDefault: '#9AA5B1',
    tabIconSelected: BRAND_TEAL,

    // supplémentaires (utiles partout)
    brand: BRAND_TEAL,
    accent: BRAND_ORANGE,
    card: '#FFFFFF',
    surface: '#F7FAFC',
    muted: '#627D98',
    border: '#E1E8F0',
    success: '#12B886',
    danger: '#E03131',
    transparent: 'transparent', // ✅ ajouté
    neutral0: '#FFFFFF',
    neutral50: '#F7FAFC',
    neutral100: '#EDF2F7',
    neutral200: '#E2E8F0',
    neutral300: '#CBD5E0',
    neutral400: '#A0AEC0',
    neutral500: '#718096',
    neutral600: '#4A5568',
    neutral700: '#2D3748',
    neutral800: '#1A202C',
    neutral900: '#0F141A',

    // états utiles
    disabledBg: '#EDF2F7', // gris clair
    disabledText: '#9AA5B1', // gris moyen
    ripple: 'rgba(0,0,0,0.08)',
  },
  dark: {
    text: '#E6F6F8',
    background: '#0D1B1E',
    tint: '#59B3B8',
    tabIconDefault: '#4A6B74',
    tabIconSelected: '#8CE1E5',

    brand: '#59B3B8',
    accent: BRAND_ORANGE,
    card: '#0F2930',
    surface: '#14343A',
    muted: '#86A3AD',
    border: '#1F3C44',
    success: '#2FDBA9',
    danger: '#FF6B6B',
    transparent: 'transparent', // ✅ ajouté
    neutral0: '#0D1B1E',
    neutral50: '#0F2930',
    neutral100: '#14343A',
    neutral200: '#1F3C44',
    neutral300: '#2B4B53',
    neutral400: '#3D5F66',
    neutral500: '#567C83',
    neutral600: '#6F9399',
    neutral700: '#89AAB0',
    neutral800: '#A4C1C6',
    neutral900: '#C3E7E9',

    disabledBg: '#1F3C44',
    disabledText: '#6F9399',
    ripple: 'rgba(255,255,255,0.12)',
  },
};

export default Colors;
