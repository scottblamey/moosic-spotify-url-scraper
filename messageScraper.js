import * as fs from "node:fs";

// const regex = /https:\/\/open\.spotify\.com\/\S+/;
const regex = /^https:\/\/open\.spotify\.com\/track\/([A-Za-z0-9]+)/;

function fileRead(source) {
    const jsonData = fs.readFileSync(source, "utf-8");
    return JSON.parse(jsonData);
}
function mooRead(source) {
    const mooData = fs.readFileSync(source, "utf-8");
    return mooData;
}

function parser(data) {
    let parsedData = "";
    let counterMatch = 0;
    let counter = 0;

    for (let i = 0; i < data.messages.length; i++) {
        if (data.messages[i].content?.match(regex)) {
            parsedData =
                data.messages[i].content.match(regex)[0] + "\n" + parsedData;
            counterMatch++;
        }
        counter = i;
    }
    process.stdout.write(
        `PROGRESS\nMatches Found: ${counterMatch}\nPosts Checked: ${counter}\n`
    );
    return parsedData;
}

function fileWrite(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) throw err;
        console.log(fileName + " Saved!");
    });
}

function main() {
    const mooTxt = mooRead("moo.txt");

    const rawData = fileRead("data.json");
    // console.log("RAW DATA" + rawData);
    const newData = parser(rawData);
    // console.log("NEW DATA" + newData);
    fileWrite("spotify_tracks.txt", mooTxt + newData);
}

main();
