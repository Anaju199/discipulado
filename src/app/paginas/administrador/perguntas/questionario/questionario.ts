export interface Pergunta {
  id: number
  discipulado: string
  discipulado_nome: string
  pergunta: string
}

export interface Resposta {
  id: number
  usuario: string
  pergunta: number
  pergunta_texto: string
  resposta: string
}


