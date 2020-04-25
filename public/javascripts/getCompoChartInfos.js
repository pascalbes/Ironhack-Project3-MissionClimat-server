function getCompoChartInfos(rows,i,j) {

    var datas = {}
    datas.data=[]
  
    datas.title = rows[i+0][j+1]
    datas.xTitle = rows[i+1][j+1]
    datas.yTitle = rows[i+2][j+1]
    
    datas.yLegend=rows[i+0][j+3]
    datas.yLabels=[]
    datas.colors=[]
  
    var iLine = i;
    var jCol=j+3;
    j=5;
  
    var dataItem = {}
    var graphDatas=[];
  
    while (rows[i][j]) {
      
      dataItem = {}
      
      while (rows[i][j]) {
        if (i==iLine) {
          dataItem.name=rows[i][j]
          
        }
        else {
          if (j==5) {
            graphDatas.push({
              dataKey: rows[i][jCol],
              name: rows[i][jCol], //utile pour la légende
              color: rows[i][jCol+1],
              type: rows[i][jCol-1]
            })
          }
          dataItem[rows[i][jCol]] = Number(rows[i][j].toString().replace(",","."))
        }
        i++
      }
      datas.data.push(dataItem)
      j++
      i=iLine
  
    }

    graphDatas.map((dat) => {
        dat.subText = datas.data[datas.data.length-1][dat.dataKey] + " " + datas.yTitle + " / Evolution : "
        let evolution = Math.round((datas.data[datas.data.length-1][dat.dataKey]-datas.data[0][dat.dataKey])/datas.data[0][dat.dataKey]*100)
        evolution >= 0 ? dat.subText += "+" + evolution + "%" : dat.subText += evolution  + "%" 
        return dat
    })
  
    return {data: datas, graphDatas: graphDatas}

}

module.exports = getCompoChartInfos