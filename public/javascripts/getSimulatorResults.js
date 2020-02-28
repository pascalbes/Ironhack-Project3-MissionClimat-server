const getAreaInfo = require('./getAreaInfos')
const getLineChartInfos = require('./getLineChartInfos')

function getSimulatorResults(rows) {
    var emiSecteur = getAreaInfo(rows, 0,0)
    var emiParSecteur = {};
    emiParSecteur.transports=getLineChartInfos(rows,46,0)
    emiParSecteur.batiments=getLineChartInfos(rows,53,0)
    emiParSecteur.agriculture=getLineChartInfos(rows,59,0)
    emiParSecteur.industrie=getLineChartInfos(rows,65,0)
    emiParSecteur.energie=getLineChartInfos(rows,72,0)
    return {
        emiSecteur: emiSecteur,
        emiParSecteur: emiParSecteur
    }
}

module.exports = getSimulatorResults