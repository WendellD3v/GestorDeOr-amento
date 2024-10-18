var section = document.querySelector('section');
var saldoInicial = 0
var saldo = 0;
var despesas = []
var rendas = []

if (section.id == ''){
    section.id = 'Login';
    section.innerHTML = `
        <div class="login">
                    
            <h1>Gestor de orçamentos</h1>
            
            <form onsubmit="loadMoney()">
                <label for="Value">Digite seu saldo atual</label>
                <br>
                <input type="number" name="saldo-input" id="saldo-input" placeholder="0,00" required>
                <br>
                <div class="send">
                    <input type="submit" value="Iniciar">
                </div>
            </form>
        </div>
    `
}

function loadLogs(type, logInfo){
    var boxSlots = document.querySelector('.logs-containers');
    if (type == 'Despesas'){
        boxSlots.innerHTML = ''
        for (let i = 0; i < despesas.length; i++){
            boxSlots.innerHTML = boxSlots.innerHTML + `
                <div class="log-register" id='${i}'>
                    <div class="log-infos">
                        <div class="log-icon">
                            <img src="imgs/money.svg" alt="money">
                        </div>
                        <div class="info">
                            <h1>Despesa:</h1>
                            <p>${despesas[i]['Despesa']}</p>
                        </div>
                    </div>

                    <div class="log-actions">
                        <h1>-${(despesas[i]['Valor']).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</h1>
                        <button onclick='removeValue("Despesa", ${i})'><img src="imgs/delete.svg" alt="money"></button>
                    </div>
                </div>
            `
        }
    }else if(type == 'Rendas'){
        boxSlots.innerHTML = ''
        for (let i = 0; i < rendas.length; i++){
            boxSlots.innerHTML = boxSlots.innerHTML + `
                <div class="log-register">
                    <div class="log-infos">
                        <div class="log-icon">
                            <img src="imgs/money.svg" alt="money">
                        </div>
                        <div class="info">
                            <h1>Renda:</h1>
                            <p>${rendas[i]['Despesa']}</p>
                        </div>
                    </div>

                    <div class="log-actions">
                        <h1>+${(rendas[i]['Valor']).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</h1>
                        <button onclick='removeValue("Renda", ${i})'><img src="imgs/delete.svg" alt="money"></button>
                    </div>
                </div>
            `
        }
    }
}

function loadReport(){
    var DespesasTotais = 0
    var RendasTotais = 0
    
    for (let i = 0; i < despesas.length; i++){
        DespesasTotais = DespesasTotais + despesas[i]['Valor']
    }

    for (let i = 0; i < rendas.length; i++){
        RendasTotais = RendasTotais + rendas[i]['Valor']
    }  

    var total = (RendasTotais + saldo) - DespesasTotais

    document.querySelector('#despesasTotais').innerHTML = (DespesasTotais).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    document.querySelector('#rendasTotais').innerHTML = (RendasTotais).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    document.querySelector('#Saldo').innerHTML = (total).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    document.querySelector('#TotalSaldo').innerHTML = (total).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

}

function loadMoney(){
    event.returnValue = false
    event.cancelable = true

    var saldoInput = document.querySelector('#saldo-input').value;
    section.classList.add('close')
    setTimeout(() =>{
        saldoInicial = saldoInput
        saldo = parseFloat(saldoInput)
        section.classList.remove('close');
        section.id = 'Gestor';
        section.innerHTML = `
            <div class="main-container">
                <div class="general-info">
                    <div class="saldo-container">
                        <img src="imgs/bank.svg" alt="banco">
                        <div class="saldo-atual">
                            <h1>Saldo:</h1>
                            <p><span id='Saldo'>${(saldo).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</span></p>
                        </div>
                    </div>

                    <div class="actions-container">
                        <div class="actions-types">
                            <button class="selected" id='DespesasType' onclick='changeTypes("Despesa")'>Despesas</button>
                            <button id='RendasType' onclick='changeTypes("Renda")'>Rendas</button>
                        </div>

                        <div class="logs-containers">
                        </div>
                    </div>
                </div>

                <div class="general-saldo">
                    <div class="saldo-title">
                        <h1>Relatório De Gastos</h1>
                    </div>
                    
                    <div class="relatorio">
                        <p><b>Saldo Inicial:</b> ${(parseFloat(saldoInicial)).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                        <p><b>Despesas Totais:</b> <span id='despesasTotais'>0</span></p>
                        <p><b>Rendas Totais:</b> <span id='rendasTotais'>0</span></p>
                    </div>

                    <div class="total-saldo">
                        <h2>Saldo Total:</h2>
                        <h1><span id='TotalSaldo'>${(saldo).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</span></h1>
                    </div>

                    <div class="gestor-actions">
                        <button onclick='actionMenu("Renda")'>Adicionar Rendas</button>
                        <button onclick='actionMenu("Despesa")'>Adicionar Despesas</button>
                    </div>
                </div>
            </div>
        `
        document.querySelector('.main-container').classList.add('open')

        loadLogs('Despesas')
        loadReport()

        setInterval(() => {
            document.querySelector('.main-container').classList.remove('open')
        }, 1000)
    }, 500)
}


function actionMenu(type){
    if (!document.querySelector('.action-menu-container')) {
        if (type == 'Renda') {
            var section = document.querySelector('section');
            if (section) {
                section.innerHTML = section.innerHTML + `
                <div class="action-menu-container">
                    <div class="action-container">
                        <h1>Adicionar Renda</h1>
                        
                        <form onsubmit="addAction('Renda')">
                            
                            <label for="saldo-motivo">Digite o motivo da renda</label>
                            <br>
                            <input type="text" name="saldo-motivo" id="motivo-input" placeholder="Ex: Presente De Aniversário" autocomplete="off" required>
                            <br>
                            <br>
                            <label for="Value">Digite o valor adicionado</label>
                            <br>
                            <input type="number" name="saldo-input" id="saldo-input" placeholder="0,00" autocomplete="off" required>
                            <br>
                            <div class="send">
                                <input type="submit" value="Adicionar">
                                <input type="button" onclick="closeAction()" value="Fechar">
                            </div>

                            
                        </form>
                    </div>
                </div>
                `
            }
        }else if (type == 'Despesa'){
            var section = document.querySelector('section');
            if (section) {
                section.innerHTML = section.innerHTML + `
                <div class="action-menu-container">
                    <div class="action-container">
                        <h1>Adicionar Despesa</h1>
                        
                        <form onsubmit="addAction('Despesa')">
                            
                            <label for="saldo-motivo">Digite o motivo da despesa</label>
                            <br>
                            <input type="text" name="saldo-motivo" id="motivo-input" placeholder="Ex: Presente De Aniversário" autocomplete="off" required>
                            <br>
                            <br>
                            <label for="Value">Digite o valor removido</label>
                            <br>
                            <input type="number" name="saldo-input" id="saldo-input" placeholder="0,00" autocomplete="off" required>
                            <br>
                            <div class="send">
                                <input type="submit" value="Adicionar">
                                <input type="button" onclick="closeAction()" value="Fechar">
                            </div>

                            
                        </form>
                    </div>
                </div>
                `
            }
        }
    }
}

function changeTypes(type){
    var rendaButton = document.querySelector('#RendasType');
    var despesasButton = document.querySelector('#DespesasType');
    if (type === 'Renda'){
        if (!rendaButton.classList.contains('selected')) {
            rendaButton.classList.add('selected');
            despesasButton.classList.remove('selected');
            loadLogs('Rendas')
        }
    }else if(type === 'Despesa'){
        if (!despesasButton.classList.contains('selected')) {
            despesasButton.classList.add('selected');
            rendaButton.classList.remove('selected');
            loadLogs('Despesas')
        }
    }
}

function addAction(type) {
    event.returnValue = false
    event.cancelable = true
    if (document.querySelector('.action-menu-container')){
        var motivo = document.querySelector('#motivo-input').value;
        var valor = document.querySelector('#saldo-input').value;
        var rendaButton = document.querySelector('#RendasType');
        var despesasButton = document.querySelector('#DespesasType');
        
        if (type == 'Renda'){
            rendas.push({
                'Despesa': `${motivo}`,
                'Valor': parseFloat(valor),
            })

            if (rendaButton.classList.contains('selected')) {
                loadLogs('Rendas')
                console.log('Carregado')
            }
            loadReport()
            document.querySelector('.action-menu-container').remove();
        }else if (type == 'Despesa'){
            despesas.push({
                'Despesa': `${motivo}`,
                'Valor': parseFloat(valor),
            })

            if (despesasButton.classList.contains('selected')) {
                loadLogs('Despesas')
            }
            loadReport()
            document.querySelector('.action-menu-container').remove();
        }
        console.log('Adicionado')
    }
}

function closeAction(){
    if (document.querySelector('.action-menu-container')) {
        document.querySelector('.action-menu-container').remove()
    }    
}

function removeValue(type, id){
    console.log('Acionada')
    if (type == 'Despesa'){
        despesas.shift(parseInt(id), 1)
        loadLogs('Despesas')
        loadReport()
    }else if (type == 'Renda'){
        rendas.shift(parseInt(id), 1)
        loadLogs('Rendas')
        loadReport()
    }
}