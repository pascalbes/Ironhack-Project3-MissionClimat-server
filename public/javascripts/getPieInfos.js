function getPieInfos(rows, i, j) {

    // i = 14
    // j = 2

    var datas = {}
    datas.data02=[]


    numberOfParameters = 0;

    let w = i

    while (rows[w][j+2]) {
      numberOfParameters += 1
      console.log(numberOfParameters)
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

    console.log(listSectors)

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


    console.log(datas.data01)

    function formatNombre(nb) {
        var number = Number(nb.toString().replace(",", "."))
        return number
    }

    // i = 14
    // j = 0

    function calculateSectorsValue() {
        for (let x = 0; x < numberOfParameters; x ++){
            for (let y = 0; y < listSectors.length; y ++) {
            if (rows[i+x][j+2] === datas.data01[y].name) {
                console.log(rows[i+x][j +5])
                datas.data01[y].value += formatNombre(rows[i+x][j +5]) 
                datas.data01[y].color = rows[i+x][j + 4]
            }
            }
        } return datas.data01
    }

    
    calculateSectorsValue()

    return datas

}

module.exports = getPieInfos