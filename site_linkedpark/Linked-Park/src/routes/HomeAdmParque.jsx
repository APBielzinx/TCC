import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  useDisclosure,
  useBreakpointValue,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  ChatIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import ModalCompInformacoes from "../components/ModalCompInformacoes";
import ModalCompEventos from "../components/ModalCompEventos";
import Menu from "../components/menu/menu";
import FlexContainer from "../components/flexcontainer/FlexContainer";
import Informacoes from "../components/menu/opcoesAdmParque/informacoes";
import Eventos from "../components/menu/opcoesAdmParque/eventos";
import MenuAdmParque from "../components/menu/MenuAdmParque";

function HomeAdmParque() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataInformacoes, setDataInformacoes] = useState([]); // Dados de Informações
  const [dataEventos, setDataEventos] = useState([]); // Dados de Eventos
  const [dataEdit, setDataEdit] = useState({});
  const [showInformacoes, setShowInformacoes] = useState(true);
  const [showEventos, setShowEventos] = useState(false);

  async function handleAddItem(novoItem) {
    try {
      if (showInformacoes) {
        // Lógica para adicionar novas informações
        // Substitua o exemplo abaixo com sua própria lógica para adicionar informações
        console.log("Adicionar informações:", novoItem);

        // Simule uma resposta do servidor (substitua isso pela lógica real)
        const response = { status: 201, data: novoItem };

        if (response.status === 201) {
          const data = response.data;
          console.log("Informações adicionadas com sucesso:", data);
          setDataInformacoes([...dataInformacoes, data]);
          onClose();
        } else {
          console.error("Erro ao adicionar informações:", response.status);
        }
      } else if (showEventos) {
        // Lógica para adicionar novos eventos
        // Substitua o exemplo abaixo com sua própria lógica para adicionar eventos
        console.log("Adicionar eventos:", novoItem);

        // Simule uma resposta do servidor (substitua isso pela lógica real)
        const response = { status: 201, data: novoItem };

        if (response.status === 201) {
          const data = response.data;
          console.log("Eventos adicionados com sucesso:", data);
          setDataEventos([...dataEventos, data]);
          onClose();
        } else {
          console.error("Erro ao adicionar eventos:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  }

  useEffect(() => {
    // Simulação de dados iniciais (substitua isso pela lógica real)
    const initialDataInformacoes = [
      { id: 1, titulo: "Informação 1" },
      { id: 2, titulo: "Informação 2" },
    ];
    const initialDataEventos = [
      { id: 1, titulo: "Evento 1" },
      { id: 2, titulo: "Evento 2" },
    ];

    setDataInformacoes(initialDataInformacoes);
    setDataEventos(initialDataEventos);
  }, []);

  return (
    <Flex h="100vh">
      <MenuAdmParque
        setShowInformacoes={() => {
          setShowInformacoes(true);
          setShowEventos(false);
        }}
        setShowEventos={() => {
          setShowEventos(true);
          setShowInformacoes(false);
        }}
      />
      <FlexContainer>
        <button
          className="botaoNovoCadastro"
          onClick={() => {
            onOpen();
          }}
        >
          NOVO CADASTRO
        </button>
        {/* Tabela (conteúdo) */}
        {showInformacoes && (
          <Informacoes
            data={dataInformacoes}
            handleEditInformacoes={(informacao) => setDataEdit(informacao)}
            handleDeleteInformacoes={(id) => {
              // Lógica de exclusão das informações (substitua pela lógica real)
              console.log("Excluir informações com ID:", id);
              // Atualize os dados após a exclusão
              const newData = dataInformacoes.filter((item) => item.id !== id);
              setDataInformacoes(newData);
            }}
          />
        )}
        {showEventos && (
          <Eventos
            data={dataEventos}
            handleEditEventos={(evento) => setDataEdit(evento)}
            handleDeleteEventos={(id) => {
              // Lógica de exclusão dos eventos (substitua pela lógica real)
              console.log("Excluir evento com ID:", id);
              // Atualize os dados após a exclusão
              const newData = dataEventos.filter((item) => item.id !== id);
              setDataEventos(newData);
            }}
          />
        )}

        {/* Botão "NOVO CADASTRO" */}
        {isOpen && (
          (showInformacoes || showEventos) && (
            <ModalCompInformacoes
              isOpen={isOpen}
              onClose={onClose}
              data={showInformacoes ? dataInformacoes : dataEventos}
              setData={showInformacoes ? setDataInformacoes : setDataEventos}
              dataEdit={dataEdit}
              setDataEdit={setDataEdit}
              handleAddItem={handleAddItem}
            />
          )
        )}
      </FlexContainer>
    </Flex>
  );
}

export default HomeAdmParque;
