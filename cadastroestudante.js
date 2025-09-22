const readline = require('readline')
const estudantes = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function cadastrarEstudante (nome, idade, notas){
    const notasNumeros = notas.map(Number)
    const soma = notasNumeros.reduce((a,b) => a + b, 0 )
    const media = soma / notasNumeros.length

    const estudante = {
        nome: nome,
        idade: idade,
        notas: notasNumeros,
        media: Number(media.toFixed(2))   
    }

    estudantes.push(estudante)
    console.log("✅ Estudante cadastrado com sucesso")
} 

function listarEstudantes(){
    if(estudantes.length === 0){
        console.log("Nenhum estudante cadastrado.")
        return;
    }
    console.table(estudantes)
}

function buscarEstudante(nome){
    const estudante = estudantes.find(e => e.nome.toLowerCase() === nome.toLowerCase())
    if(!estudante){
        console.log("❌ Estudante não encontrado.")
        return;
    }
    console.table([estudante])
}

function deletarEstudante(nome){
    const index = estudantes.findIndex(e => e.nome.toLowerCase() === nome.toLowerCase())
    if(index === -1){
        console.log("❌ Estudante não encontrado.")
        return;
    }
    estudantes.splice(index,1)
    console.log("🗑️ Estudante removido com sucesso")
}

function atualizarEstudante(){
    rl.question('Digite o nome do estudante: ', (nome) => {
        const estudante = estudantes.find(e => e.nome.toLowerCase() === nome.toLowerCase())

        if (!estudante){
            console.log('❌ Estudante não encontrado')
            iniciarSistema()
            return;
        }

        rl.question('Nova idade (ou deixe vazio para manter): ', (idade) => {
            if (idade) estudante.idade = Number(idade)

            rl.question('Novas notas (separadas por vírgula, ou deixe vazio para manter): ', (notasinput) => {
                if (notasinput){
                    const notas = notasinput.split(',').map(Number)
                    estudante.notas = notas
                    const soma = notas.reduce(( a , b ) => a + b,0)
                    estudante.media = Number((soma/notas.length).toFixed(2))
                }
                console.log("✏️ Estudante atualizado com sucesso")
                iniciarSistema()
            })
        })
    })
}

function mostrarMenu(){
    console.log("\n=== Sistema de Estudantes ===")
    console.log("1. Cadastrar estudante")
    console.log("2. Listar estudantes")
    console.log("3. Buscar estudante por nome")
    console.log("4. Deletar estudante")
    console.log("5. Atualizar estudante")
    console.log("6. Sair")
}

function iniciarSistema(){
    mostrarMenu()
    rl.question("Escolha uma opção: ", (opcao) => {
        switch(opcao){
            case "1":
                rl.question("Nome: ", (nome) => {
                    rl.question("Idade: ", (idade) => {
                        rl.question("Notas (separadas por vírgula): ", (notasinput) => {
                            const notas = notasinput.split(',').map(Number)
                            cadastrarEstudante(nome, Number(idade), notas)
                            iniciarSistema()
                        })
                    })
                })
                break;

            case "2":
                listarEstudantes()
                iniciarSistema()
                break;

            case "3":
                rl.question("Digite o nome do estudante: ", (nome) => {
                    buscarEstudante(nome)
                    iniciarSistema()
                })
                break;

            case "4":
                rl.question("Digite o nome do estudante para deletar: ", (nome) => {
                    deletarEstudante(nome)
                    iniciarSistema()
                })
                break;

            case "5":
                atualizarEstudante()
                break;

            case "6":
                console.log("👋 Saindo do sistema...")
                rl.close()
                break;

            default:
                console.log("❌ Opção inválida, tente novamente.")
                }
    })
}

iniciarSistema()