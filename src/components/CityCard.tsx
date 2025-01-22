import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Theme } from '../theme/theme';

interface CityCardProps {
  title: string;
  description: string;
  imageUrl: string;
  theme: Theme;
}

export const CityCard = ({ title, description, imageUrl, theme }: CityCardProps) => {
  return (
    <View style={[styles.item, { backgroundColor: theme.colors.card }]}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.colors.description }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 