var fs = require('fs');


const onReadFile = (fileData) => {
    let lines = fileData.split('\n');
    lines = lines.filter(function (value, index, arr) {
        return value[0] !== '#' && value[0] !== ';' && value[0] !== '[' && value.length > 0;
    });
    let data = {
        'mode': null,
        'rstnum': null,
        'group': null,
        'sortmode': null,
        'time1': null,
        'time2': null,
        'time3': null,
        'callclr1': null,
        'callclr2': null,
        'callclr3': null,
        'skipsubnum': null,
        'defaultfontfamily': null,
        'defaultfontsize': null,
        'largefontfamily': null,
        'largefontsize': null,
        'blinkingcolor': null,
        'background_1': null,
        'serial': null,
        'address': null,
        'ip_addr': null,
        'ip_mask': null
    };
    let key;
    let value;
    for (let line of lines) {

        if (line.includes('=')) {
            key = line.split('=')[0].replace(' ', '');
            if (Object.keys(data).includes(key)) {
                value = line.split('=')[1].split(';')[0]
                    .replace(' ', '');

                data[key] = value;
            }
        }
    }

    return data;
};

function parse() {

    try {
        var data = fs.readFileSync(process.env.CONFIG_FILE_PATH, 'utf8').toString();
        return {success: true, data: onReadFile(data)};

    } catch (e) {
        console.log(e.toString())
        return {success: false, error: e.toString()}
    }
}

function save(data) {

    let output = "";
    for (let key of Object.keys(data)) {

        output += `${key} = ${data[key]}\n`;
    }
    try {
        fs.writeFileSync(process.env.CONFIG_FILE_PATH, output, 'utf-8');
        return {success: true}
    } catch (err) {
        console.log(err.toString())
        return {success: false, error: err.toString()};
    }


}


module.exports = {parse, save};