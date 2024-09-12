import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const PokemonDetailScreen = ({ route }: any) => {
  const { url } = route.params;
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, [url]);

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` }}
      />
      <Text style={styles.title}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Altura: {pokemon.height / 10} m</Text>
        <Text style={styles.info}>Peso: {pokemon.weight / 10} kg</Text>
      </View>
      <Text style={styles.subtitle}>Habilidades:</Text>
      <View style={styles.list}>
        {pokemon.abilities.map((ability: any, index: number) => (
          <Text key={index} style={styles.listItem}>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</Text>
        ))}
      </View>
      <Text style={styles.subtitle}>Movimientos:</Text>
      <View style={styles.list}>
        {pokemon.moves.slice(0, 5).map((move: any, index: number) => (
          <Text key={index} style={styles.listItem}>{move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  list: {
    marginBottom: 16,
    textAlign: 'center'
},
listItem: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center'
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PokemonDetailScreen;
