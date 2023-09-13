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
  Textarea,
} from "@chakra-ui/react";

const ModalCompInfo = ({ data, setData, dataEdit, isOpen, onClose, onUpdateData }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState(dataEdit.name || "");
  const [description, setDescription] = useState(dataEdit.description || "");
  

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      const nextId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleSave = () => {
    if (!name || !description) return;

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = {
        id: dataEdit.id,
        name,
        description,
       
      };
    } else {
      const newItem = {
        id,
        name,
        description,
        
      };
      data.push(newItem);
    }

    localStorage.setItem("cad_cliente", JSON.stringify(data));
    onUpdateData([...data]);

    onClose();
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
          <ModalHeader>Cadastrar Novas Informaçoes</ModalHeader>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box>
                
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

export default ModalCompInfo;
