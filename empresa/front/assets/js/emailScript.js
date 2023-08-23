


function enviarMensagem() {
    console.log("oi")
    const url = 'https://testecontroller-production.up.railway.app/faleConosco/enviar';

  
    let from = document.getElementById('email').value

    if(validateEmail(from) == false){
        return alert("insira um email valido")
    }

  
    let dados = {

        from
     
    }

    console.log(from)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
        crossDomain: true,
    };

    fetch(url, options)
        .then(data => {
            if (data.status == 204) {
                alert("é necessario preencher todos os campos")
                throw Error(data.status);
            } else if (data.status == 400) {
                alert("enviando dados...")
                alert("Você já enviou emails de mais hoje, volte novamente mais tarde")
                throw Error(data.status);
            } else if (data.status == 201) {
                alert("enviando dados...")
                alert("email verificado com sucesso")
                toType()


            } else if (data.status == 200) {
                alert("enviando dados...")
                swal({
                    title: "Sucesso",
                    text: "o Email foi enviado",
                    icon: "success",
                  });
                toType()
            
            } else if (data.status == 500) {
                alert("enviando dados...")
                alert("ocorreu um erro no servidor")
               
                throw Error(data.status);

            }
            return data.text;
        }).catch(e => {
            console.log(e);
        });


}


function toType(){
    let name = document.getElementById('name')
    let subject = document.getElementById('subject')
    let text = document.getElementById('text')
    let button = document.getElementById('botao')
    let buttonVerifica = document.getElementById('botaoVerifica')
    let from = document.getElementById('email')


   name.type = "text"
   name.ariaPlaceholder = "nome"

   subject.type = "text"
   subject.ariaPlaceholder = "Assunto"

   text.style.display = ""


   button.style.display =""

   buttonVerifica.style.display="none"

   from.type = "hidden"
}


function validateEmail(email)
{
 var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
 if (reg.test(email)){
 return true; }
 else{
 return false;
 }
} 