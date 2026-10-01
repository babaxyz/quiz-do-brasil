# Quiz do Brasil 🇧🇷

Site estático de quizzes de conhecimentos gerais em português brasileiro.

## Recursos
- Quiz geral e categorias
- Desafio de 60 segundos
- Quiz do dia
- Pontuação e explicações
- Tema claro/escuro
- Progresso salvo localmente no navegador
- Layout responsivo
- Sem backend, banco de dados, login ou armazenamento em nuvem

## Tecnologias
HTML, CSS e JavaScript puro. As perguntas ficam em `data/questions.json`.

## Testar localmente
O quiz carrega o JSON com `fetch`, então use um servidor estático local (não abra diretamente via `file://`).

```bash
python -m http.server 8000
```
Acesse `http://localhost:8000`.

## Publicar no GitHub Pages
1. Crie um repositório público chamado `quiz-do-brasil`.
2. Envie todos os arquivos e pastas para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha `main` e `/ (root)`, depois salve.

## Antes de publicar
- Revise as perguntas e respostas.
- Coloque um e-mail real em `contact.html`.
- Revise `privacy.html` e `terms.html` conforme os recursos usados.
- O Google Fonts é carregado externamente; para remover essa dependência, apague o `@import` no início de `css/style.css`.

Os resultados ficam no LocalStorage do navegador e não são sincronizados entre dispositivos.
