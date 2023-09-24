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

const ModalCompInformacoes = ({
  data,
  setData,
  dataEdit,
  isOpen,
  onClose,
  onUpdateData,
}) => {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState(dataEdit.titulo || "");
  const [descricao, setDescricao] = useState(dataEdit.descricao || "");

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      const nextId =
        data.length > 0 ? Math.max(...data.map((item) => item.idInformacoes)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleSave = () => {
    if (!titulo || !descricao) {
      console.log("Campos obrigatórios não preenchidos.");
      return;
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = {
        idInformacoes: dataEdit.idInformacoes,
        titulo,
        descricao,
        data: dataEdit.data,
        admin: dataEdit.admin,
      };
    } else {
      const newItem = {
        idInformacoes: id,
        titulo,
        descricao,
        data: new Date().toLocaleDateString(),
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
        <ModalHeader>Cadastrar Novas Informações</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>ID</FormLabel>
              <Input type="text" value={id} isReadOnly />
            </Box>
            <Box>
              <FormLabel>Título</FormLabel>
              <Input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
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

export default ModalCompInformacoes;
