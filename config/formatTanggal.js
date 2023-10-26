const format_tanggal = (date) => {

    const datex = new Date(date);
    console.log(datex);
    const bulan_list = [
        "Januari", "Februari", "Maret", "April", "Mei",
        "Juni", "Juli", "Agustus", "September", "Okteber", "Nobember", "Desember"
    ]
    //split tanggal  time
    const [tanggal, waktu] = datex;
    const [tahun, bulan, hari] = tanggal.split("-");

    const hasil = `${hari} ${bulan_list[parseInt(bulan) - 1]} ${tahun}`;

    return hasil;

}

format_tanggal()
// module.exports = format_tanggal;