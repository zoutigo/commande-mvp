import React, { ReactElement } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import Colors from '@/constants/Colors';
import { radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

type Variant = 'solid' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

// 👇 L’icône est un ReactElement qui accepte (optionnellement) size & color
type IconEl = ReactElement<{ size?: number; color?: string }>;

type Props = {
  icon: IconEl;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  testID?: string;
};

export default function IconButton({
  icon,
  onPress,
  variant = 'solid',
  size = 'md',
  disabled,
  loading,
  style,
  testID,
}: Props) {
  const theme = useColorScheme() ?? 'light';
  const C = Colors[theme];

  const { dim, iconSize } = sizeMap[size];
  const palette = getPalette(variant, C);
  const isDisabled = !!disabled || !!loading;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      android_ripple={{ color: C.ripple, foreground: true }}
      disabled={isDisabled}
      style={[
        styles.base,
        {
          width: dim,
          height: dim,
          borderRadius: radius.lg,
          justifyContent: 'center',
          alignItems: 'center',
        },
        palette.container,
        isDisabled && {
          backgroundColor:
            variant === 'ghost' || variant === 'outline' ? 'transparent' : C.disabledBg,
          borderColor: variant === 'outline' ? C.disabledBg : 'transparent',
          opacity: 0.5,
        },
        style as any,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={palette.iconColor} />
      ) : (
        // ✅ TS sait maintenant que size/color sont valides
        React.cloneElement(icon, {
          size: iconSize,
          color: isDisabled ? C.disabledText : palette.iconColor,
        })
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderWidth: 1 },
});

const sizeMap: Record<Size, { dim: number; iconSize: number }> = {
  sm: { dim: 32, iconSize: 16 },
  md: { dim: 44, iconSize: 20 },
  lg: { dim: 52, iconSize: 24 },
};

function getPalette(variant: Variant, C: typeof Colors.light) {
  switch (variant) {
    case 'solid':
      return {
        container: { backgroundColor: C.accent, borderColor: C.accent },
        iconColor: 'white',
      };
    case 'danger':
      return {
        container: { backgroundColor: C.danger, borderColor: C.danger },
        iconColor: 'white',
      };
    case 'outline':
      return {
        container: { backgroundColor: 'transparent', borderColor: C.border },
        iconColor: C.brand,
      };
    case 'ghost':
    default:
      return {
        container: { backgroundColor: 'transparent', borderColor: 'transparent' },
        iconColor: C.brand,
      };
  }
}
