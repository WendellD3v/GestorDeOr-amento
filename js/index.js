var section = document.querySelector('section');
var saldo = 0;

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


// if (section.id == ''){
//     section.id = 'Gestor'
// }

function loadMoney(){
    event.returnValue = false
    event.cancelable = true

    var saldoInput = document.querySelector('#saldo-input').value;
    section.classList.add('close')
    setTimeout(() =>{
        section.classList.remove('close');
        section.id = 'Gestor';
        section.innerHTML = `
            <div class="main-container">
                <div class="general-info">
                    <div class="saldo-container">
                        <img src="imgs/bank.svg" alt="banco">
                        <div class="saldo-atual">
                            <h1>Saldo:</h1>
                            <p>R$ ${saldoInput}</p>
                        </div>
                    </div>

                    <div class="actions-container">
                        <button>Despesas</button>
                        <button>Rendas</button>
                    </div>
                </div>

                <div class="general-saldo">
                    <div class="saldo-title">
                        <h1>Relatório De Gastos</h1>
                    </div>
                    
                    <div class="relatorio">
                        <p><b>Saldo Inicial:</b> R$ 0,00</p>
                        <p><b>Despesas Totais:</b> R$ 0,00</p>
                        <p><b>Rendas Totais:</b> R$ 0,00</p>
                    </div>

                    <div class="total-saldo">
                        <h2>Saldo Total:</h2>
                        <h1>R$ ${saldoInput}</h1>
                    </div>

                    <div class="gestor-actions">
                        <button>Adicionar Rendas</button>
                        <button>Adicionar Despesas</button>
                    </div>
                </div>
            </div>
        `
    }, 500)
}