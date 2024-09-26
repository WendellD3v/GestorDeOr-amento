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

    section.classList.add('close')
    setTimeout(() =>{
        section.classList.remove('close');
        section.innerHTML = '';
        section.id = '';
    }, 500)
}