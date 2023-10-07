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
import "../../../css/HomeAdm.css"

function Solicitacao({ data, handleEditSolicitacao, handleDeleteSolicitacao }) {
  return (
    <>
      <Heading className="headingtela">Solicitação</Heading>
      <div className="tamanhoTabela">
        <Table className="tabela">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Email do adm</Th>
              <Th>Senha</Th>
              <Th>ID do parque</Th>
              <Th>Status</Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(({ id, adminEmail, senha, parqueId, status }, index) => (
              <Tr key={index} cursor="pointer">
                <Td>{id}</Td>
                <Td>{adminEmail}</Td>
                <Td>{senha}</Td>
                <Td>{parqueId}</Td>
                <Td>{status}</Td>
                <Td p={0}>
                  <EditIcon
                    fontSize={20}
                    onClick={() => handleEditSolicitacao(id)}
                  />
                </Td>
                <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => handleDeleteSolicitacao(adminEmail)}
                    data-adminEmail={adminEmail}
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
