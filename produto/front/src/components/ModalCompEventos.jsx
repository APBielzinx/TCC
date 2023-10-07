import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
} from "@chakra-ui/react";

const ModalCompEventos = ({
  data,
  setData,
  dataEdit,
  isOpen,
  onClose,
  onUpdateData,
}) => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState(dataEdit.nome || "");
  const [descricao, setDescricao] = useState(dataEdit.descricao || "");

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      const nextId =
        data.length > 0 ? Math.max(...data.map((item) => item.idEvento)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleSave = () => {
    if (!nome || !descricao) {
      console.log("Campos obrigatórios não preenchidos.");
      return;
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = {
        idEvento: dataEdit.idEvento,
        nome,
        descricao,
        data: dataEdit.data,
        localizacao: dataEdit.localizacao,
        admin: dataEdit.admin,
      };
    } else {
      const newItem = {
        idEvento: id,
        nome,
        descricao,
        data: new Date().toLocaleDateString(),
        localizacao: "Localização", // Defina o valor da localização conforme necessário
        admin: "Admin", // Defina o valor do administrador conforme necessário
      };
      data.push(newItem);
    }

    localStorage.setItem("cad_cliente", JSON.stringify(data));
    onUpdateData([...data]);

    // Feche a modal após salvar
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(5px)"
        zIndex="999"
        color="white"
        borderRadius="10px"
      >
        <ModalHeader>Cadastrar Novo Evento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>ID</FormLabel>
              <Input type="text" value={id} isReadOnly />
            </Box>
            <Box>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="start">
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            SALVAR
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            CANCELAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCompEventos;
