import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {getCities} from '../api';
import {Theme, lightTheme, darkTheme} from '../theme/theme';
import {CityCard} from '../components/CityCard';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {City} from '../interface/City';
import {CityDetailModal} from '../components/CityDetailModal';
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [data, setData] = useState<City[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isDarkIcon, setIsDarkIcon] = useState(false);
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      setError(null);
      const response = await getCities();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cities');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCities();
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme.dark ? lightTheme : darkTheme));
    setIsDarkIcon(prev => !prev);
  };

  // BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback((city: City) => {
    setSelectedCity(city);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.centerContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.centerContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <Text style={[styles.errorText]}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <View style={[styles.appBar, {backgroundColor: theme.colors.background}]}>
        <Text style={[styles.appBarTitle, {color: theme.colors.text}]}>
          Maravillas
        </Text>
        <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
          <Text>{isDarkIcon ? '🌙' : '☀️'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {data.length === 0 ? (
          <Text style={[styles.emptyText, {color: theme.colors.text}]}>
            No cities found
          </Text>
        ) : (
          data.map((item, index) => (
            <CityCard
              key={index}
              title={item.titulo}
              description={item.descripcion}
              imageUrl={item.imagen}
              theme={theme}
              onPress={() => {
                handlePresentModalPress(item);
              }}
            />
          ))
        )}
      </ScrollView>

      <CityDetailModal
        bottomSheetModalRef={bottomSheetModalRef}
        selectedCity={selectedCity}
        theme={theme}
        onSheetChanges={handleSheetChanges}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  appBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  iconButton: {
    padding: 8,
  },

  // BottomSheetModal
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  bottomSheetContent: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
});
