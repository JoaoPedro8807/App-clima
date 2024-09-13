# Previsão do clima com Flask


<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=Finalizado&color=GREEN&style=for-the-badge">
</p>

Um APP que busca através da [API  ClimaTempo](https://www.dropbox.com/developers/documentation/http/documentation) previsões para o clima de qualquer uma cidade ou região de todo o Brasil utilizando Flask.
### Deploy da APP:  clima-app-g2yb.onrender.com/ 

# 🔨 Funcionalidades do projeto:

### - ` 1`:  Pesquisar a temperatura e o clima atual de uma cidade, desde que a mesma tenha sido definida como padrão. (como usei API gratuita, só é possível definir uma cidade padrão por dia)

### - ` 2`:  Pesquisar a previsão de todos os horário do dia para a determinada cidade padrão

### - ` 3`: Pesquisar a previsão para os próximos 3 dias de uma determinada região do Brasil (está região não precisa ser padrão, podemos pesquisar sem limitações)

### - `EXTRA:`: O APP também conta com login e autenticação de usuários e administradores (que podem editar o CRUD).


# 🛠️ Limitações do app:   
- Por conta da API ser gratuita, é permitido pesquisar apenas por uma cidade a cada 24h, mas deixei o  app preparado para pesquisar qualquer cidade, caso não haja mais essa restrição, por enquanto irá aparecer somente uma mensagem de erro.
- 

# 🛠️ Instalação:  
### - ` 1`: Primeiramente clone esse respositório do projeto.
 ```bash
  git clone https://github.com/JoaoPedro8807/App-clima
  ```

### - ` 2`: Com o código já clonado, é recomendado instalar as bibliotecas/dependências em um ambiente virtual, para isso usaremos o venv do python na raiz do Flask.
 ```bash
 cd flask
 python -m venv .venv
  ```
isso fará com que o python crie o venv dentro do diretório Flask, agora já podemos startar o venv e instalar as bibliotecas.

### - ` 3`: Ainda no diretório flask:
 ```bash
 cd .venv/scripts/.activate
  ```
  O ambiente virtual deve ser iniciado.


### - ` 4`: Instalãção de todas as biblitecas/dependências:
 ```bash
 cd ..
 cd ..
  ```
Para voltar ao diretório do Flask
 ```bash
 pip install -r requirements.txt
  ```
Espere até todas as bibliotecas estejam corretamente instaladas.

Após isso, já é possível rodar o app:
 ```bash
python app.py
  ```

# Algumas ressalvas: 
- O flask por padrão roda na porta 5000, e o FrontEnd/services já estão apontados para essa porta, então é importante deixar rodando na porta padrão.
- Não precisa subir instância ou conexão de qualquer banco, já deixei a instância do sqlite e a  conexão do SQLAlchemy (.env) no repositório, com alguns registros de testes.
- Deixei o diretório do React separado, mas o build dele já está sendo  servido diretamente pelo flask, então caso queira mudar alguma coisa, basta instalar as dependencias do package.json e startar o build, que o flask irá servir esses arquivos estáticos.
  

## ✔️ Tecnologias utilizadas

- ``Flask``
- ``React.js +  BOOTSTRAP``
- ``SQLALCHEMY ``


[<img loading="lazy" src="https://avatars.githubusercontent.com/u/88624922?v=4" width=115><br><sub>João Pedro</sub>](https://github.com/JoaoPedro8807)
