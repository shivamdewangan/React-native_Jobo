

export default function fetch(url) {
    return fetch(url, {
        baseURL: "https://api.producthunt.com/v2/api/graphql",
        headers: {
            "Authorization": "2hv2UuzoeX-KXRm9Fp7AAEuH2Sgj2AvHHf6yPYcrbUA",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Host": "api.producthunt.com",
        },
    }).then(res => res.json());
}