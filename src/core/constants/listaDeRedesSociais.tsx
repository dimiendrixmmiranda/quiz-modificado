import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import RedeSocial from "../interfaces/RedeSocial";

const listaDeRedesSociais: RedeSocial[] = [
    {
        icone: <AiFillInstagram />,
        link: '',
        texto: 'Instagram'
    },
    {
        icone: <FaFacebookSquare />,
        link: '',
        texto: 'Facebook'
    },
    {
        icone: <FaGithubSquare />,
        link: '',
        texto: 'Github'
    },
    {
        icone: <FaLinkedin />,
        link: '',
        texto: 'Github'
    },
]

export {
    listaDeRedesSociais
}