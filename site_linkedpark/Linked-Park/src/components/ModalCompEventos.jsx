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
  Select,
} from "@chakra-ui/react";

const ModalCompEventos = ({ data, setData, dataEdit, isOpen, onClose, handleAddItem }) => {
  const [id, setId] = useState("");
  const [evento, setEvento] = useState(dataEdit.evento || "");
  const [dataEvento, setDataEvento] = useState(dataEdit.data || "");

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      // Se não houver dados de edição, calcula o próximo ID sequencial
      const nextId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleSave = () => {
    if (!evento || !dataEvento) {
      console.log("Campos obrigatórios não preenchidos.");
      return;
    }

    if (nameAlreadyExists()) {
      console.log("Evento já cadastrado.");
      return;
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = {
        id: dataEdit.id,
        evento,
        data: dataEvento,
      };
    } else {
      const newItem = {
        id,
        evento,
        data: dataEvento,
      };
      handleAddItem(newItem, dataEdit.section);
    }

    console.log("Dados salvos com sucesso!");

    onClose();
  };

  const nameAlreadyExists = () => {
    if (dataEdit.id !== id && data?.length) {
      return data.find((item) => item.evento === evento);
    }

    return false;
  };

  return (
    <>
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
                <FormLabel>Evento</FormLabel>
                <Input
                  type="text"
                  value={evento}
                  onChange={(e) => setEvento(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Data</FormLabel>
                <Input
                  type="date"
                  value={dataEvento}
                  onChange={(e) => setDataEvento(e.target.value)}
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
    </>
  );
};

export default ModalCompEventos;
