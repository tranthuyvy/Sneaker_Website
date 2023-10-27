const fs = require('fs');
const province = require('./province.json')
console.log(province[0])
const newProvince = province.map(item => {
    return { name: item.name, districts: item.districts.map(dis => { return { name: dis.name, wards: dis.wards.map(war => { return { name: war.name }}) } }) }
})
const data = JSON.stringify(newProvince);

// write file to disk
fs.writeFile('province_vi.json', data, 'utf8', (err) => {

    if (err) {
        console.log(`Error writing file: ${err}`);
    } else {
        console.log(`File is written successfully!`);
    }

});