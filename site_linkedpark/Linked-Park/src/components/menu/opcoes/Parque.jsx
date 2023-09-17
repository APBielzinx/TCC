import React from "react";
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
  return (
    <>
      <Heading className="heading">Parque</Heading>
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
              <Th>Adm</Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index} cursor="pointer">
                <Td>{item.idLazer}</Td>
                <Td>{item.nome}</Td>
                <Td>{item.descricao}</Td>
                <Td>{item.endereco}</Td>
                <Td>{item.latitude}</Td>
                <Td>{item.longetude}</Td>
                <Td>{item.administrador}</Td>
                <Td p={0}>
                  <EditIcon
                    fontSize={20}
                    onClick={() => handleEditParque(item)}
                  />
                </Td>
                <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => handleDeleteParque(item.idLazer)}
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
