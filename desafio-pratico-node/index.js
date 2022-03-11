//==============================================IMPORTAÇÕES=========================================================

import {promises as fs, writeFile, readFile, mkdir,
        rmSync, readFileSync, existsSync} from "fs"

//=====================================================================================================================

//===============================================Exercício 1==============================================================

//Criando uma função para criar arquivos JSON de cada estado
function ListingStatesWithCities(){
    //Criando um readFile para ler o Estados.json e armazenar em dataUF
    readFile("./Estados.json", (error, dataUF) => {

        if(error){
            console.log("Erro na leitura do arquivo")
        }
        else{
            //Criando um readFile para ler o Estados.json e armazenar em dataCID
            readFile("./Cidades.json", (error, dataCID) =>{
                
                if(error){
                    console.log("Erro na leitura do arquivo")
                }
                else{
                    //Armazenando dados do JSON em uma constante
                    const dadosConvertidosUF = JSON.parse(dataUF)
                    const dadosConvertidosCid = JSON.parse(dataCID)

                    //Abrindo condição para saber se a pasta já existe
                    if(existsSync("./Estados")){
                        console.log("\n\nA pasta já existe! Recriando diretório...\n\n")
                        //rmSync remove o diretório
                        rmSync("./Estados", {recursive: true, force: true})
                    }
                    //Se a pasta não existir, ela será criada abaixo
                    //Criando um diretório com o mkdir
                    mkdir("./Estados", (error) => {if (error) throw error})
                        //usando o .map no JSON dos Estados armazenados
                        dadosConvertidosUF.map((estado) =>{
                        
                        //filtrando o JSON das Cidades e comparando com o ID do Estado
                        //para cada um
                        const cidDoEstado = dadosConvertidosCid.filter((cidade) => 
                        cidade.Estado == estado.ID)
                        
                        //Constante teste
                        const nomesDasCid = cidDoEstado.map((cidade) => cidade.Nome)
                        
                        //Criando um writeFile para criar cada arquivo JSON para determinado Estado
                        writeFile(`./Estados/${estado.Sigla}.json`,
                                    JSON.stringify(cidDoEstado, null, 2),(err) => {
                                        
                            if (err){
                                console.log(`Erro ao criar: ${estado.Sigla}.json`);
                            } else {
                                console.log(`${estado.Sigla}.json criado com sucesso!`);
                            }
                        });
                        
                    })        
                    
                }
            })
        }
    })
}
//===========================================================================================================================

//=======================================================Exercício 2=========================================================

//Criando uma função para vermos o número de cidades para determinado estado
function number_of_cities(numCities){
    if(!numCities) throw "Parâmetro em falta"

        //Criando uma variável para ler de forma síncrona o Cidades.json
        let cidade = readFileSync("./Cidades.json", "utf-8", (error) => {if (error) throw error})
            //Atribuindo o JSON em uma variável
            cidade = JSON.parse(cidade)
            //Filtrando o número de cidades para cada estado
            const city = cidade.filter((cid) => cid.Estado == numCities)
            
            //Retorno o tamanho da variável
            return city.length

}
//===========================================================================================================================

//=======================================================Exercício 3=========================================================

//Criando uma função para receber as cidades em ordem Decrescente
function PopulationValueDescending(){

    //Atribuindo o readFileSync a uma variável, lendo o Estados.json
    let states = readFileSync("./Estados.json", "utf-8", (error) => {if (error) throw error})
        //Atribuindo o JSON em uma variável
        states = JSON.parse(states)
        //Usando .map para retornar a sigla e a cidade
        const estadoComCidade = states.map((state, err) =>{
            return {
                sigla: state.Sigla,
                city: number_of_cities(state.ID)

            }
        })
        //Usando sort para ordenar a expressão feita de ordem Decrescente
        let descendingOrder = estadoComCidade.sort((a, b) => 
            parseFloat(b.city) - parseFloat(a.city))
            
            //Retornando no Console.log o top 5
            console.log(descendingOrder.splice(0,5))
}

//===========================================================================================================================

//=======================================================Exercício 4=========================================================

//Criando uma função para receber as cidades em ordem Crescente
function PopulationValueAscending(){
    //Atribuindo o readFileSync a uma variável, lendo o Estados.json
    let states = readFileSync("./Estados.json", "utf-8", (error) => {if (error) throw error})
        //Atribuindo o JSON em uma variável
        states = JSON.parse(states)
        //Usando .map para retornar a sigla e a cidade
        const estadoComCidade = states.map((state, err) =>{
            return {
                sigla: state.Sigla,
                city: number_of_cities(state.ID)

            }
        })
        //Usando sort para ordenar a expressão feita de ordem Decrescente
        let descendingOrder = estadoComCidade.sort((a, b) => 
            parseFloat(a.city) - parseFloat(b.city))
            
            //Retornando no Console.log o top 5
            console.log(descendingOrder.splice(0,5))
}


ListingStatesWithCities()

//No parâmetro desta função, passamos o ID do estado correspondente
console.log(number_of_cities("26"))

PopulationValueDescending()
PopulationValueAscending()
