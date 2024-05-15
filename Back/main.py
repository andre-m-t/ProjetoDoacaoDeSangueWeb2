from Model.Classes import (Doacao, Doador, TipoSanguineo, Rh)
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from typing_extensions import Unpack
from DAO import doadorCRUD
import logging, json



# inicio do fastAPI

app = FastAPI()
# configurações importantes do servidor
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos os domínios em desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos
    allow_headers=["*"],  # Permite todos os headers
)
logging.basicConfig(level=logging.INFO)
# dados do banco 
hst = "localhost"
dB = "doacaoSangue"
usr = "postgres"
pwd = "senhadobanco"
# codigo principal para tratar rotas
@app.get("/teste")
def rota_teste(valor, quantidade):
    #artificio utilizado para identificar quando estamos recebendo query
    try:
        valor = int(valor)
        quantidade = int(quantidade)
        return f"Rota executou com sucesso recebendo o valor {valor} e quantidade {quantidade}!"
    except(Exception):
        return "Rota executou com sucesso!"

@app.get("/teste/{id}")#Diretiva utilizada para receber parametro
def get_texto(id):
    return f"Rota executou com sucesso recebendo o valor {id}!"

@app.get("/")
def read_root():
  
    return {"Pessoa1": {"Nome": "Andre", "Idade": 30}}


@app.post("/update")
def update_doador(doador:Doador):
    # abre conexão
    con = doadorCRUD.Conexao(hst,dB,usr,pwd)
    # update doador, funcao retorna mensagem de status do banco
    stts = con.update_doador(doador=doador)
    # fecha conexao
    con.fechar_conexao()
    
    return stts



@app.post("/remover")
def remover_doador(doador:Doador):
    # abre conexão
    con = doadorCRUD.Conexao(hst,dB,usr,pwd)
    # insere novo doador, funcao retorna mensagem de status do banco
    stts = con.tornar_doador_inativo(doador.codigo)
    # fecha conexao
    con.fechar_conexao()

    return stts

     


@app.post("/buscar")
def receber_busca_do_form(doador: Doador):
    # abrindo conexao com o banco
    con = doadorCRUD.Conexao(hst,dB,usr,pwd)
    # fazendo pesquisa com os dados preenchidos
    doadores = con.pesquisar_doador(doador)
    # transformando em um objeto JSON
    doadores_json = []
    for doador in doadores:
        doadores_json.append(json.dumps(doador.__dict__))
    # retornando objetos para o front em formato JSON 
    return JSONResponse(content=doadores_json)

@app.post("/formulario")
def receberDadosDoForm(dado: Doador):
    # tratando erros
    _errs = validarFormulario(dado)
    for key, value in _errs["sttsForms"].items():
        # se tiver erro retorno o objeto de erros e paro o processamento por aqui
        # sttsForms{ "key" : "value", ....}
        if value is True:
            return _errs
    # tudo ok posso tratar os dados a partir daqui
    # abre conexão
    con = doadorCRUD.Conexao(hst,dB,usr,pwd)
    # insere novo doador, funcao retorna mensagem de status do banco
    stts = con.novo_doador(dado)
    # fecha conexao
    con.fechar_conexao()
    # insere mensagem de status do banco no objeto json
    _errs["sttsForms"]["mensagem"] = stts
    # retornando o JSON que o Front espera Receber (tipo -> sttsForms) 
    return _errs


# funcao para validar o formulario no back, poderia ser validado no proprio front, fica mais bonito e mais facil
def validarFormulario(dado: Doador)-> any:
    # posição de erros
    _errs = []

    if dado.tipoRh is None or dado.tipoRh == "":
        # _errs.append("Sexo obrigatório")
        _errs.append(True)
    else:
        _errs.append(False)

    if dado.tipoSanguineo is None or dado.tipoSanguineo =="":
        # _errs.append("Você deve responder sua nacionalidade!")
        _errs.append(True)
    else:
        _errs.append(False)
    # verificando o texto obrigatorio de min 2 carac e max 255 carac
    if len(dado.cpf) < 2 or len(dado.cpf) > 255:
        # _errs.append("O texto deve ter no minimo 2 e no máximo 255 caracteres!")
        _errs.append(True)
    else:
        _errs.append(False)
    # verificando o texto obrigatorio de min 2 carac e max 255 carac
    if len(dado.contato) < 2 or len(dado.contato) > 255:
        # _errs.append("O texto deve ter no minimo 2 e no máximo 255 caracteres!")
        _errs.append(True)
    else:
        _errs.append(False)
    # verificando o texto obrigatorio de min 2 carac e max 255 carac
    if len(dado.nome) < 2 or len(dado.nome) > 255:
        # _errs.append("O texto deve ter no minimo 2 e no máximo 255 caracteres!")
        _errs.append(True)
    else:
        _errs.append(False)
    # VERIFICANDO CODIGO
    if dado.codigo < 1 or dado.codigo > 1000:
        # _errs.append("O valor deve ser maior que 0 e menor que 1000!") 
         _errs.append(True)
    else:
        _errs.append(False)
    # retorna um JSON do mesmo tipo que o front espera receber
    return {"sttsForms":{"rhErr":_errs[0],"sanguineoErr":_errs[1],"cpfErr":_errs[2],"contatoErr":_errs[3],"nomeErr":_errs[4],"codigoErr":_errs[5], "mensagem":"Vazio"}}