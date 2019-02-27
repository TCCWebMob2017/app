import { perfilPessoal } from "./perfilPessoal";
import { perfilProfissional } from "./perfilProfissional";
import { perfilInstitucional } from "./perfilInstitucional";

export interface UsuarioDTO {
    id: string;
    created: string;
    nome: string;
    email: string;
    password: string;
    tefefone?: string;
    cpf: string;
    rg?: string;
    emabled: boolean;
    tipos: string;
    perfilPessoal?: perfilPessoal;
    perfilProfissional?: perfilProfissional;
    perfisInstituicoes?: perfilInstitucional;    
}