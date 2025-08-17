import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconButton from '@/components/IconButton';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

type Variant = 'solid' | 'transparent';

type Props = {
  title?: string;
  subtitle?: string;
  back?: boolean; // affiche le bouton retour
  onBack?: () => void; // override du retour (sinon router.back)
  right?: React.ReactNode; // actions à droite (ex: <ButtonGroup>…)
  centerTitle?: boolean; // centre le titre
  variant?: Variant; // fond "card" ou transparent
  elevated?: boolean; // ombre sous la barre
  safeTop?: boolean; // padding top = safe area
  style?: object;
};

/**
 * Toolbar en haut d'écran :
 * - Back optionnel
 * - Titre + sous-titre (ThemedText)
 * - Slot d'actions à droite (ex: ButtonGroup avec IconButtons)
 * - Variant "solid" (fond card) ou "transparent"
 */
export default function Toolbar({
  title,
  subtitle,
  back,
  onBack,
  right,
  centerTitle = false,
  variant = 'solid',
  elevated = true,
  safeTop = true,
  style,
}: Props) {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'light';
  const C = Colors[theme];

  return (
    <View
      style={[
        styles.wrapper,
        safeTop && { paddingTop: insets.top },
        variant === 'solid'
          ? {
              backgroundColor: C.card,
              borderBottomColor: C.border,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }
          : { backgroundColor: 'transparent' },
        elevated && variant === 'solid' && styles.elevated,
        style,
      ]}
    >
      <View style={styles.row}>
        <View style={styles.left}>
          {back ? (
            <IconButton
              variant="ghost"
              icon={<MaterialIcons name="arrow-back" />}
              onPress={onBack ?? router.back}
            />
          ) : null}
        </View>

        <View style={[styles.center, centerTitle && { alignItems: 'center' }]}>
          {!!title && (
            <ThemedText type="subtitle" style={{ color: C.text }}>
              {title}
            </ThemedText>
          )}
          {!!subtitle && (
            <ThemedText type="caption" style={{ color: C.muted }}>
              {subtitle}
            </ThemedText>
          )}
        </View>

        <View style={styles.right}>
          {/* Exemple : <ButtonGroup gap={0.5}> ... </ButtonGroup> */}
          {right}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // top bar height + padding vertical
    paddingHorizontal: spacing(2),
    paddingBottom: spacing(1),
  },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    width: 56,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    gap: 2,
  },
  right: {
    minWidth: 56,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  elevated: {
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
    }),
  },
});
