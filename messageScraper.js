import * as fs from "node:fs";

function fileRead(source) {
    // returns object containing json data
    const jsonData = readFileSync(source, "utf-8");
    return JSON.parse(jsonData);
}

const regex = /https:\/\/open\.spotify\.com\/\S+/;
// console.log(`INDEX 14: ${data.messages[14].content.length}`);
// console.log(`INDEX 15: ${data.messages[15].content?.length}`);

function parser(data) {
    const parsedData = "";

    for (let i = 0; i < data.messages.length; i++) {
        console.log(`${i} checked`);
        if (data.messages[i].content?.match(regex)) {
            parsedData.join(`${data.messages[i].content.match(regex)}\n`);
            console.log(`${i} match`);
        }
    }
    console.log(parsedData);
    return parsedData;
}

function fileWrite(data) {
    fs.writeFile("spotify_tracks.txt", data, function (err) {
        if (err) throw err;
        console.log("Saved!");
    });
}

function main() {
    const rawData = fileRead("data.json");
    const newData = parser(rawData);
    fileWrite(newData);
}

main();
