import { useParams, useNavigate } from "react-router-dom"

const ContactDetails = () => {
    const {id} = useParams();

    const navigate = useNavigate()

    const handleContact = () => {
        console.log("Contato enviado!")
        return navigate("/")
    }

  return (
  <div>
    <h1>Exixbindo mais informações do contato {id}</h1>
    <button onClick={handleContact}>Enviar Mensagem</button>
  </div>
  );
}

export default ContactDetails