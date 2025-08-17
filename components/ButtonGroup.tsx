import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import Colors from '@/constants/Colors';
import { radius, spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

type Direction = 'row' | 'column';
type Align = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';

type Props = {
  children: React.ReactNode;
  direction?: Direction; // défaut: "row"
  gap?: number; // en unités spacing(n) — défaut: 1 (8px)
  wrap?: boolean; // retour à la ligne si nécessaire
  align?: Align; // justifyContent
  fullWidth?: boolean; // étire le container
  segmented?: boolean; // fond + séparateurs
  style?: ViewStyle | ViewStyle[];
};

/**
 * Range plusieurs boutons (IconButton ou Button) avec spacing cohérent.
 * - `direction="row" | "column"`
 * - `gap={1}` => spacing(1) = 8px
 * - `segmented` => fond "surface", bordure + séparateurs
 */
export default function ButtonGroup({
  children,
  direction = 'row',
  gap = 1,
  wrap = false,
  align = 'start',
  fullWidth,
  segmented = false,
  style,
}: Props) {
  const theme = useColorScheme() ?? 'light';
  const C = Colors[theme];
  const gapPx = spacing(gap);

  const nodes = React.Children.toArray(children).filter(Boolean);

  if (!segmented) {
    // 👉 on enveloppe chaque enfant pour y mettre la marge
    return (
      <View
        style={[
          {
            flexDirection: direction,
            flexWrap: wrap ? 'wrap' : 'nowrap',
            alignSelf: fullWidth ? 'stretch' : 'flex-start',
            alignItems: 'center',
            justifyContent: mapAlign(align),
          },
          style,
        ]}
      >
        {nodes.map((node, idx) => {
          const isLast = idx === nodes.length - 1;
          const marginStyle =
            direction === 'row'
              ? { marginRight: isLast ? 0 : gapPx }
              : { marginBottom: isLast ? 0 : gapPx };

          return (
            <View key={idx} style={marginStyle}>
              {node}
            </View>
          );
        })}
      </View>
    );
  }

  // Mode "segmented" : fond surface + bordure + séparateurs fins entre items
  return (
    <View
      style={[
        styles.segmented,
        {
          backgroundColor: C.surface,
          borderColor: C.border,
          borderRadius: radius.lg,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        direction === 'row' && { flexDirection: 'row' },
        direction === 'column' && { flexDirection: 'column' },
        style,
      ]}
    >
      {nodes.map((node, idx) => {
        const isLast = idx === nodes.length - 1;
        const dividerStyle =
          direction === 'row'
            ? {
                borderRightWidth: isLast ? 0 : StyleSheet.hairlineWidth,
                borderRightColor: C.border,
              }
            : {
                borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
                borderBottomColor: C.border,
              };

        return (
          <View key={idx} style={[styles.segment, dividerStyle, { padding: gapPx / 2 }]}>
            {node}
          </View>
        );
      })}
    </View>
  );
}

function mapAlign(a: Align) {
  switch (a) {
    case 'start':
      return 'flex-start';
    case 'center':
      return 'center';
    case 'end':
      return 'flex-end';
    case 'space-between':
      return 'space-between';
    case 'space-around':
      return 'space-around';
    case 'space-evenly':
      return 'space-evenly';
    default:
      return 'flex-start';
  }
}

const styles = StyleSheet.create({
  segmented: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  segment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
