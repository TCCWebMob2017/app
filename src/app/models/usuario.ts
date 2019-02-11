export interface UsuarioDTO {
    id: string;
    created: string;
    nome: string;
    email: string;
    password: string;
    telefone?: string;
    cpf: string;
    rg?: string;
    emabled: boolean;
    tipos: string;
    perfilPessoal: string;
    perfilProfissional: string;
    perfisInstituicoes: string;    
}