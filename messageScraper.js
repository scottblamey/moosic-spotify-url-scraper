import * as fs from "node:fs";
import path from "path";

const regex = {
    spotify: /^https:\/\/open\.spotify\.com\/track\/([A-Za-z0-9]+)/g,
    soundcloud: /https?:\/\/(?:www\.)?(?:on\.)?soundcloud\.com\/[^\s?]+/g,
    youtube: /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[^\s?]+/g,
};

function read(source) {
    const data = fs.readFileSync(source, "utf-8");

    if (path.extname(source).toLowerCase() === ".json") {
        return JSON.parse(data);
    } else {
        return data;
    }
}

function parser(data, regex, service) {
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
        `Searching ${service}\nMatches Found: ${counterMatch}\nPosts Checked: ${counter}\n`
    );
    return parsedData;
}

function write(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) throw err;
        console.log(fileName + " Saved!");
    });
}

function main() {
    const mooTxt = read("moo.txt");
    const rawData = read("data.json");

    for (const [service, ex] of Object.entries(regex)) {
        const newData = parser(rawData, ex, service);
        write(`moosic_${service}_tracks.txt`, mooTxt + newData);
        console.log(newData);
    }
}

main();
