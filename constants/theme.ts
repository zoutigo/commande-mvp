// constants/theme.ts
export const spacing = (n: number) => n * 8;

export const radius = {
  xs: 6,
  sm: 10,
  md: 12,
  lg: 16,
  pill: 999,
};

export const typography = {
  default: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 26,
  },
  caption: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  link: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    lineHeight: 30,
    color: '#0a7ea4',
  },
};
