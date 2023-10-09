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
import ModalComp from "../../ModalComp";

async function handleAddItem(novoItem) {
  if (showParque) {
    console.log(novoItem);
    try {
      // Obtém o token do administrador
      const token = await administrador.token;

      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        // Faça a solicitação POST para adicionar o novo parque
        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/lazer",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(novoItem), // O novoItem deve conter os dados do novo parque
          }
        );

        if (response.status === 201) {
          const data = await response.json();
          console.log("Parque adicionado com sucesso:", data);

          // Adicione o novo parque aos dados existentes
          setDataParque([...dataParque, data]);

          // Feche o modal de adição após a conclusão
          onClose();
        } else {
          console.error("Erro na adição do parque:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao adicionar o parque:", error);
    }
  } else if (showUsuario) {
    // Lógica para adicionar um novo usuário
    // Substitua o exemplo abaixo com sua própria lógica para adicionar usuário
    const novoUsuario = {
      // Defina os campos necessários para adicionar um usuário
      // Exemplo: nome, email, senha, etc.
      nome: novoItem.nome,
      email: novoItem.email,
      senha: novoItem.senha,
    };
    await handleAdicionarUsuario(novoUsuario);
  } else if (showSolicitacao) {
    // Lógica para adicionar uma nova solicitação
    // Substitua o exemplo abaixo com sua própria lógica para adicionar solicitação
    const novaSolicitacao = {
      // Defina os campos necessários para adicionar uma solicitação
      // Exemplo: adminEmail, senha, parqueId, etc.
      adminEmail: novoItem.adminEmail,
      senha: novoItem.senha,
      parqueId: novoItem.parqueId,
    };
    await handleAdicionarSolicitacao(novaSolicitacao);
  }

  // Feche o modal após adicionar o item
  onClose();
}


function Usuario({ data, handleEditUsuario, handleDeleteUsuario }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataParque, setDataParque] = useState([]); // Dados do Parque
  const [dataUsuario, setDataUsuario] = useState([]); // Dados do Usuário
  const [dataSolicitacao, setDataSolicitacao] = useState([]); // Dados da Solicitação
  const [dataEdit, setDataEdit] = useState({});
  const [showParque, setShowParque] = useState(true);
  const [showUsuario, setShowUsuario] = useState(false);
  const [showSolicitacao, setShowSolicitacao] = useState(false);
  const [dados, setDados] = useState([]);
  const [dadosUsuario, setDadosUsuario] = useState([]);

  return (
    <>
      <Heading className="headingtela">Usuário</Heading>
      <div className="tamanhoTabela">
        <Table className="tabela">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Email</Th>
              <Th>Status da conta</Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((usuario, index) => (
              <Tr key={index} cursor="pointer">
                <Td>{usuario.idUsuario}</Td>
                <Td>{usuario.email}</Td>
                {usuario.accountNonExpired
                  ? "Conta Expirada: Não"
                  : "Conta Expirada: Sim"}
                <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => handleDeleteUsuario(usuario.idUsuario)}
                    data-email={usuario.email}
                  />
                </Td>
                <Td p={0}>
                  {/* Qualquer outro conteúdo que você deseje exibir */}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>   
    </>
  );
}

export default Usuario;
