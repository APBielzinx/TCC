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
  Image,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState(dataEdit.name || "");
  const [description, setDescription] = useState(dataEdit.description || "");
  const [address, setAddress] = useState(dataEdit.address || "");
  const [latitude, setLatitude] = useState(dataEdit.latitude || "");
  const [longitude, setLongitude] = useState(dataEdit.longitude || "");
  const [categoria, setCategoria] = useState(dataEdit.categoria || "");
  const [admin, setAdmin] = useState(dataEdit.admin || "Não");
  const [imageUrl, setImageUrl] = useState(dataEdit.image || "");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      // Se não houver dados de edição, calcula o próximo ID sequencial
      const nextId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  var administrador = JSON.parse(localStorage.getItem("administrador"));


  async function handleSave(){
    if (!name || !description || !address || !latitude || !longitude|| !categoria || !selectedImage) return;
      try {
        const token = await administrador.token;
  
        if (token) {
          const headers = {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          };
  
          const response = await fetch(
            `https://tcc-production-e100.up.railway.app/api/lazer`,
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify({
                "nome": name,
                "descricao": description,
                "endereco": address,
                "latitude": latitude,
                "longetude": longitude,
                "categoria": categoria,
                "imagem": selectedImage,
              }),
            }
          );
  
          if (response.status === 201) {
            console.log("Usuário removido com sucesso!");
          } else {
            console.error("Erro ao cadastar parque:", response.status);
          }
        }
      } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
      }
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
          <ModalHeader>Cadastrar área de lazer</ModalHeader>
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
                <FormLabel>Endereço</FormLabel>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Latitude</FormLabel>
                <Input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Longitude</FormLabel>
                <Input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Categoria</FormLabel>
                <Input
                  type="text"
                  value={categoria}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Adm</FormLabel>
                <Select
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                  borderRadius="5px"
                  bg="rgba(255, 255, 255, 0.3)"
                  color="black"
                >
                  <option value="Sim" style={{ backgroundColor: 'transparent' }}>Sim</option>
                  <option value="Não" style={{ backgroundColor: 'transparent' }}>Não</option>
                </Select>
              </Box>
              <Box>
                <FormLabel>Selecione a imagem do Parque</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Box>
              <Box>
                {selectedImage && <Image src={selectedImage} maxH="200px" alt="Imagem" />}
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

export default ModalComp;
 