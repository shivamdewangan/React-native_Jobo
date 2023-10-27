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
import { ActivityIndicator, Avatar, Card, Searchbar } from "react-native-paper";
import {
    MD3LightTheme,
    PaperProvider,
} from "react-native-paper";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useEffect, useState } from "react";

import { Alert } from "react-native";
import useData from "../util/data.json";
import fetchCall from "../util/fetch";

const Generate = () => {
    const { theme } = useMaterial3Theme();
    let [isLoading, setIsLoading] = useState(true);
    let [data, setData] = useState(useData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCall();

                setData(data.allJobs);

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                // console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const [searchQuery, setSearchQuery] = React.useState("");
    const onChangeSearch = (query) => setSearchQuery(query);

    const filterFunction = (item) => {
        if (item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())) return true;
        if (item.location.toLowerCase().includes(searchQuery.trim().toLowerCase())) return true;
        if (item.company.toLowerCase().includes(searchQuery.trim().toLowerCase())) return true;
        return false;
    };

    const openURI = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    const paperTheme = { ...MD3LightTheme, colors: theme.light };


    if (isLoading) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: 300 }}>
                <ActivityIndicator size="large" animating={true} color="#EE4266" />
                <Text style={{ marginTop: 30, fontSize: 18, color: "#EE4266" }}>
                    Getting latest Job opportunities for you...
                </Text>
            </View>
        );
    }

    return (
        <PaperProvider theme={paperTheme}>
            <View style={{ paddingBottom: 20, marginLeft: "5%", marginRight: "5%" }}>
                <Searchbar
                    style={{
                        backgroundColor: "#eaeaea",
                        borderRadius: 4,
                        top: 20,
                        borderColor: "black",
                        marginBottom: 10,
                    }}
                    placeholder="Search fo Jobs, Location, Company..."
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
                <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 20, paddingLeft: 20, paddingTop: 20, paddingRight: 20, paddingBottom: 40 }}>
                    {data.filter(filterFunction).map((job) => (<View style={styles.wrap} key={job.id}>
                        <Card style={styles.card} onPress={() => openURI(job.link)}>
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
