import { Pessoal } from "./pessoal";

export class Usuario {
    id: string;
    created: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    rg: string;
    enabled: boolean;
    
    perfilPessoal: Pessoal;

}