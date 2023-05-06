
function enviar(){
  const url = 'http://192.168.1.192:8080/faleConosco/enviar';
  
  let from = document.getElementById('from').value
  let to= document.getElementById('to').value
  let subject= document.getElementById('subject').value
  let text=  document.getElementById('text').value
  let mailSend= document.getElementById('mailSend').value
  
    alert("enviando dados...")
     let dados = {
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
              if (!data.ok) {
                throw Error(data.status);
               }else{
                  alert("dados enviados com sucesso")
                  limpar()
               }
               return data.text;
              }).catch(e => {
              console.log(e);
              });
  
       
  }
  function limpar(){
  
      this.from.value = ""
      this.subject.value = ""
      this.text.value =""
     
  }
  