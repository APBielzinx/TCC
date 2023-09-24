import React from 'react'; // Certifique-se de que 'react' está escrito corretamente
import { createRoot } from 'react-dom'; // Importe 'createRoot' corretamente
import App from './App'; // Importe o componente App (se o arquivo estiver no mesmo diretório)
import { GlobalStyle } from '@chakra-ui/react';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
<>
<App />
<GlobalStyle/>
</>);
