function getJauge(rows, iii,jjj) {

    var datas = []

    function formatNombre(nb) {
        var number = Number(nb.toString().replace(",", "."))
        return number
    }


    function createObjectForEachSector() {
        for (i =81; i < 87; i ++){
            datas.push(
                [{
                    "name": rows[i][2],
                    "id": "MGT de CO2",
                    "ranges":[
                        formatNombre(rows[i][5]),
                        formatNombre(rows[i][6]),
                        formatNombre(rows[i][4])
                    ],
                    "measures":[
                        formatNombre(rows[i][3])
                    ],
                    "markers":[
                        formatNombre(rows[i][5]),
                        formatNombre(rows[i][6])
                    ]
                }]
            )
        }
    }

    createObjectForEachSector()

    return datas 

}

module.exports = getJauge
