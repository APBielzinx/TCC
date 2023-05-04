
function enviarMensagem() {
    const url = 'http://192.168.1.192:8080/faleConosco/enviar';

    let name = document.getElementById('name').value
    let from = document.getElementById('from').value
    let to = document.getElementById('to').value
    let subject = document.getElementById('subject').value
    let text = document.getElementById('text').value
    let mailSend = document.getElementById('mailSend').value

    alert("enviando dados...")
    let dados = {
        name,
        from,
        to,
        subject,
        text,
        mailSend,

    }

    console.log(name)
    if(name || from || subject || text == "" ){

       
       return alert(" é necessario preencher todos os campos");
        

    }



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
            if (!data.ok) {
                alert("Falha ao enviar a mensagem")
                throw Error(data.status);

            } else {
                alert("dados enviados com sucesso")
                limpar()
            }
            return data.text;
        }).catch(e => {
            console.log(e);
        });


}
function limpar() {

    this.name.value = ""
    this.from.value = ""
    this.subject.value = ""
    this.text.value = ""

}
