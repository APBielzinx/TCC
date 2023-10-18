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
import "../../../css/HomeAdm.css"
import ModalComp from "../../ModalComp";
import swal from "sweetalert"


function Parque({ data, handleDeleteParque }) {
  const [dataEdit, setDataEdit] = useState({});
  const [dataParque, setDataParque] = useState([]); // Dados do Parque
  const [showParque, setShowParque] = useState(true);
  const [showUsuario, setShowUsuario] = useState(false);
  const [showSolicitacao, setShowSolicitacao] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dados, setDados] = useState([]);
  
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
  } 
}

          } else {
            console.error("Erro na adição do parque:", response.status);
          }
        }
      } catch (error) {
        console.error("Erro ao adicionar o parque:", error);
      }
    } 
  }

  const handleEditParque = (parque) => {
    // Abre a modal de edição de parque e passa os dados do parque para a modal
    onOpen();
    setDataEdit(parque); // Define os dados do parque que você deseja editar
  };

  var administrador = JSON.parse(localStorage.getItem("administrador"));
  console.log(administrador)

  async function buscarParques() {
    try {
  
      const token = await administrador.token;

      if (token) {
     
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/lazer",
          {
            method: "GET", 
            headers: headers,
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log("Dados da resposta: p", data);
          setDados(data);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }
  useEffect(() => {
    buscarParques();
  }, []);
  

 

  async function handleExcluirParque(id) {
    swal({
      text: "Tem certeza que quer excluir?",
      icon: "warning",
      buttons: ["Não", "Sim"],
    }).then(async (resposta) => {
      if (resposta) {
        try {
          const token = await administrador.token;

          if (token) {
            const headers = {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            };

            const response = await fetch(
              `https://tcc-production-e100.up.railway.app/api/lazer/${id}`,
              {
                method: "DELETE",
                headers: headers,
              }
            );

            if (response.status === 204) {
              swal({
                text: "Excluído com sucesso",
                icon: "success",
                button: "Ok"
              });

            } else {
              console.error("Erro na exclusão do parque:", response.status);
            }
          }
        } catch (error) {
          swal({
            text: "Erro na exclusão",
            icon: "error",
            button: "Ok"
          });
        }
      }
      window.location.reload();
    });
    console.log("id"+id)

  }
  return (
    <>
      {isOpen && (
                showParque ? (
                  <ModalComp
                    isOpen={isOpen}
                    onClose={onClose}
                    data={dataParque}
                    setData={setDataParque}
                    dataEdit={dataEdit}
                    setDataEdit={setDataEdit}
                    handleAddItem={handleAddItem}
                  />
                ) : (
                  showUsuario ? (
                    <ModalCompUsuario
                      isOpen={isOpen}
                      onClose={onClose}
                      data={dataUsuario}
                      setData={setDataUsuario}
                      dataEdit={dataEdit}
                      setDataEdit={setDataEdit}
                      handleAddItem={handleAddItem}
                    />
                  ) : (
                    <ModalCompSolicitacao
                      isOpen={isOpen}
                      onClose={onClose}
                      data={dataSolicitacao}
                      setData={setDataSolicitacao}
                      dataEdit={dataEdit}
                      setDataEdit={setDataEdit}
                      handleAddItem={handleAddItem}
                    />
                  )
                )
              )}
      <button
                className="botaoNovoCadastro"
                onClick={() => {
                  onOpen();
                }}
              >
                NOVO CADASTRO
              </button>
      <Heading className="headingtela">Parque</Heading>
      <div className="tamanhoTabela">
        <Table className="tabela">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Endereço</Th>
              <Th>Latitude</Th>
              <Th>Longitude</Th>
              <Th>Categoria</Th>
              <Th>Adm</Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {dados.map((item, index) => (
              <Tr key={index} cursor="pointer">
                <Td>{item.idLazer}</Td>
                <Td>{item.nome}</Td>
                <Td>{item.descricao}</Td>
                <Td>{item.endereco}</Td>
                <Td>{item.latitude}</Td>
                <Td>{item.longetude}</Td>
                <Td>{item.categoria}</Td>
                <Td>{item.admin}</Td>
                <Td p={0}>
                  <EditIcon
                    fontSize={20}
                    onClick={() => handleEditParque(item)}
                  />
                </Td>
                <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => handleExcluirParque(item.idLazer)}
                  />
                </Td>
                <Td p={0}>
                  <img
                    className="imagemParque"
                    src={item.imagem}
                    alt={`Imagem de ${item.name}`}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </>
  );
}

export default Parque;
