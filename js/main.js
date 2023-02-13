const btnSubmit = document.querySelector('#btnSubmit')
btnSubmit.addEventListener('click', showResult)

function showResult() {
    let employees = {
        partner1: createPerson('Partner1'),
        partner2: createPerson('Partner2'),
        partner3: createPerson('Partner3'),
        unitPrice: document.querySelector('#inputUnitPrice').value,
        amount: document.querySelector('#inputAmount').value
    }

    if (employees.unitPrice == "" || employees.amount == "") {
        alert('Confira os dados inseridos, ocorreu um erro')
    }
    else {
        try {
            let finalPrice = employees.unitPrice * employees.amount
            let divResult = `<div class="row" id="results">
        <p id="resultTitle">Área de resultados</p>
        <p id="resultSubtitle">Valores a receber:</p>
        <div id="infoResult">
            <p id="infoPartner1">${employees.partner1.name}: R$${(finalPrice * 0.4).toFixed(2)}</p>
            <p id="infoPartner2">${employees.partner2.name}: R$${(finalPrice * 0.3).toFixed(2)}</p>
            <p id="infoPartner3">${employees.partner3.name}: R$${(finalPrice * 0.3).toFixed(2)}</p>
            <p id="totalValue" style="margin-top: 20%;">Valor total: R$${finalPrice}</p>
        </div>
    </div>`
            let resultArea = document.querySelector('#areaResult')
            resultArea.innerHTML = divResult
        }
        catch
        {
            alert('Confira os dados inseridos, ocorreu um erro')
        }
    }
}

let createPerson = (id) => {
    let person = {
        name: document.querySelector(`#input${id}`).value
    }
    return person
}