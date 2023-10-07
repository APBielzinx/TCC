import React, { useState, useEffect } from "react";
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
import "../../../css/HomeAdm.css";
import ModalCompInformacoes from "../../ModalCompInformacoes";

function Informacoes({ data, handleEditInformacoes, handleDeleteInformacoes }) {
  const [isOpen, setIsOpen] = useState(false);

  const [dataEdit, setDataEdit] = useState({}); // Novo estado para dados editados
  const [dados, setDados] = useState(data); // Estado para armazenar os dados

  useEffect(() => {
    setDados(data); // Atualize os dados quando a propriedade data mudar
  }, [data]);

  const handleEditItem = (item) => {
    setDataEdit(item);
    setIsOpen(true);
  };

  return (
    <>
      <Heading className="heading">Informacoes</Heading>
      <div className="tamanhoTabela">
        <Table className="tabela">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Título</Th>
              <Th>Descrição</Th>
              <Th>Data</Th>
              <Th>Adm</Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {dados.map((item, index) => (
              <Tr key={index} cursor="pointer">
                <Td>{item.idInformacoes}</Td>
                <Td>{item.titulo}</Td>
                <Td>{item.descricao}</Td>
                <Td>{item.data}</Td>
                <Td>{item.admin}</Td>
                <Td p={0}>
                  <EditIcon
                    fontSize={20}
                    onClick={() => handleEditItem(item)} // Use handleEditItem
                  />
                </Td>
                <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => handleDeleteInformacoes(item.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      {/* Renderize o ModalCompInformacoes com os estados adequados */}
      <ModalCompInformacoes
        data={dados}
        setData={setDados}
        dataEdit={dataEdit}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

export default Informacoes;
