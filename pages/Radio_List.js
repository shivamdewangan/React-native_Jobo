/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Modal,
    Alert,
} from "react-native";
import {
    Button,
    IconButton,
    TextInput,
    ActivityIndicator,
} from "react-native-paper";
import { CheckBox } from "react-native-elements";

export default function RadioList({ navigation, route }) {
    let [it, setIt] = useState([]);
    const [checked, setChecked] = useState(new Array(15).fill(false));
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState();
    let [response, setResponse] = useState();
    let [checkClicked, setCheckedClicked] = useState(false);
    const { searchQuery } = route.params;
    const trueIndices = [];
    const trueElements = [];

    const getData = async () => {
        try {

            const data = await new Promise(res => setTimeout(() => res([
                "Hall",
                "Reception",
                "Catering services",
                "Invitation cards",
                "Visiting management",
            ]), 3000));

            setIt(data);
            setIsLoading(false);
            setResponse(data);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const getContent = () => {
        if (isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" animating={true} color="#EE4266" />
                    <Text style={{ marginTop: 30, fontSize: 18 }}>
                        Generating your items...
                    </Text>
                </View>
            );
        }

        if (error) {
            return <Text>{error}</Text>;
        }

        if (!response) {
            return <Text>Invalid response format</Text>;
        }

        return null;
    };
    const chosen = (checked, it) => {
        for (let i = 0; i < checked.length; i++) {
            if (checked[i]) {
                trueIndices.push(i);
            }
        }

        for (let i = 0; i < trueIndices.length; i++) {
            trueElements.push(it[trueIndices[i]]);
        }
    };

    useEffect(() => {
        chosen(checked, it);
    }, [checked]);



    const handleOnChange = (id) => {
        const newChecked = [...checked];
        newChecked[id] = !newChecked[id];
        setChecked(newChecked);
    };

    let itemsArray = it.map((item, index) => (
        <TouchableOpacity key={index}>
            <View>
                <CheckBox
                    backgroundcolor='#FDECF0'
                    center
                    title={item}
                    size={26}
                    right
                    checkedColor="#EE4266"
                    checked={checked[index]}
                    containerStyle={styles.itembox}
                    textStyle={{ fontSize: 20, fontWeight: 'normal' }}
                    onPress={() => handleOnChange(index)}
                />
            </View>
        </TouchableOpacity>
    ));

    if (itemsArray.length > 10) {
        itemsArray = itemsArray.slice(0, 10)
    }


    let [items, setItems] = useState(itemsArray);
    const [visibility, setVisibility] = useState(false);
    const [text, setText] = useState("");
    return (
        <View style={styles.loading}>
            {getContent()}
            {!isLoading && (
                <View>
                    <IconButton style={{ alignSelf: 'flex-end' }} size={32} icon="plus" onPress={() => {
                        setVisibility(true);
                        setItems(checkClicked ? items : itemsArray);
                    }} />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={visibility}
                        onDismiss={() => {
                            setVisibility(false);
                        }}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setVisibility(false);
                        }}>
                        <View>
                            <TextInput
                                placeholder="insert a new item"
                                backgroundColor='#E8E8E8'
                                mode="outlined"
                                style={styles.centeredView}
                                label="add your item"
                                value={text}
                                onChangeText={(text) => setText(text)}
                                activeOutlineColor="#EE4266"
                            />
                        </View>
                        <Button
                            style={{ fontSize: 24 }}
                            textColor="#EE4266"
                            onPress={() => {
                                if (items.length < 11 && text) {
                                    setIt([...it, text]);
                                    setChecked([...checked, false]);
                                    setItems([
                                        ...items,
                                        <TouchableOpacity key={checked.length - 1}>
                                            <View>
                                                <CheckBox
                                                    backgroundcolor='#FDECF0'
                                                    center
                                                    title={text}
                                                    size={26}
                                                    right
                                                    checkedColor="#EE4266"
                                                    checked={true}
                                                    containerStyle={styles.itembox}
                                                    textStyle={{ fontSize: 20, fontWeight: 'normal' }}
                                                    onPress={() => handleOnChange(checked.length - 1)}
                                                />
                                            </View>
                                        </TouchableOpacity>,
                                    ]);
                                }
                                setVisibility(false);
                                setCheckedClicked(true);
                                setText('');
                            }}> done!</Button>
                    </Modal>

                    <View style={{ flexDirection: "column", width: 350, justifyContent: 'center' }}>
                        <View style={styles.textwrap}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 600, fontSize: 28 }} > Here&apos;s a </Text>
                                <Text style={{ fontWeight: 600, fontSize: 28, color: '#EE4266' }}> list of Items</Text>
                            </View>
                            <Text style={{ fontWeight: 600, fontSize: 28 }}> we came up with </Text>
                        </View>
                        <View style={{ marginLeft: 0, marginBottom: 50, alignSelf: 'center', height: 300, width: '110%' }}>
                            <ScrollView contentContainerStyle={styles.container}>
                                {!checkClicked ? itemsArray : items}

                            </ScrollView>
                        </View>
                        <Button
                            labelStyle={styles.buttontext}
                            onPress={() =>
                                navigation.navigate("Generate", {
                                    chosenElements: trueElements,
                                    budget: searchQuery,
                                })
                            }
                            style={styles.button}
                            mode="contained"
                        >
                            Optimize Cost!
                        </Button>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        padding: 10,
        backgroundcolor: "#FFFFFF",
        flexDirection: "column",
        borderColor: "#303030",
        justifyContent: "center",
    },

    itembox: {
        flexDirection: "row",
        backgroundColor: "rgba(238, 66, 102, 0.1)",
        padding: 5,
        paddingLeft: 20,
        height: 60,
        borderRadius: 2,
    },

    itemtext: {
        borderRadius: 6,
        padding: 5,
        textAlign: "right",
    },
    textwrap: {
        justifyContent: "center",
        marginTop: 50,
        marginBottom: 50,
        alignItems: "center",
    },
    button: {
        marginBottom: 50,
        marginTop: 50,
        // marginLeft : 45,
        height: 40,
        width: "90%",
        left: "5%",
        backgroundColor: "#303030",
        justifyContent: "center",
        borderRadius: 10,
    },
    buttontext: {
        justifyContent: "center",
        alignItems: "center",
    },
    add: {
        alignSelf: "flex-end",
    },
    centeredView: {
        marginTop: "90%",
        justifyContent: "center",
        alignSelf: "center",
        height: 60,
        width: "80%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        fontSize: 24,
    },
});
