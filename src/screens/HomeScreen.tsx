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
import React from 'react';
import {getCities} from '../api';
import {Theme, lightTheme, darkTheme} from '../theme/theme';
import {CityCard} from '../components/CityCard';

export default function HomeScreen() {
  const [data, setData] = React.useState<City[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isDarkIcon, setIsDarkIcon] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>(lightTheme);

  React.useEffect(() => {
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

  console.log(data);

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <View style={[styles.appBar, {backgroundColor: theme.colors.background}]}>
        <Text style={[styles.appBarTitle, {color: theme.colors.text}]}>
          Maravillas del mundo
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
            />
          ))
        )}
      </ScrollView>
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
});
