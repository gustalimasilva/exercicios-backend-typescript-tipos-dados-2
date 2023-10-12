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
  cpf: string;
  profissao?: string;
  endereco: Endereco | null;
};

function cadastrarUsuario(dados: Usuario): Usuario {
  const bd = lerArquivo() as Usuario[];
  bd.push(dados);
  escreverArquivo(bd);
  return dados;
}

function listarUsuarios(profissao?: string): Usuario[] {
  const bd = lerArquivo() as Usuario[];

  const usuario = bd.filter((user) => {
    if (profissao) {
      return user.profissao === profissao;
    }

    user;
  });

  return usuario;
}

function atualizarUsuario(cpf: string, dados: Usuario): Usuario {
  const bd = lerArquivo() as Usuario[];
  const usuarioEncontrado = bd.find((usuario) => usuario.cpf === cpf);

  if (!usuarioEncontrado) {
    throw new Error("Usuário não encontrado");
  }

  Object.assign(usuarioEncontrado, dados);
  escreverArquivo(bd);

  return dados;
}

function detalharUsuario(cpf: string): Usuario {
  const bd = lerArquivo() as Usuario[];
  const usuarioEncontrado = bd.find((usuario) => usuario.cpf === cpf);

  if (!usuarioEncontrado) {
    throw new Error("Usuário não encontrado");
  }

  return usuarioEncontrado;
}

function excluirUsuario(cpf: string): Usuario {
  const bd = lerArquivo() as Usuario[];
  const usuarioEncontrado = bd.find((usuario) => usuario.cpf === cpf);

  if (!usuarioEncontrado) {
    throw new Error("Usuário não encontrado");
  }

  const exclusao = bd.filter((user) => user.cpf !== cpf);
  escreverArquivo(exclusao);

  return usuarioEncontrado;
}

/* cadastrarUsuario({
  nome: "paulo",
  email: "paulo@email.com",
  cpf: 234,
  endereco: {
    bairro: "cadilaque",
    cep: 456,
    cidade: "torres",
    rua: "pizza",
        complemento: "proximo ao postinho",
  },
    profissao: "entregador",
}); */

console.log(listarUsuarios());
