const getAreaInfo = require('./getAreaInfos')

function getSimulatorResults(rows) {
    var emiSecteur = getAreaInfo(rows, 0,0)
    return {
        emiSecteur: emiSecteur
    }
}

module.exports = getSimulatorResults