const getAreaInfo = require('./getAreaInfos')
const getLineChartInfos = require('./getLineChartInfos')
const getPieInfos = require('./getPieInfos')
const getJauge = require('./getJauge')
const getImpacts = require('./getImpacts')
const getCompoChartInfos = require('./getCompoChartInfos')

function getSimulatorResults(rows) {
    var emiSecteur = getAreaInfo(rows, 0,0)
    // console.log(emiSecteur.data.data[5])
    var emiSecteurGnl = getAreaInfo(rows, 17,0)
    
    var jaugeDatas = getJauge(rows, 26, 0) // i+1
    var impacts = getImpacts(rows, 35, 0)// i+1
    var emiParSecteur = {};

    // graph area + line (séquestration)
    
    var emiFrance = {};

    emiFrance.intro = rows[48][1]

    emiFrance.total = {
        graph: getCompoChartInfos(rows,50,0),
        subtitle: rows[54][1],
        text: rows[55][1],
        source: rows[56][1]
    }

    emiFrance.sansRupture = {
        graph: getAreaInfo(rows,59,0),
        subtitle: rows[65][1],
        text: rows[66][1],
        source: rows[67][1]
    }

    emiFrance.avecRupture = {
        graph: getAreaInfo(rows,71,0),
        subtitle: rows[77][1],
        text: rows[78][1],
        source: rows[79][1]
    }

    var emiSecteurPie = {
        graph: getPieInfos(rows, 83, 0),
        title: rows[82][1],
        subtitle: rows[98][1],
        text: rows[99][1],
        source: rows[100][1]
    } 

    var dataFrance = {};

    dataFrance.batiment={}
    dataFrance.batiment.perf={}
    dataFrance.batiment.chauffage={}

    dataFrance.batiment.intro = rows[104][1]

    dataFrance.batiment.perf = {
        graph: getAreaInfo(rows,106,0),
        subtitle: rows[110][1],
        text: rows[111][1],
        source:rows[112][1]
    }

    dataFrance.batiment.chauffage = {
        graph: getAreaInfo(rows,114,0),
        subtitle: rows[121][1],
        text: rows[122][1],
        source:rows[123][1]
    }


    dataFrance.transports={}
    // dataFrance.transports.distance={}
    // dataFrance.transports.emissions={}

    dataFrance.transports.intro = rows[126][1]

    dataFrance.transports.distance = {
        graph: getAreaInfo(rows,128,0),
        subtitle: rows[134][1],
        text: rows[135][1],
        source:rows[136][1]
    }

    dataFrance.transports.emissions = {
        graph: getAreaInfo(rows,138,0),
        subtitle: rows[146][1],
        text: rows[147][1],
        source:rows[148][1]
    }


    dataFrance.agriculture={}
    dataFrance.agriculture.parcelles={}
    dataFrance.agriculture.emissions={}

    dataFrance.agriculture.intro = rows[152][1]

    dataFrance.agriculture.parcelles = {
        graph: getAreaInfo(rows,154,0),
        subtitle: rows[158][1],
        text: rows[159][1],
        source:rows[160][1]
    }

    dataFrance.agriculture.emissions = {
        graph: getAreaInfo(rows,163,0),
        subtitle: rows[167][1],
        text: rows[168][1],
        source:rows[169][1]
    }

    dataFrance.conso={}
    dataFrance.conso.quantites={}
    dataFrance.conso.emissions={}

    dataFrance.conso.intro = rows[176][1]

    dataFrance.conso.quantites = {
        graph: getAreaInfo(rows,178,0),
        subtitle: rows[183][1],
        text: rows[184][1],
        source:rows[185][1]
    }

    dataFrance.conso.emissions = {
        graph: getAreaInfo(rows,187,0),
        subtitle: rows[191][1],
        text: rows[192][1],
        source:rows[193][1]
    }
    
    dataFrance.energie={}
    dataFrance.energie.facteurs={}
    dataFrance.energie.emissions={}

    dataFrance.energie.intro = rows[198][1]

    dataFrance.energie.facteurs = {
        graph: getAreaInfo(rows,200,0),
        subtitle: rows[203][1],
        text: rows[204][1],
        source:rows[205][1]
    }

    dataFrance.energie.emissions = {
        graph: getAreaInfo(rows,207,0),
        subtitle: rows[210][1],
        text: rows[211][1],
        source:rows[212][1]
    }


    


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
