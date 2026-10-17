/* =========================================================
   PONTE PADRÃO SHELL ↔ PÁGINA DO ALUNO
   O shell (index.html) dispara estes eventos no iframe ativo:
     - "seminar:activate"   → a aba do aluno ficou visível
     - "seminar:deactivate" → a aba do aluno ficou oculta
   Sua página só precisa (se quiser) definir os hooks:
     window.alunoAtivado    = function () { ... }
     window.alunoDesativado = function () { ... }
   Navegação por teclado (setas) é resolvida pelo shell, que
   repassa o keydown para o iframe; a própria página também
   escuta as setas quando o foco está dentro dela.
   ========================================================= */
(function () {
  window.addEventListener("seminar:activate", function () {
    if (typeof window.alunoAtivado === "function") window.alunoAtivado();
    window.dispatchEvent(new Event("resize"));
  });
  window.addEventListener("seminar:deactivate", function () {
    if (typeof window.alunoDesativado === "function") window.alunoDesativado();
  });
})();
