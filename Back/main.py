from typing_extensions import Unpack
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
from pydantic import BaseModel, ConfigDict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos os domínios em desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos
    allow_headers=["*"],  # Permite todos os headers
)
logging.basicConfig(level=logging.INFO)

class Formulario(BaseModel):
    nome: str
    idade: int
    nacionalidadeBrasileira: bool
    sexo: str
    cor: str

    def __str__(self) -> str:
         return super().__str__


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
def receberDadosDoForm(dado: Formulario):
    print(dado.__str__)
    _errs = validarFormulario(dado)
    print(_errs)
    if(_errs):
        # se tiver erro retorno o objeto de erros e paro o processamento por aqui
        return _errs
    # tudo ok posso tratar os dados a partir daqui
    print("Sucess")
    
    return "Sucess"



def validarFormulario(dado: Formulario)-> any:
    # posição de erros
    _errs = []
    # verificando o texto obrigatorio de min 2 carac e max 255 carac
    if len(dado.nome) < 2 or len(dado.nome) > 255:
        # _errs.append("O texto deve ter no minimo 2 e no máximo 255 caracteres!")
        _errs.append(True)
    else:
        _errs.append(False)


    if dado.idade < 1 or dado.idade > 1000:
        # _errs.append("O valor deve ser maior que 0 e menor que 1000!") 
         _errs.append(True)
    else:
        _errs.append(False)


    if dado.nacionalidadeBrasileira is None or dado.nacionalidadeBrasileira =="":
        # _errs.append("Você deve responder sua nacionalidade!")
        _errs.append(True)
    else:
        _errs.append(False)


    if dado.sexo is None or dado.sexo == "":
        # _errs.append("Sexo obrigatório")
        _errs.append(True)
    else:
        _errs.append(False)


    if dado.cor is None or dado.cor == "":
        # _errs.append("Selecione uma cor!")
        _errs.append(True)
    else:
        _errs.append(False)

    return {"sttsForms":{"txtErr":_errs[0],"nmbrErr":_errs[1],"boolErr":_errs[2],"sxErr":_errs[3],"corErr":_errs[4]}}