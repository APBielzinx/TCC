import React,{useState,useEffect} from "react";
import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

function Parque({ data, handleEditParque, handleDeleteParque }) {
  const [dados, setDados] = useState([]);

  var administrador = JSON.parse(localStorage.getItem("administrador"));

  async function buscarParques() {
    try {
      // Obtém o token de AsyncStorage
      const token = await administrador.token;

      if (token) {
        // Construa o cabeçalho Authorization
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        // Faça a solicitação usando o cabeçalho personalizado
        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/lazer",
          {
            method: "GET", // ou outro método HTTP
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
  return (
    <>
    <div className="content">
      <Heading className="heading">Parque</Heading>
      <div className="tamanhoTabela">
        <Table className="tabela"  style={{marginTop: -20}}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Endereço</Th>
              <Th>Latitude</Th>
              <Th>Longitude</Th>
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
                    onClick={() => handleDeleteParque(item.id)}
                  />
                </Td>
                <Td p={0}>
                  <img
                    className="imagemParque"
                    src={item.image}
                    alt={`Imagem de ${item.name}`}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      </div>
    </>
  );
}

export default Parque;
