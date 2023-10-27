/* eslint-disable react/prop-types */
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Linking,
    Image,
} from "react-native";
import { ActivityIndicator, Avatar, Card, Paragraph } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import {
    MD3LightTheme,
    PaperProvider,
    Button,
} from "react-native-paper";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";

import data from "../util/data.json";

const Generate = ({ navigation }) => {
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

    const paperTheme = { ...MD3LightTheme, colors: theme.light };

    return (
        <PaperProvider theme={paperTheme}>
            <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
                <View style={{ marginTop: "5%", marginBottom: "5%", marginLeft: "2%" }}>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: "#545454" }}>Recent Job Postings in India</Text>
                </View>
                <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}>
                    {data.map((job) => (<View style={styles.wrap} key={job.id}>
                        <Card style={styles.card}>
                            <Card.Title
                                title={job.title}
                                titleStyle={styles.title}
                                subtitle={job.company + " • " + job.experience}
                                right={() => job.image && <RightContent source={job.image} />}
                            />
                            <Card.Content>
                                <View style={{ gap: 15 }}>
                                    <View style={styles.flex}>
                                        <Avatar.Icon style={styles.icon} icon="map-marker" color="#EE4266" size={30} />
                                        <Text style={{ width: "92%" }}>{job.location}</Text>
                                    </View>
                                    <View style={styles.flex}>
                                        <Avatar.Icon style={styles.icon} icon="details" color="#EE4266" size={30} />
                                        <Text style={{ width: "92%" }}>{job.description}</Text>
                                    </View>
                                    <View style={styles.flex}>
                                        <Avatar.Icon style={styles.icon} icon="currency-inr" color="#EE4266" size={30} />
                                        <Text>{job.salary}</Text>
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                                        <Avatar.Icon style={styles.icon} icon="update" color="#EE4266" size={30} />
                                        <Text>{job.post}</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>))}
                </View>
            </ScrollView>
        </PaperProvider>
    );
};

const RightContent = (props) => (
    <Image
        style={{
            width: 40,
            height: 40,
            marginRight: 10,
            borderRadius: 10,
            overflow: "hidden",
        }}
        src={props.source}
    />
);

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "700",
    },
    wrap: {
        justifyContent: "center",
        width: "100%",
    },
    card: {
        borderRadius: 12,
        backgroundColor: "#fff",
    },
    cover: {
        borderRadius: 0,
    },
    icon: {
        backgroundColor: "transparent",
    },
    flex: {
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },
});

export default Generate;
