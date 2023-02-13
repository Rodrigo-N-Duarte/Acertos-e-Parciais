window.onload = () => {
    //objeto master com o que cada um acumula no total e o valor de sobra que está na conta e que deve ser pago
    let total = {
        partner1: 0,
        partner2: 0,
        partner3: 0,
        raisedPartner1: 0,
        raisedPartner2: 0,
        raisedPartner3: 0,
        all: 0,
    }
    localStorage.setItem('total', JSON.stringify(total))
    localStorage.setItem('count', 0)
}

const btnAdd = document.querySelector('#btnAdd')
btnAdd.addEventListener('click', addList)

function addList() {
    let employees = {
        partner1: document.querySelector(`#inputpartner1`).value,
        partner2: document.querySelector(`#inputpartner2`).value,
        partner3: document.querySelector(`#inputpartner3`).value
    }
    if (employees.partner1 == "" || employees.partner2 == "" || employees.partner3 == "") {
        alert('Complete todos os campos antes de continuar!')
        window.FlashMessage.error('Erro');
    }
    else {
        let parterSelected
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
                                    <form id="formNewSale">
                                        <fieldset>
                                            <div>
                                            <span>Selecione quem realizou a imagem<br></span>
                                                <input type="radio" id="contactChoice1" name="contact"
                                                    value="partner1" />
                                                <label for="contactChoice1">${employees.partner1}</label>
                                                <input type="radio" id="contactChoice2" name="contact"
                                                    value="partner2" />
                                                <label for="contactChoice2">${employees.partner2}</label>
                                                <input type="radio" id="contactChoice3" name="contact"
                                                    value="partner3" />
                                                <label for="contactChoice3">${employees.partner3}</label>
                                            </div>
                                            <div>
                                            <p class="cautionMessage">* Atente-se aos valores antes de enviar os dados</p>
                                            <p class="cautionMessage">* Se nenhum sócio for indicado, o primeiro informado será usado para efetuar o cáclulo</p>
                                                <button type="submit" class="btn btn-warning"
                                                    id="btnSubmit">Enviar</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>`

        const form = document.querySelector("#formNewSale");

        form.addEventListener("submit", (event) => {
            const data = new FormData(form);
            let output = "";
            for (const entry of data) {
                parterSelected = `${entry[1]}`;
            }
            event.preventDefault();
            let sale = {
                unitPrice: document.querySelector(`#inputUnitPrice${count}`).value,
                amount: document.querySelector(`#inputAmount${count}`).value,
                selected: parterSelected
            }
            total = createSale(sale, total)
            count++
            console.log(total)
            localStorage.setItem('total', JSON.stringify(total))
            window.FlashMessage.success('Adicionado com sucesso!');
            valueArea.style.display = 'none'
            showResult(total, employees)
        },
            false
        );
    }
}

function createSale(sale, total) {
    let precoTotal = sale.unitPrice * sale.amount
    if (sale.selected == 'partner1') {
        total.partner1 += precoTotal * 0.4
        total.partner2 += precoTotal * 0.3
        total.partner3 += precoTotal * 0.3
        total.raisedPartner1 += precoTotal
    }
    else if (sale.selected == 'partner2') {
        total.partner2 += precoTotal * 0.4
        total.partner1 += precoTotal * 0.3
        total.partner3 += precoTotal * 0.3
        total.raisedPartner2 += precoTotal
    }
    else {
        total.partner3 += precoTotal * 0.4
        total.partner1 += precoTotal * 0.3
        total.partner2 += precoTotal * 0.3
        total.raisedPartner3 += precoTotal
    }
    total.all += precoTotal
    return total
}

function showResult(total, employees) {
    let toPay1 = 0, toPay2 = 0, toPay3 = 0
    let plusIcon = ' <i class="bi bi-plus-circle"></i>', minusIcon = ' <i class="bi bi-dash-circle"></i>'

    if (total.partner1 > total.raisedPartner1)
        toPay1 = (total.partner1 - total.raisedPartner1).toFixed(2) + plusIcon
    else
        toPay1 = (total.raisedPartner1 - total.partner1).toFixed(2) + minusIcon
    if (total.partner2 > total.raisedPartner2)
        toPay2 = (total.partner2 - total.raisedPartner2).toFixed(2) + plusIcon
    else
        toPay2 = (total.raisedPartner2 - total.partner2).toFixed(2) + minusIcon
    if (total.partner3 > total.raisedPartner3)
        toPay3 = (total.partner3 - total.raisedPartner3).toFixed(2) + plusIcon
    else
        toPay3 = (total.raisedPartner3 - total.partner3).toFixed(2) + minusIcon

    //atualiza div de resultados a cada nova soma adicionada
    document.querySelector('#areaResult').innerHTML =
        `<div class="row" id="results">
        <p id="resultTitle">Área de resultados</p>
        <p id="resultSubtitle">Valores em que a conta de cada sócio deverá ter ao final:</p>
        <div id="infoResult">
        <p>${employees.partner1}: R$${(total.partner1).toFixed(2)}</p>
        <p>${employees.partner2}: R$${(total.partner2).toFixed(2)}</p>
        <p>${employees.partner3}: R$${(total.partner3).toFixed(2)}</p>
        <div id="totalValue">
        <p>Valor total: R$${(total.all).toFixed(2)}</p>
        </div>
        <p>Valor nas contas individuais, '<i class="bi bi-plus-circle"></i>' deve receber e '<i class="bi bi-dash-circle"></i>' deve pagar:</p>
        <p><b>${employees.partner1}</b>: R$${(toPay1)}</p>
        <p><b>${employees.partner2}</b>: R$${(toPay2)}</p>
        <p><b>${employees.partner3}</b>: R$${(toPay3)}</p>
    </div>
    </div>`
}