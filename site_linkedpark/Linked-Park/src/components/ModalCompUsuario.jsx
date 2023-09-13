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
    Select,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  
  const ModalCompUsuario = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [id, setId] = useState("");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [status, setStatus] = useState(dataEdit.status || "");
  
    useEffect(() => {
      if (!Object.keys(dataEdit).length) {
        // Se não houver dados de edição, calcula o próximo ID sequencial
        const nextId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
        setId(nextId.toString());
      }
    }, [data, dataEdit]);
  
    const handleSave = () => {
      if (!email || !status) {
        console.log("Campos obrigatórios não preenchidos.");
        return;
      }
  
      if (emailAlreadyExists()) {
        console.log("E-mail já cadastrado.");
        return;
      }
  
      if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = {
          id: dataEdit.id,
          email,
          status,
        };
      } else {
        const newItem = {
          id,
          email,
          status,
        };
        data.push(newItem);
      }
  
      localStorage.setItem("cad_cliente", JSON.stringify(data));
      setData([...data]);
  
      console.log("Dados salvos com sucesso!");
  
      onClose();
    };
  
    const emailAlreadyExists = () => {
      if (dataEdit.id !== id && data?.length) {
        return data.find((item) => item.email === email);
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
            <ModalHeader>Cadastrar Usuário</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                  <FormLabel>ID</FormLabel>
                  <Input type="text" value={id} isReadOnly />
                </Box>
                <Box>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Status da Conta</FormLabel>
                  <Textarea
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
  
  export default ModalCompUsuario;
  