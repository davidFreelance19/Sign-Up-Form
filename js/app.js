document.addEventListener('DOMContentLoaded', ()=>{
    const formulario = {
        name: '',
        apellido: '',
        email: '',
        password: ''
    }
    const inputName = document.querySelector('#name')
    const inputApellido = document.querySelector('#apellido')
    const inputEmail = document.querySelector('#email')
    const inputPassword = document.querySelector('#password')
    const inputFormulario = document.querySelector('.main__formulario')
    const inputButton =  document.querySelector('.main__button');

    inputName.addEventListener('blur', validar)
    inputApellido.addEventListener('blur', validar)
    inputEmail.addEventListener('blur', validar)
    inputPassword.addEventListener('blur', validar)
    inputButton.addEventListener('click', validarFormulario);

    function validar(e){ 
        let container = document.querySelector(`.container__${e.target.id}`);
        let border =  document.querySelector(`#${e.target.id}`);
        if(e.target.value.trim() === ""){
            mostarAlerta('error', `${e.target.id} can't be blank`, container, border);
            formulario[e.target.id] = ''
            validarFormulario(e)
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostarAlerta('error', 'email is not valid', container, border)
            formulario[e.target.id] = ''
            validarFormulario(e)
            return;
        }
        limpiarAlerta(container, border);
        // Asignamos los valores de los campos
        formulario[e.target.id] =  e.target.value.trim().toLowerCase();
        validarFormulario(e);
        const element = validarFormulario(e);
        if(element){
            setTimeout(() => {
                inputFormulario.reset();
                formulario.name = ''
                formulario.apellido = ''
                formulario.email = ''
                formulario.password = ''
                const inputs = document.querySelectorAll('input');
                inputs.forEach(input =>{
                    input.classList.remove('border-success')
                    input.classList.remove('border-danger')

                })
            }, 500);
        }
    }
    
    function mostarAlerta(tipo, mensaje, contenedor, border){
        limpiarAlerta(contenedor, border);
        if(tipo === 'error'){
            const error =  document.createElement('P');
            error.classList.add('error');
            error.textContent = mensaje;
            contenedor.appendChild(error);
            border.classList.remove('border-success');
            border.classList.add('border-danger');
        }
    }
    function limpiarAlerta(contenedor, border){
        const alerta = contenedor.querySelector('.error')
        if(alerta){
            alerta.remove();
        }
        border.classList.remove('boder-danger');
        border.classList.add('border-success');
    }
    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado =  regex.test(email);
        return resultado;
    }
    function validarFormulario(e){
        e.preventDefault();
        if(Object.values(formulario).includes('')){
            inputs = e.target.parentElement.querySelectorAll('input');
            inputs.forEach(input => {
                if(input.value.trim() === ''){
                    mostarAlerta('error', `${input.id} can't be blank`, input.previousElementSibling, input)
                    return;
                }
                if(input.id === 'email' && !validarEmail(input.value.trim())){
                    mostarAlerta('error', 'email is not valid', input.previousElementSibling, input)
                    return;
                }
                limpiarAlerta(input.previousElementSibling, input)
            });
            return;
        }
        return true;
    }
});
