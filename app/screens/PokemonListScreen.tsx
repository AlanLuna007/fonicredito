import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PokemonListScreen = ({ navigation }: any) => {
    const [pokemons, setPokemons] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPokemons = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            const data = await response.json();
            setPokemons(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchPokemons().then(() => setRefreshing(false));
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('screens/PokemonDetailScreen', { url: item.url })}
        >
            <View style={styles.itemContent}>
                <Text style={styles.itemText}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                <MaterialIcons
                    name={'arrow-right'}
                    size={30}
                    color={'blue'}
                    style={styles.icon}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={pokemons}
                keyExtractor={(item: any) => item.name}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 16,
        marginVertical: 15,
    },
    item: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginHorizontal: 10,
        elevation: 3, // Only works on Android
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginLeft: 10,
    },
});

export default PokemonListScreen;
