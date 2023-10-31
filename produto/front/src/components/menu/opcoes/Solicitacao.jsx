import React,{useState,useEffect} from "react";
import {
  useDisclosure,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalCompSolicitacao from "../../ModalCompSolicitacao";
import ModalComp from "../../ModalComp";
import "../../../css/HomeAdm.css"

function Solicitacao({ data, handleEditSolicitacao, handleDeleteSolicitacao }) {
  const [dataEdit, setDataEdit] = useState({});
  const [dataParque, setDataParque] = useState([]); // Dados do Parque
  const [showParque, setShowParque] = useState(true);
  const [showUsuario, setShowUsuario] = useState(false);
  const [showSolicitacao, setShowSolicitacao] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dados, setDados] = useState([]);
  var administrador = JSON.parse(localStorage.getItem("administrador"));
  
  async function buscarSolicitacao() {
    try {
  
      const token = await administrador.token;

      if (token) {
     
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/solicitacoes",
          {
            method: "GET", 
            headers: headers,
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log(setDados(data))
        
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }
  useEffect(() => {
    buscarSolicitacao();
  }, []);

  return (
    <>
      <Heading className="headingtela">Solicitação</Heading>
      <div className="tamanhoTabela">
        <Table className="tabela">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Email do adm</Th>
              <Th>Status</Th>
              <Th>parque</Th>
              <Th>id do Parque</Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
  {dados.map((item, index) => (
    <Tr key={index} cursor="pointer">
      <Td>{item.idSolicitacoes}</Td>
      <Td>{item.email }</Td>
      <Td>
        {item.status === 0 ? 'Em andamento' : item.status === 1 ? 'Aprovada' : item.status === 2 ? 'Reprovada' : 'N/D'}
      </Td>      <Td>{item.lazer.nome}</Td>
      <Td>{item.lazer.idLazer}</Td>
      <Td p={0}>
        <DeleteIcon
          fontSize={20}
          onClick={() => handleDeleteSolicitacao(item.solicitacao ? item.email : null)}
        />
      </Td>
      <Td p={0}></Td>
    </Tr>
  ))}
</Tbody>

        </Table>
      </div>
    </>
  );
}

export default Solicitacao;
