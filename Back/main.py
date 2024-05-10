from typing_extensions import Unpack
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
from Model.Classes import (Doacao, Doador, TipoSanguineo, Rh)
from DAO import doadorCRUD



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos os domínios em desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos
    allow_headers=["*"],  # Permite todos os headers
)
logging.basicConfig(level=logging.INFO)


hst = "localhost"
dB = "doacaoSangue"
usr = "postgres"
pwd = "senhadobanco"




@app.get("/")
def read_root():
  
    return {"Pessoa1": {"Nome": "Andre", "Idade": 30}}

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

     

@app.post("/formulario")
def receberDadosDoForm(dado: Doador):

    con = doadorCRUD.Conexao(hst,dB,usr,pwd)
    # tratando erros
    _errs = validarFormulario(dado)
    for err in _errs:
        # se tiver erro retorno o objeto de erros e paro o processamento por aqui
        if err is True:
            return _errs
    # tudo ok posso tratar os dados a partir daqui
    
    con.novo_doador(dado)
    con.fechar_conexao()
    
    return "Sucess"

@app.post("/buscar")
def receber_busca_do_form(doador: Doador):
    con = doadorCRUD.Conexao(hst,dB,usr,pwd)
    todos = con.pesquisar_doador(doador)
    for i in todos:
        print(i)
    return "Sucess"



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
    
    return {"sttsForms":{"rhErr":_errs[0],"sanguineoErr":_errs[1],"cpfErr":_errs[2],"contatoErr":_errs[3],"nomeErr":_errs[4],"codigoErr":_errs[5]}}