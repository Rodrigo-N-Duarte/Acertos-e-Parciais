const btnAdd = document.querySelector('#btnAdd')
btnAdd.addEventListener('click', addList)

function addList() {
    let requisition = document.querySelector('#inputRequisitions').value
    let people = {
        person1: document.querySelector(`#inputPerson1`).value,
        person2: document.querySelector(`#inputPerson2`).value,
        person3: document.querySelector(`#inputPerson3`).value
    }
    if (people.person1 == "" || people.person2 == "" || people.person3 == "" || requisition == 0)
        alert('Complete todos os campos antes de continuar!')
    else {
        let count = 1
        for (let i = 1; i <= requisition; i++) {
            document.querySelector('#valueArea').innerHTML +=
                `<div class="input-group mb-3">
                <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                <input type="number" class="form-control" placeholder="Preço" aria-label="Username"
                    id="inputUnitPrice${count}" required>
                <span class="input-group-text"><i class="bi bi-123"></i></span>
                <input type="number" class="form-control" placeholder="Quant." aria-label="Username"
                    id="inputAmount${count}" required>
                <div class="form-floating">
                    <select class="form-select"
                        aria-label="Floating label select example" id="select${count}">
                        <option value="1">${people.person1}</option>
                        <option value="2">${people.person2}</option>
                        <option value="3">${people.person3}</option>
                    </select>
                    <label>Realizador da imagem</label>
                </div>
            </div>`
            count++
        }
        btnDone.style.display = 'block'
        localStorage.clear()
        localStorage.setItem('db', requisition)
    }
}

const btnDone = document.querySelector('#btnDone')
btnDone.addEventListener('click', () => {
    showResult(makeCalculation(createSale()))
})

function createSale() {
    let requisition = localStorage.getItem('db')

    if (requisition < 1)
        return alert('Se atente aos dados inseridos, ocorreu um erro.')
    else {
        let sales = [requisition]
        for (let i = 0; i < requisition; i++) {
            var select = document.getElementById(`select${i}`);
            var selectTextName = select.options[select.selectedIndex].text;
            sales[i] = {
                unitPrice: document.querySelector(`#inputUnitPrice${i + 1}`),
                amount: document.querySelector(`#inputAmount${i + 1}`),
                selected: selectTextName
            }
        }
        return sales
    }
}

function makeCalculation(sales) {
    let toReceive = [3]
    let names = [
        sales[0].selected,
        sales[1].selected,
        sales[2].selected
    ]
    for (let i = 0; i <= sales.length; i++) {
        if (names[0] == sales[i].selected) {
            let total = sales[i].unitPrice * sales[i].amount
            toReceive[0] += total * 0.4
            toReceive[1] += total * 0.3
            toReceive[2] += total * 0.3
        }
        if (nams[1] == sales[i].selected) {
            let total = sales[i].unitPrice * sales[i].amount
            toReceive[1] += total * 0.4
            toReceive[0] += total * 0.3
            toReceive[2] += total * 0.3
        }
        else {
            let total = sales[i].unitPrice * sales[i].amount
            toReceive[2] += total * 0.4
            toReceive[0] += total * 0.3
            toReceive[1] += total * 0.3
        }
    }
    let final = [names, toReceive]
}



function showResult(final) {
    let divResult =
        `<div class="row" id="results">
        <p id="resultTitle">Área de resultados</p>
        <p id="resultSubtitle">Valores a receber:</p>
        <div id="infoResult">
        <p id="infoPersonX">${final[0].names[0]}: R$${final[1].toReceive[0]}</p>
        <p id="infoPerson2">${final[0].names[1]}: R$${final[1].toReceive[1]}</p>
        <p id="infoPerson3">${final[0].names[2]}: R$${final[1].toReceive[2]}</p>
        <p id="totalValue" style="margin-top: 20%;">Valor total: R$${final[1].toReceive[0] + final[1].toReceive[1] + final[1].toReceive[2]}</p>
    </div>
    </div>`
    let resultArea = document.querySelector('#areaResult')
    resultArea.innerHTML = divResult
}