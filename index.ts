const fs = require("fs");

function lerArquivo(): unknown {
  return JSON.parse(fs.readFileSync("./bd.json"));
}

function escreverArquivo(dados: any): void {
  fs.writeFileSync("./bd.json", JSON.stringify(dados));
  return;
}

type Endereco = {
  cep: number;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: number;
  profissao?: string;
  endereco: Endereco | null;
};

function cadastrarUsuario(dados: Usuario): Usuario {
  const bd = lerArquivo() as Usuario[];

  bd.push(dados);

  escreverArquivo(bd);

  return dados;
}

function listarUsuarios(): Usuario[] {
  return lerArquivo() as Usuario[];
}

cadastrarUsuario({
  nome: "paulo",
  email: "paulo@email.com",
  cpf: 234,
  endereco: {
    bairro: "cadilaque",
    cep: 456,
    cidade: "torres",
    rua: "pizza",
/*     complemento: "proximo ao postinho", */
  },
/*   profissao: "entregador", */
});

console.log(listarUsuarios());
