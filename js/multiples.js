let total = {
    partner1: 0,
    partner2: 0,
    partner3: 0
}
localStorage.setItem('total', JSON.stringify(total))
const btnAdd = document.querySelector('#btnAdd')
btnAdd.addEventListener('click', addList)
let count = localStorage.setItem('count', 0)



function addList() {
    let people = {
        person1: document.querySelector(`#inputPerson1`).value,
        person2: document.querySelector(`#inputPerson2`).value,
        person3: document.querySelector(`#inputPerson3`).value
    }
    if (people.person1 == "" || people.person2 == "" || people.person3 == "")
        alert('Complete todos os campos antes de continuar!')
    else {
        let total = JSON.parse(localStorage.getItem('total'))
        let count = localStorage.getItem('count')
        document.querySelector('#valueArea').innerHTML =
            `<div class="input-group mb-3">
                <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                <input type="number" class="form-control" placeholder="Preço" aria-label="Username"
                    id="inputUnitPrice${count}" required>
                <span class="input-group-text"><i class="bi bi-123"></i></span>
                <input type="number" class="form-control" placeholder="Quant." aria-label="Username"
                    id="inputAmount${count}" required>
                <div class="form-floating">
                <form>
                <fieldset>
                  <div>
                    <input type="radio" id="contactChoice1" name="contact" value="partner1" />
                    <label for="contactChoice1">${people.person1}</label>
                    <input type="radio" id="contactChoice2" name="contact" value="partner2" />
                    <label for="contactChoice2">${people.person2}</label>
                    <input type="radio" id="contactChoice3" name="contact" value="partner3" />
                    <label for="contactChoice3">${people.person3}</label>
                  </div>
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </fieldset>
              </form>
              <pre id="log"></pre>
                </div>
            </div>`

        const form = document.querySelector("form");
        const log = document.querySelector("#log");
        let select

        form.addEventListener(
            "submit",
            (event) => {
                const data = new FormData(form);
                let output = "";
                for (const entry of data) {
                    select = `${entry[1]}`;
                }
                event.preventDefault();
                let sale = {
                    unitPrice: document.querySelector(`#inputUnitPrice${count}`).value,
                    amount: document.querySelector(`#inputAmount${count}`).value,
                    selected: select
                }
                total = createSale(sale, total)
                count++
                console.log(total)
                localStorage.setItem('total', JSON.stringify(total))
            },
            false
        );
    }
}


const btnDone = document.querySelector('#btnDone')
btnDone.addEventListener('click', () => {

})

function createSale(sale, total) {
    let precoTotal, toReceive, jaExsite

    if (sale.selected == 'partner1') {
        precoTotal = sale.unitPrice * sale.amount
        total.partner1 += precoTotal * 0.4
        total.partner2 += precoTotal * 0.3
        total.partner3 += precoTotal * 0.3
    }
    else if (sale.selected == 'partner2') {
        precoTotal = sale.unitPrice * sale.amount
        total.partner2 += precoTotal * 0.4
        total.partner1 += precoTotal * 0.3
        total.partner3 += precoTotal * 0.3
    }
    else {
        precoTotal = sale.unitPrice * sale.amount
        total.partner3 += precoTotal * 0.4
        total.partner1 += precoTotal * 0.3
        total.partner2 += precoTotal * 0.3
    }

    return total
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