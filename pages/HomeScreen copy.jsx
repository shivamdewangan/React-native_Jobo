/* eslint-disable react/prop-types */
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Linking,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import {
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider,
    Button,
} from "react-native-paper";
import { useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";

const Generate = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const { theme } = useMaterial3Theme();
    let [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [links, setLinks] = useState([]);
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await await new Promise(res => setTimeout(() => res([
                    {
                        "name": "Food",
                        "item_link": "https://google.com/search?q=food",
                        "cost": 6.99
                    },
                    {
                        "name": "Drinks",
                        "item_link": "https://google.com/search?q=drinks",
                        "cost": 9999.01
                    },
                    {
                        "name": "Party",
                        "item_link": "https://google.com/search?q=party",
                        "cost": 99.01
                    },
                    {
                        "name": "DJ",
                        "item_link": "https://google.com/search?q=dj",
                        "cost": 999.00
                    },
                    {
                        "name": "Bride",
                        "item_link": "https://google.com/search?q=bride",
                        "cost": 9999999999.00
                    },
                ]), 3000));

                const itemsArray = [];
                const linksArray = [];
                const pricesArray = [];

                data.forEach((item) => {
                    itemsArray.push(item.name);
                    linksArray.push(item.item_link);
                    pricesArray.push("$" + item.cost);
                });

                setItems(itemsArray);
                setLinks(linksArray);
                setPrices(pricesArray);

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const getContent = () => {
        if (isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" animating={true} color="#EE4266" />
                    <Text style={{ marginTop: 30, fontSize: 18 }}>
                        Optimizing items and prices...
                    </Text>
                </View>
            );
        }
        return (
            <View>
                <PaperProvider theme={paperTheme}>
                    <StatusBar style="auto" />
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center', padding: '5%', top: '140%' }}>Here&apos;s a {'\n'}<Text style={{ color: '#EE4266' }}>list of affordable items</Text>{'\n'} we chose</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '12%', top: '20%', maxHeight: '30%', left: '5%', maxWidth: '90%', flex: 1, flexGrow: 1 }}>
                        <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
                            <List.Section key={'list'} >
                                {items.map((item, index) => (
                                    <View style={{ padding: 10 }} key={index}>
                                        <List.Item
                                            key={index}
                                            title={item}
                                            description={prices[index]}
                                            left={props => <List.Icon {...props} icon="link-variant" />}
                                            onPress={() => Linking.openURL(links[index])}
                                            style={{ flexDirection: 'row', backgroundColor: 'rgba(238, 66, 102, 0.1)', borderBottomWidth: 10, borderBottomColor: '#f1f1f1' }}
                                        />
                                    </View>
                                ))}
                            </List.Section>
                        </ScrollView>
                    </View>
                    <Button mode="contained" onPress={() => navigation.navigate('ChooseEvent')} style={styles.customButton}
                        labelStyle={{ textAlign: 'center' }} contentStyle={{ backgroundColor: 'black' }}>New Event
                    </Button>
                </PaperProvider>
            </View>
        );


    }
    const paperTheme =
        colorScheme === 'dark'
            ? { ...MD3DarkTheme, colors: theme.dark }
            : { ...MD3LightTheme, colors: theme.light };
    return (
        <PaperProvider theme={paperTheme}>
            <StatusBar style="auto" />
            <View style={styles.container}>
                {getContent()}
                <View style={styles.text}>

                </View>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: -20,
    },
    customButton: {
        width: "85%",
        left: "7.5%",
        top: 310,
        color: "black",
        borderRadius: 10,
    },
    text: {
        top: 40,
    },
});

export default Generate;
