function getLineChartInfos() {

var iInital=i;

    var datas = {}
    

    datas.title = rows[i+0][j+1]
    datas.xTitle = rows[i+1][j+1]
    datas.yTitle = rows[i+2][j+1]

    i++
    j=3

    //Construction de la matrice d'objets utilisée dans le composant <Line>
    datas.line=[];

    while (rows[i][j]) {

        datas.line.push({
            dataKey: rows[i][j],
            stroke: rows[i][j+1],
        })
        i++

    }

    j=5
    var iFinal=i
    i=iInital

    //Construction de la matrice d'objets data utilisée dans le composant <LineChart>

    datas.data=[]
    var dataItem={}

    while (rows[i][j]) {

        dataItem={}
        dataItem.name = rows[iInital][j]

        for (let k=0;k<datas.line.length;k++) {
            rows[iInital+1+k][j] ? dataItem[datas.line[k].dataKey]=rows[iInital+k+1][j] : "kikou"
        }

        datas.data.push(dataItem)

        j++

    }

}

module.exports getLineChartInfos