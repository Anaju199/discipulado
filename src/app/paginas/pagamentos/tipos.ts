
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  administrador: boolean;
  nivel: string;
  igreja: string;
  discipulador: string;
}

export interface Discipulado {
  id: number;
  nome: string;
  licao: string;
  nivel: string;
  proximoEstudo: string;
  foto: string;
}

export interface Igreja {
  id: number;
  nome: string;
}

export interface Endereco {
  id: number;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  principal: boolean;
}

export interface Pedido {
  id: number;
  usuario: string;
  item: string;
  valor_pgt: string;
  data_pgt: string;
  numero_pgt: string;
  link_pgt: string
}

// export interface Pagamento {
//   id: number;
//   usuario: string;
//   pedido: string;
//   endereco: string;
//   forma_pgt: string;
//   data_pgt: string;
// }

