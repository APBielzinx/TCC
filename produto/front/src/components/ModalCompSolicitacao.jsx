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
import { useState, useEffect } from "react";

const ModalCompSolicitacao = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [id, setId] = useState("");
  const [adminEmail, setAdminEmail] = useState(dataEdit.adminEmail || "");
  const [senha, setSenha] = useState(dataEdit.senha || "");
  const [parqueId, setParqueId] = useState(dataEdit.parqueId || "");
  const [status, setStatus] = useState(dataEdit.status || "Ativo");

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      // Se não houver dados de edição, calcula o próximo ID sequencial
      const nextId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleSave = () => {
    if (!adminEmail || !senha || !parqueId || !status) return;

    if (adminEmailAlreadyExists()) {
      return alert("E-mail já cadastrado!");
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = {
        id: dataEdit.id,
        adminEmail,
        senha,
        parqueId,
        status,
      };
    } else {
      const newItem = {
        id,
        adminEmail,
        senha,
        parqueId,
        status,
      };
      data.push(newItem);
    }

    localStorage.setItem("cad_cliente", JSON.stringify(data));
    setData([...data]);

    onClose();
  };

  const adminEmailAlreadyExists = () => {
    if (dataEdit.id !== id && data?.length) {
      return data.find((item) => item.adminEmail === adminEmail);
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
          <ModalHeader>Cadastrar Solicitação</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>ID</FormLabel>
                <Input type="text" value={id} isReadOnly />
              </Box>
              <Box>
                <FormLabel>E-mail do Adm</FormLabel>
                <Input
                  type="text"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="text"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>ID do Parque</FormLabel>
                <Input
                  type="text"
                  value={parqueId}
                  onChange={(e) => setParqueId(e.target.value)}
                />
              </Box>
              <Box>
              <FormLabel>Status</FormLabel>
<Select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  borderRadius="5px"
  bg="rgba(255, 255, 255, 0.3)"
  color="black"
>
  <option value="Ativo" style={{ backgroundColor: 'transparent' }}>Ativo</option>
  <option value="Inativo" style={{ backgroundColor: 'transparent' }}>Inativo</option>
</Select>

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

export default ModalCompSolicitacao;
