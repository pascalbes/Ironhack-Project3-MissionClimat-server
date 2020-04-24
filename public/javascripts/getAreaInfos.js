function getAreaInfos(rows, i,j) {

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
    var areaDatas=[];
  
    while (rows[i][j]) {
      
      dataItem = {}
      
      while (rows[i][j]) {
        if (i==iLine) {
          dataItem.name=rows[i][j]
          
        }
        else {
          if (j==5) {
            areaDatas.push({
              dataKey: rows[i][jCol],
              color: rows[i][jCol+1]
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
  
    return {data: datas, areaDatas: areaDatas}
  
  }

  module.exports = getAreaInfos

  