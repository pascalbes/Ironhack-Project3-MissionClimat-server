const getAreaInfo = require('./getAreaInfos')
const getLineChartInfos = require('./getLineChartInfos')
const getPieInfos = require('./getPieInfos')
const getJauge = require('./getJauge')

function getSimulatorResults(rows) {
    var emiSecteur = getAreaInfo(rows, 0,0)
    var emiSecteurPie = getPieInfos(rows, 14, 2)
    var emiParSecteur = {};
    emiParSecteur.transports=getLineChartInfos(rows,46,0)
    emiParSecteur.batiments=getLineChartInfos(rows,53,0)
    emiParSecteur.agriculture=getLineChartInfos(rows,59,0)
    emiParSecteur.industrie=getLineChartInfos(rows,65,0)
    emiParSecteur.energie=getLineChartInfos(rows,72,0)
    var jaugeDatas = getJauge(rows, 81, 0)
    return {
        emiSecteur: emiSecteur,
        emiSecteurPie: emiSecteurPie,
        emiParSecteur: emiParSecteur,
        jaugeDatas: jaugeDatas
    }
}

module.exports = getSimulatorResults