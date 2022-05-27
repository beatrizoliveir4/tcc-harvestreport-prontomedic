O projeto abaixo consiste em Trabalho de  Conclusão de  Curso apresentado ao Centro Universitário Carioca, como requisito parcial para obtenção do grau de Bacharel em Ciência da computação. Contempla o desenvolvimento da porção back-end de duas aplicações: Harvest Report, central de relatos para ingestão de alimentos de colheita contaminados, e Prontomedic, sistema de prontuário digital.
___ 
## Pré-requisitos
As aplicações requerem as seguintes instalações:
* NodeJs 14.16.1
* Npm na versão 8.7.0
* Ganache v 2.5.4
  

## Instalação
As aplicações devem ser instaldas separadamente. Acesse a pasta tcc-harvestreport-prontomedic\harvestreport e execute a linha abaixo no terminal de comandos. 
```console
npm install
```
Em seguida, faço o mesmo na pasta tcc-harvestreport-prontomedic\prontomedic.

## Estrutura de pastas e arquivos
A função de cada pasta e os arquivos que as compões é organizada da seguinte forma:
```
tcc
└───harvestreport
|   └───abis
|   └───compiler
|   └───contracts
|   └───test
└───prontomedic
|   └───abis
|   └───compiler
|   └───contracts
|   └───test
│   basic_config.json
│   deploy.js
│   package.json
│   README.md
```
1. Pasta "abis": criada após a primeira compilação, armazena um arquivo Json para cada contrato inteligente da aplicação. Tais arquivos contém um objeto formado pelos pares nome/valor abi e bytecode.
2. Pasta "compiler": armazena os arquivos Javascript responsáveis pela compilação dos contratos inteligentes, têm como artefato de saída arquivos Json.
3. Pasta "contracts": armazena os arquivos em Solidity que formam os contratos inteligentes.
4. Pasta "test": armazena os arquivos Javascript responsáveis pela realização dos testes unitários.
5. Arquivo "deploy.js": arquivo Javascript responsável de implantação de uma instância do contrato Permission (controle de acesso) e uma instância do contrato principal.
6. Arquivo "basic_config.json": criada após a primeira execução do arquivo deploy.js, arquivo Json, contém um objeto formado pelos pares nome/valor admin (endereço da conta administrativa), permissionAddress (endereço do contrato de controle de acesso) e harvestreportAddress ou prontomedicAddress (endereço do contrato principal). Oriundo da última execução do arquivo deploy.js, foi criado para facilitar a interação com o sistema. 
7. Arquivo "package.json": arquivo Json, contém as bibliotecas necessárias para execução dos arquivos da pasta mãe da aplicação.

## Execução dos testes
Para executar os scripts de teste dos contratos inteligentes, individualmente, acesse a pasta raíz de cada aplicação e execute a linha abaixo no terminal de comandos.
```powershell
npm test
```

## Configuraçã da rede teste e implantação dos primeiros contratos

O arquivo deploy.js é responsável por implantar uma instância do contrato de controle de acessos (Permissions.sol) e do contrato princial (HarvestReport.sol ou Prontomedic.sol), que armazena um vetor dos contratos relacionados. Antes que seja possível executá-lo, é necessário configurar a rede Ethereum teste.

```js
provider = new HDWalletProvider(
  '', // frase mnemônica
  '' //servidor RCP
);
```
As informações para preencher o *snippet* são encontradas no cabeçalho do programa Ganache.
![header_ganache](https://user-images.githubusercontent.com/38136095/170790345-01e7a894-48d0-43cd-9687-98581ce42d50.png)

***Nota**: informações de transações, endereços de contas, frase minemônica, servidor RPC são alteradas toda vez que o Ganache é iniciado.*


Após alteração no arquivo, individualmente, acesse a pasta raíz de cada aplicação e execute a linha abaixo no terminal de comandos.
```powershell
node deploy.js
```
A partir desse momento, é possível interagir com o sistema utlizando os endereços de contrato descritos no arquivo basic_config.json.