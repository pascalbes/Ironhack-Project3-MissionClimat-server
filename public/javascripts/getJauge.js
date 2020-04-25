function getJauge(rows, i,j) {

    var datas = []

    function formatNombre(nb) {
        var number = Number(nb.toString().replace(",", "."))
        return number
    }

    
    let w = i

    let numberOfParameters = 0;

    while (rows[w] && rows[w].length) {
      numberOfParameters += 1
    //   console.log(numberOfParameters)
      w +=1
    }



    function createObjectForEachSector() {
        for (x =0; x < numberOfParameters; x ++){
            
            datas.push(
                [{
                    "name": rows[i+x][j+2],
                    "id": "MGT de CO2",
                    "ranges":[formatNombre(rows[i+x][j+5]), formatNombre(rows[i+x][j+6]), formatNombre(rows[i+x][j+4])
                    ],
                    "measures":[
                        formatNombre(rows[i+x][3])
                    ],
                    "markers":[
                        formatNombre(rows[i+x][5]),
                        formatNombre(rows[i+x][6])
                    ],
                    "color":[
                        rows[i+x][j+7]
                    ]
                }]
            )
        }
    }

    createObjectForEachSector()

    return datas 

}

module.exports = getJauge
