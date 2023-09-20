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
            {data.map((item, index) => (
              <Tr key={index} cursor="pointer">
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.description}</Td>
                <Td>{item.address}</Td>
                <Td>{item.latitude}</Td>
                <Td>{item.longitude}</Td>
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
    </>
  );
}

export default Parque;
