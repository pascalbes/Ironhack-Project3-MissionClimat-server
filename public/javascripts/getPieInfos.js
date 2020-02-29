function getPieInfos(rows, iii, jjjjj) {

    var datas = {}
    datas.data02=[]

    function createData02() {for (let i = 14; i < 24; i ++) {
    datas.data02.push({
        name: rows[i][3],
        value: formatNombre(rows[i][5]),
        color : rows[i][4]
    })
    }}

    createData02()

    datas.data01 = []

    var listSectors = []
    function createListSectors() {
    {for (let i = 14; i < 24; i ++) {
        if (!listSectors.includes(rows[i][2])) listSectors.push(rows[i][2])
    }}
    return listSectors
    }

    createListSectors()

    function createObjectForDatas() {
    for (let i = 0; i < listSectors.length; i++){
        datas.data01.push(
        {
            name : listSectors[i],
            value: 0
        }
        )
    }
    }

    createObjectForDatas()

    function formatNombre(nb) {
        var number = Number(nb.toString().replace(",", "."))
        return number
    }

    function calculateSectorsValue() {
        for (let i = 14; i < 24; i ++){
            for (let x = 0; x <= 6; x ++) {
            if (rows[i][2] === datas.data01[x].name) {
                datas.data01[x].value += formatNombre(rows[i][5]) 
                datas.data01[x].color = rows[i][4]
            }
            }
        } return datas.data01
    }

    calculateSectorsValue()

    return datas

}

module.exports = getPieInfos