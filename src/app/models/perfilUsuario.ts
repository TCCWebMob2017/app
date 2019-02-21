import { perfilPessoal } from "./perfilPessoal";

export interface perfilUsuario {
    id: string;
    created: string;
    nome: string;
    email: string;
    password: string;
    tefefone: string;
    cpf: string;
    rg: string;
    enabled: boolean;
    tipos: string;
    perfilPessoal?: perfilPessoal;
    perfilPessoal2: perfilPessoal[];
    perfilProfissional: string;
    perfisInstituicoes: string;
}