
function calculete(dataObj, resultObj) {

    const n = dataObj.rateIn === 'y' ? 12 : 1

    const totalPeriods = dataObj.period * n

    const realRate = dataObj.rate / 100

    const monthlyRate = realRate / n

    const compoundGrowth = dataObj.initialValue * Math.pow(1 + monthlyRate, totalPeriods)

    const additionsGrowth = (dataObj.valueAdded * (Math.pow(1 + monthlyRate, totalPeriods) - 1)) / monthlyRate

    resultObj.totalInvested = dataObj.initialValue + (dataObj.valueAdded * dataObj.period * n)

    resultObj.totalAmount = compoundGrowth + additionsGrowth

    resultObj.totalInterestEarned = resultObj.totalAmount - resultObj.totalInvested

    resultObj.percentageIncrease = (resultObj.totalAmount * 100 / resultObj.totalInvested) - 100

}

function updateAll(resultObj) {
    $('#totalInvested').val(resultObj.totalInvested.toFixed(2))
    $('#totalInterestEarned').val(resultObj.totalInterestEarned.toFixed(2))
    $('#totalAmount').val(resultObj.totalAmount.toFixed(2))
    $('#percentageIncrease').val(resultObj.percentageIncrease.toFixed(2))
}

function calculeteAndUpdateViews(dataObj, resultObj) {
    calculete(dataObj, resultObj)
    updateAll(resultObj)
}

(function(){

    const data =  {
        initialValue: 1000,
        valueAdded:  100,
        period: 10,
        rate: 10.75,
        rateIn: 'y'
    }
    
    const result = {
        totalInvested: 0,
        totalInterestEarned: 0,
        totalAmount: 0,
        percentageIncrease: 0
    }

    calculeteAndUpdateViews(data, result)

    $('#radioYear').on('change', () => {
        $('#timeUnit').html($('#period').val() > 1 ? 'Anos' : 'Ano')
        data.rateIn = $('#radioYear').val()
        calculeteAndUpdateViews(data, result)
    })

    $('#radioMonth').on('change', () => {
        $('#timeUnit').html($('#period').val() > 1 ? 'Meses' : 'Mês')
        data.rateIn = $('#radioMonth').val()
        calculeteAndUpdateViews(data, result)
    })

    $('#period').on('change keydown paste input', () => {
        if (data.rateIn === 'y') {
            $('#timeUnit').html($('#period').val() > 1 ? 'Anos' : 'Ano')
        } else if (data.rateIn === 'm') {
            $('#timeUnit').html($('#period').val() > 1 ? 'Meses' : 'Mês')
        }
        calculeteAndUpdateViews(data, result)
    })

    $('#initialValue').on('change keydown paste input', () => {
        let preValue = $('#initialValue').val()
        let value = preValue === '' ? '0': preValue
        data.initialValue = parseFloat(value)
        calculeteAndUpdateViews(data, result)
    })

    $('#valueAdded').on('change keydown paste input', () => {
        let preValue = $('#valueAdded').val()
        let value = preValue === '' ? '0': preValue
        data.valueAdded = parseFloat(value)
        calculeteAndUpdateViews(data, result)
    })
    
    $('#period').on('change keydown paste input', () => {
        let preValue = $('#period').val()
        let value = preValue === '' ? '1': preValue
        data.period = parseFloat(value)
        calculeteAndUpdateViews(data, result)
    })

    $('#rate').on('change keydown paste input', () => {
        let preValue = $('#rate').val()
        let value = preValue === '' ? '0,01': preValue
        data.rate = parseFloat(value)
        calculeteAndUpdateViews(data, result)
    })

})()