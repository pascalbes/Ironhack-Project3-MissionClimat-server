const getAreaInfo = require('./getAreaInfos')
const getLineChartInfos = require('./getLineChartInfos')
const getPieInfos = require('./getPieInfos')
const getJauge = require('./getJauge')
const getImpacts = require('./getImpacts')

function getSimulatorResults(rows) {
    var emiSecteur = getAreaInfo(rows, 0,0)
    // console.log(emiSecteur.data.data[5])
    var emiSecteurGnl = getAreaInfo(rows, 18,0)
    var emiSecteurPie = getPieInfos(rows, 26, 0)
    var jaugeDatas = getJauge(rows, 44, 0)
    var impacts = getImpacts(rows, 51, 0)
    var emiParSecteur = {};

    // graph area + line (séquestration)
    
    var emiFrance = {};
    emiFrance.sansRupture={}
    emiFrance.avecRupture={}
    emiFrance.intro = rows[67][1]
    // emiFrance.total.graph = getCompoChartInfos(rows,69,0)
    // emiFrance.total.text = rows[74][1]
    emiFrance.sansRupture.graph = getAreaInfo(rows, 77,0)
    emiFrance.sansRupture.text = rows[84][1]
    emiFrance.avecRupture.graph = getAreaInfo(rows, 89,0)
    emiFrance.avecRupture.text = rows[96][1]
    
    
    var dataFrance = {};

    dataFrance.batiment={}
    dataFrance.batiment.perf={}
    dataFrance.batiment.chauffage={}

    dataFrance.batiment.intro = rows[102][1]
    dataFrance.batiment.perf.graph = getAreaInfo(rows,104,0)
    dataFrance.batiment.perf.text = rows[109][1]
    dataFrance.batiment.chauffage.graph = getAreaInfo(rows,111,0)
    dataFrance.batiment.chauffage.text = rows[119][1]


    dataFrance.transports={}
    dataFrance.transports.distance={}
    dataFrance.transports.emissions={}

    dataFrance.transports.intro = rows[123][1]
    dataFrance.transports.distance.graph = getAreaInfo(rows,125,0)
    dataFrance.transports.distance.text = rows[131][1]
    dataFrance.transports.emissions.graph = getAreaInfo(rows,133,0)
    dataFrance.transports.emissions.text = rows[141][1]


    var emiMonde = {}
    emiMonde.total = {}
    emiMonde.empreinte = {}
    
    emiMonde.total.intro = rows[204][1]
    emiMonde.total.graph = getLineChartInfos(rows,206,0)
    emiMonde.empreinte.text = rows[210][1]
    emiMonde.empreinte.graph = getLineChartInfos(rows,214,0)
    emiMonde.empreinte.text = rows[218][1]

    
    
    return {
        emiSecteur: emiSecteur,
        emiSecteurGnl: emiSecteurGnl,
        emiSecteurPie: emiSecteurPie,
        emiFrance : emiFrance,
        emiMonde: emiMonde,
        // emiParSecteur: emiParSecteur,
        jaugeDatas: jaugeDatas,
        impacts: impacts,
        dataFrance: dataFrance
    }
}

module.exports = getSimulatorResults
