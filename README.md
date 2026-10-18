# Seminário Ciência dos Materiais — Apresentação Unificada

Projeto **sem build e sem dependências**: abra `index.html` no navegador
(duplo clique funciona — útil para pendrive/projetor).

## Estrutura

```
seminario/
├── index.html                  ← shell: barra de alunos + iframes sob demanda
├── alunos/
│   ├── nathan.html             ← 01 (app 3D autocontida)
│   ├── pedro-paulo.html        ← 02 (subprodutos da siderurgia)
│   ├── ilca.html               ← 03 (placeholder)
│   ├── pedro-vicente.html      ← 04 (placeholder)
│   ├── patrick.html            ← 05 (app 3D autocontida)
│   ├── pedro-ricardo.html      ← 06 (placeholder)
│   └── gustavo.html            ← 07 (ligas, estruturas 3D, tratamentos)
└── assets/
    ├── css/base.css            ← design system compartilhado (TODOS os alunos)
    ├── css/shell.css           ← exclusivo do shell
    └── js/
        ├── shell.js            ← troca de abas, teclado, lazy-load dos iframes
        ├── atmosfera.js        ← partículas de fundo (exige #bgCanvas no body)
        └── aluno-comum.js      ← ponte de eventos shell ↔ página do aluno
```

## Como editar um aluno existente

Mexa **somente** em `alunos/<nome>.html`. Cada arquivo é autocontido:
CSS escopado no `<style>` do head, markup e `<script>` próprio no body.
O body usa `id="student-N"` + `class="aluno-page"` — mantenha os dois
(os estilos escopados e o JS dependem deles).

## Como adicionar um novo aluno (ex.: aluno 08 — Maria)

1. Copie `alunos/pedro-paulo.html` como ponto de partida (é o template
   mais simples) e renomeie para `alunos/maria.html`.
2. Troque `id="student-2"` do body para `id="student-8"` e adapte os
   prefixos de funções/ids (ex.: `pp_goSlide` → `ma_goSlide`) para não
   colidir com os outros.
3. Ajuste o total de slides na IIFE de navegação (`var ppTotal = 6;`).
4. Registre no `index.html`:
   - botão novo na barra: `<button class="stu-btn" data-stu="8" onclick="switchStudent(8)"><i>08</i>Maria</button>`
   - área nova: `<div id="student-8" class="student-module"><iframe title="Apresentação — Maria" data-src="alunos/maria.html"></iframe></div>`

### Hooks opcionais (defina no seu `<script>`, se precisar)

```js
window.alunoAtivado    = function () { /* sua aba ficou visível */ };
window.alunoDesativado = function () { /* sua aba ficou oculta */ };
```

Setas ←/→: o shell repassa o keydown para o iframe ativo; quando o foco
está dentro da sua página, trate você mesmo (veja os exemplos nos
arquivos existentes — com guarda `e.target.tagName === "INPUT"`).

## Convenções visuais (design system em `assets/css/base.css`)

- **Paleta restrita**: laranja `--orange` #ff7a2f (marca/acento único),
  azul `--blue` #38bdf8 (apoio informativo), verde/vermelho **somente**
  com função semântica (pro/con, vantagens/desvantagens), âmbar `--amber`
  #fbbf24 para avisos. Nada de roxo/amarelo decorativo.
- **Cards**: acento superior laranja único; títulos neutros (cor só nos
  números/pills).
- **Tipografia**: Segoe UI + mono para números/códigos; títulos de painéis
  26px/800.

Classes prontas: `.grid-3`, `.grid-2`, `.split-3d`, `.card`, `.card-title`,
`.big-number`, `.key-list`, `.pill.pro|.con|.info|.warn`, `.flow-steps`,
`.example-banner`, `.viewport-3d`, `.slide`, `.sub-header`, `.slide-tab`.

## Regras de ouro

1. **Não edite** `assets/css/base.css` para resolver um problema que só
   existe no seu slide — use o `<style>` do seu próprio arquivo.
2. Isole seu JavaScript (IIFE + prefixo próprio, ex.: `ma_goSlide`).
3. Cada aluno dono do seu arquivo = zero conflito de edição.
