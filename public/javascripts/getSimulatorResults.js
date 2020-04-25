const getAreaInfo = require('./getAreaInfos')
const getLineChartInfos = require('./getLineChartInfos')
const getPieInfos = require('./getPieInfos')
const getJauge = require('./getJauge')
const getImpacts = require('./getImpacts')
const getCompoChartInfos = require('./getCompoChartInfos')

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
    emiFrance.total={}
    emiFrance.sansRupture={}
    emiFrance.avecRupture={}
    emiFrance.intro = rows[67][1]
    emiFrance.total.graph = getCompoChartInfos(rows,69,0)
    emiFrance.total.text = rows[74][1]
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

    dataFrance.agriculture={}
    dataFrance.agriculture.parcelles={}
    dataFrance.agriculture.emissions={}

    dataFrance.agriculture.intro = rows[146][1]
    dataFrance.agriculture.parcelles.graph = getAreaInfo(rows,148,0)
    dataFrance.agriculture.parcelles.text = rows[131][1]
    dataFrance.agriculture.emissions.graph = getAreaInfo(rows,157,0)
    dataFrance.agriculture.emissions.text = rows[162][1]


    dataFrance.energie={}
    dataFrance.energie.facteurs={}
    dataFrance.energie.emissions={}

    dataFrance.energie.intro = rows[166][1]
    dataFrance.energie.facteurs.graph = getAreaInfo(rows,168,0)
    dataFrance.energie.facteurs.text = rows[131][1]
    dataFrance.energie.emissions.graph = getAreaInfo(rows,175,0)
    dataFrance.energie.emissions.text = rows[180][1]


    dataFrance.conso={}
    dataFrance.conso.quantites={}
    dataFrance.conso.emissions={}

    dataFrance.conso.intro = rows[183][1]
    dataFrance.conso.quantites.graph = getAreaInfo(rows,184,0)
    dataFrance.conso.quantites.text = rows[190][1]
    dataFrance.conso.emissions.graph = getAreaInfo(rows,193,0)
    dataFrance.conso.emissions.text = rows[198][1]


    var emiMonde = {}
    emiMonde.total = {}
    emiMonde.empreinte = {}
    
    emiMonde.total.intro = rows[204][1]
    emiMonde.total.graph = getLineChartInfos(rows,206,0)
    emiMonde.empreinte.text = rows[210][1]
    emiMonde.empreinte.graph = getLineChartInfos(rows,214,0)
    emiMonde.empreinte.text = rows[217][1]

    
    
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
