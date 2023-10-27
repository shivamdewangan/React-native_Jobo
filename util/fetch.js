

export default async function fetchCall() {
    const res = await fetch("http://localhost:3001/job", {
        method: "GET",
    });
    return await res.json();
}