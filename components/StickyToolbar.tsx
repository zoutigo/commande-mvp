import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Toolbar from '@/components/Toolbar';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// hauteur de la barre (hors SafeArea)
export const TOOLBAR_HEIGHT = 56;

type Props = React.ComponentProps<typeof Toolbar> & {
  /** valeur de scroll à connecter (voir exemple d’usage) */
  scrollY: SharedValue<number>;
};

/**
 * Toolbar sticky :
 * - reste collée en haut
 * - son fond & l’ombre apparaissent à mesure qu’on scrolle
 * - on passe `variant="transparent"` à la Toolbar de base ;
 *   le fond animé est géré ici.
 */
export default function StickyToolbar({ scrollY, ...toolbarProps }: Props) {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'light';
  const C = Colors[theme];

  // Opacité du fond en fonction du scroll
  const bgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 8, 24], [0, 0.5, 1], Extrapolation.CLAMP);
    return { opacity };
  });

  // Opacité de l’ombre
  const shadowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 24], [0, 1], Extrapolation.CLAMP);
    return { opacity };
  });

  return (
    <Animated.View
      style={[styles.wrapper, { paddingTop: insets.top, height: insets.top + TOOLBAR_HEIGHT }]}
    >
      {/* Fond animé (couleur de carte) */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.fill,
          {
            backgroundColor: C.card,
            borderBottomColor: C.border,
            borderBottomWidth: StyleSheet.hairlineWidth,
          },
          bgStyle,
        ]}
      />

      {/* Ombre animée */}
      <Animated.View pointerEvents="none" style={[styles.shadow, shadowStyle]} />

      {/* La toolbar “transparente”, non-animée */}
      <Toolbar {...toolbarProps} variant="transparent" elevated={false} safeTop={false} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
  shadow: {
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 8,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
    }),
  },
});
