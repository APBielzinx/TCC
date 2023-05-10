
function enviarMensagem() {
    const url = 'http://192.168.1.192:8080/faleConosco/enviar';

    let name = document.getElementById('name').value
    let from = document.getElementById('from').value
    let to = document.getElementById('to').value
    let subject = document.getElementById('subject').value
    var text = document.getElementById('text').value
    let mailSend = document.getElementById('mailSend').value

    console.log(text)
    let dados = {
        name,
        from,
        to,
        subject,
        text,
        mailSend,

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
            if (data.status == 204) {
                alert("é necessario preencher todos os campos")
                limpar()
                throw Error(data.status);
            } else if (data.status == 400) {
                alert("enviando dados...")
                alert("Você já enviou emails de mais hoje, volte novamente mais tarde")
                limpar()
                throw Error(data.status);

            } else if (data.status == 201) {
                alert("enviando dados...")
                alert("dados criados e enviados com sucesso")
                limpar()
            } else if (data.status == 200) {
                alert("enviando dados...")
                alert("dados enviados com sucesso")
                limpar()
            } else if (data.status == 500) {
                alert("enviando dados...")
                alert("ocorreu um erro no servidor")
                limpar()
                throw Error(data.status);

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
