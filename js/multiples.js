window.onload = () => {
    let total = {
        partner1: 0,
        partner2: 0,
        partner3: 0,
        all: 0,
    }
    localStorage.setItem('total', JSON.stringify(total))
    localStorage.setItem('count', 0)
}

const btnAdd = document.querySelector('#btnAdd')
btnAdd.addEventListener('click', addList)

function addList() {
    let people = {
        person1: document.querySelector(`#inputPerson1`).value,
        person2: document.querySelector(`#inputPerson2`).value,
        person3: document.querySelector(`#inputPerson3`).value
    }
    if (people.person1 == "" || people.person2 == "" || people.person3 == "") {
        alert('Complete todos os campos antes de continuar!')
        window.FlashMessage.error('Erro');
    }
    else {
        let select
        let total = JSON.parse(localStorage.getItem('total'))
        let count = localStorage.getItem('count')
        let valueArea = document.querySelector('#valueArea')
        valueArea.style.display = 'block'
        valueArea.innerHTML =
            `<div class="input-group mb-3">
                                <div class="input-group mb-3">
                                    <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                                    <input type="number" class="form-control" placeholder="Preço"
                                        id="inputUnitPrice${count}" required>
                                    <span class="input-group-text">.00</span>
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text"><i class="bi bi-123"></i></span>
                                    <input type="number" class="form-control" placeholder="Quant."
                                        id="inputAmount${count}" required>
                                </div>
                                <div class="form-floating">
                                    <form>
                                        <fieldset>
                                            <div>
                                            <span>Selecione quem realizou a imagem<br></span>
                                                <input type="radio" id="contactChoice1" name="contact"
                                                    value="partner1" />
                                                <label for="contactChoice1">${people.person1}</label>
                                                <input type="radio" id="contactChoice2" name="contact"
                                                    value="partner2" />
                                                <label for="contactChoice2">${people.person2}</label>
                                                <input type="radio" id="contactChoice3" name="contact"
                                                    value="partner3" />
                                                <label for="contactChoice3">${people.person3}</label>
                                            </div>
                                            <div>
                                            <span id="cautionMessage">* Atente-se aos valores antes de enviar os dados</span>
                                                <button type="submit" class="btn btn-warning"
                                                    id="btnSubmit">Enviar</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                    <pre id="log"></pre>
                                </div>
                            </div>`

        const form = document.querySelector("form");
        const log = document.querySelector("#log");

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
                window.FlashMessage.success('Adicionado com sucesso!');
                showResult(total, people)
            },
            false
        );
    }
}

function createSale(sale, total) {
    let precoTotal = sale.unitPrice * sale.amount, toReceive, jaExsite
    if (sale.selected == 'partner1') {
        total.partner1 += precoTotal * 0.4
        total.partner2 += precoTotal * 0.3
        total.partner3 += precoTotal * 0.3
    }
    else if (sale.selected == 'partner2') {
        total.partner2 += precoTotal * 0.4
        total.partner1 += precoTotal * 0.3
        total.partner3 += precoTotal * 0.3
    }
    else {
        total.partner3 += precoTotal * 0.4
        total.partner1 += precoTotal * 0.3
        total.partner2 += precoTotal * 0.3
    }
    total.all += precoTotal
    return total
}


function showResult(total, people) {
    document.querySelector('#areaResult').innerHTML =
        `<div class="row" id="results">
        <p id="resultTitle">Área de resultados</p>
        <p id="resultSubtitle">Valores a receber:</p>
        <div id="infoResult">
        <p id="infoPersonX">${people.person1}: R$${(total.partner1).toFixed(2)}</p>
        <p id="infoPerson2">${people.person2}: R$${(total.partner2).toFixed(2)}</p>
        <p id="infoPerson3">${people.person3}: R$${(total.partner3).toFixed(2)}</p>
        <p id="totalValue" style="margin-top: 20%;">Valor total: R$${(total.all).toFixed(2)}</p>
    </div>
    </div>`
}