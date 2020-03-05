function getImpacts(rows, i,j) {
    
    var data = {
        temperature: rows[i][4],
        RCP: rows[i+1][4],
        jours35: rows[i+2][4],
        joursSecheresse: rows[i+3][4],
        reductionEmission2030: rows[i+5][4]
    } 
  
    return data
  
  }

  module.exports = getImpacts

  