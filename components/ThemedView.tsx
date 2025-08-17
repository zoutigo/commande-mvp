import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { radius, spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewVariant =
  | 'background' // écran entier (par défaut)
  | 'surface' // blocs, listes
  | 'card' // carte posée
  | 'transparent';

export type ThemedViewProps = ViewProps & {
  lightColor?: string; // override manuel (clair)
  darkColor?: string; // override manuel (sombre)
  variant?: ThemedViewVariant;

  padded?: boolean | number; // true = p-16 (spacing(2)), number = spacing(n)
  rounded?: keyof typeof radius | boolean; // true = md
  bordered?: boolean; // ajoute une bordure discrète
  elevated?: boolean; // ombre légère (carte)
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  variant = 'background',
  padded,
  rounded,
  bordered,
  elevated,
  ...otherProps
}: ThemedViewProps) {
  // Couleurs depuis le thème (hook existant)
  const background = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant === 'surface'
      ? 'surface'
      : variant === 'card'
        ? 'card'
        : variant === 'transparent'
          ? 'transparent'
          : 'background',
  );

  const borderColor = useThemeColor({}, 'border');

  // Padding
  const padding =
    padded === true ? spacing(2) : typeof padded === 'number' ? spacing(padded) : undefined;

  // Radius
  const borderRadius =
    rounded === true ? radius.md : typeof rounded === 'string' ? radius[rounded] : undefined;

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: background },
        bordered && { borderWidth: 1, borderColor },
        elevated && styles.elevated,
        padding !== undefined && { padding },
        borderRadius !== undefined && { borderRadius },
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  base: {},
  elevated: {
    // Ombre douce cross-platform
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
});
