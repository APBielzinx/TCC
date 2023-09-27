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

function Usuario({ data, handleEditUsuario, handleDeleteUsuario }) {
  return (
    <>
    <div className="content">
      <Heading className="heading" fontSize="30px">Usuário</Heading>
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
                  <EditIcon
                    fontSize={20}
                    onClick={() => handleEditUsuario(usuario)}
                  />
                </Td>
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
    </div>
    </>
  );
}

export default Usuario;
