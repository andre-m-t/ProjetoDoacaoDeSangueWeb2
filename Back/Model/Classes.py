from datetime import date, time
from pydantic import BaseModel
from typing import Optional
from enum import Enum

# classe referente a doacao 
class Doacao(BaseModel):
    codigo: Optional[int]
    data:str
    hora:str
    volume:float
    codigo_doador:Optional[int]
    # def __init__(self, codigo:int, data:date, hora:time,volume:float, codigo_doador:int) -> None:
    #     self.codigo = codigo
    #     self.data = data
    #     self.hora = hora
    #     self.volume = volume
    #     self.codigo_doador = codigo_doador 
    def __str__(self) -> str:
        return f"codigo: {self.codigo}, data: {self.data}, hora: {self.hora}, volume: {self.volume}, codigo doador:{self.codigo_doador}"
# classe referente a doador
class Doador(BaseModel):
    codigo: Optional[int]
    nome: str
    cpf: str
    contato: str
    tipoSanguineo: str
    tipoRh: str
    tipoRhCorreto: bool
    # def __init__(self, codigo:int, nome:str, cpf:str,contato:str, tipoSanguineo:TipoSanguineo, rh:Rh, tipoRhCorreto:bool) -> None:
    #     self.codigo = codigo
    #     self.nome = nome
    #     self.cpf = cpf
    #     self.contato = contato
    #     self.tipoSanguineo = tipoSanguineo
    #     self.rh = rh
    #     self.tipoRhCorreto = tipoRhCorreto

    def __str__(self) -> str:
        return f"codigo: {self.codigo}, nome: {self.nome}, cpf: {self.cpf}, contato: {self.contato}, tipoSanguineo: {self.tipoSanguineo.value}, rh: {self.rh.value}, tipoRhCorreto: {self.tipoRhCorreto}"
# classe referente a rh 
class Rh(str, Enum):
    POSITIVO = "Positivo"
    NEGATIVO = "Negativo"
# classe referente a tipo sanguineo 
class TipoSanguineo(str, Enum):
    A = "A"
    B = "B"
    AB = "AB"
    O = "O"
            