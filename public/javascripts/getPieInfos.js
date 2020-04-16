function getPieInfos(rows, i, j) {

    var datas = {}
    datas.data02=[]

    numberOfParameters = 0;

    let w = i

    while (rows[w][j+2]) {
      numberOfParameters += 1
      w +=1
    }

    function createData02() {for (let x = 0; x < numberOfParameters; x ++) {
    datas.data02.push({
        name: rows[i + x][j + 3],
        value: formatNombre(rows[i + x][j + 5]),
        color : rows[i + x][j + 4]
    })
    }}

    createData02()

    // console.log(datas.data02)

    datas.data01 = []

    var listSectors = []
    function createListSectors() {
    {for (let x = 0; x < numberOfParameters; x ++) {
        if (!listSectors.includes(rows[i +x][j+2])) listSectors.push(rows[i + x][j+2])
    }}
    return listSectors
    }

    createListSectors()

    // console.log(listSectors)

    function createObjectForDatas() {
        for (let x = 0; x < listSectors.length; x++){
            datas.data01.push(
            {
                name : listSectors[x],
                value: 0,
                color: ""
            }
            )
        }
    }
    
    createObjectForDatas()

    function formatNombre(nb) {
        var number = Math.round(Number(nb.toString().replace(",", "."))*100)/100
        return number
    }

    function calculateSectorsValue() {
        for (let x = 0; x < numberOfParameters; x++){
            for (let y = 0; y < listSectors.length; y++) {
            if (rows[i+x][j+2] === datas.data01[y].name) {
                datas.data01[y].value += formatNombre(rows[i+x][j +5]) 
                datas.data01[y].color = rows[i+x][j + 6]
            }
            }
        } return datas.data01
    }

    
    calculateSectorsValue()

    return datas

}

module.exports = getPieInfos