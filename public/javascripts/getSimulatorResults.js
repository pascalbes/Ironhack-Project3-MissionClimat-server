const getAreaInfo = require('./getAreaInfos')
const getLineChartInfos = require('./getLineChartInfos')
const getPieInfos = require('./getPieInfos')
const getJauge = require('./getJauge')
const getImpacts = require('./getImpacts')

function getSimulatorResults(rows) {
    var emiSecteur = getAreaInfo(rows, 0,0)
    var emiSecteurPie = getPieInfos(rows, 26, 0)
    var impacts = getImpacts(rows, 51, 0)
    var emiParSecteur = {};
    var emiFrance = getLineChartInfos(rows,69,0)
    var emiMonde = getLineChartInfos(rows,63,0)
    // emiParSecteur.transports=getLineChartInfos(rows,46,0)getLineChartInfos(rows,46,0)
    // emiParSecteur.batiments=getLineChartInfos(rows,53,0)
    // emiParSecteur.agriculture=getLineChartInfos(rows,59,0)
    // emiParSecteur.industrie=getLineChartInfos(rows,65,0)
    // emiParSecteur.energie=getLineChartInfos(rows,72,0)
    var jaugeDatas = getJauge(rows, 44, 0)
    
    return {
        emiSecteur: emiSecteur,
        emiSecteurPie: emiSecteurPie,
        emiFrance : emiFrance,
        emiMonde: emiMonde,
        // emiParSecteur: emiParSecteur,
        jaugeDatas: jaugeDatas,
        impacts: impacts
    }
}

module.exports = getSimulatorResults