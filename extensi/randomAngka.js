const randomAngka = (min, max) => {
    const angka = Math.floor(Math.random() * (max - min)) + min;
    return angka;
}

module.exports = { randomAngka };