/* =========================================================
   CONTROLE GLOBAL DA BARRA DE ALUNOS (01 a 07) — SHELL
   Cada aluno vive em alunos/<arquivo>.html e é carregado num
   iframe sob demanda (só baixa no primeiro clique na aba).
   ========================================================= */
let activeStudent = 7;

function activeFrame() {
  const m = document.getElementById("student-" + activeStudent);
  return m ? m.querySelector("iframe") : null;
}

function switchStudent(num) {
  activeStudent = num;
  document.querySelectorAll(".stu-btn").forEach((b) => {
    b.classList.toggle(
      "active",
      parseInt(b.getAttribute("data-stu"), 10) === num
    );
  });
  document.querySelectorAll(".student-module").forEach((m) => {
    const on = m.id === "student-" + num;
    m.classList.toggle("active", on);
    const f = m.querySelector("iframe");
    if (!f) return;

    if (!on) {
      if (f.dataset.loaded) {
        try {
          f.contentWindow.dispatchEvent(new Event("seminar:deactivate"));
        } catch (_) {}
      }
      return;
    }

    const ping = () => {
      try {
        f.contentWindow.dispatchEvent(new Event("seminar:activate"));
        f.contentWindow.dispatchEvent(new Event("resize"));
      } catch (_) {}
    };
    if (!f.dataset.loaded) {
      f.dataset.loaded = "1";
      f.src = f.dataset.src;
      f.addEventListener("load", ping, { once: true });
    } else {
      ping();
    }
  });
}

/* Teclado: setas trocam os slides do aluno ativo quando o foco está
   no shell (barra superior). Com o foco dentro do iframe, a própria
   página do aluno trata as teclas (com guarda para inputs/sliders). */
window.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  if (e.target && e.target.tagName === "INPUT") return;
  const f = activeFrame();
  if (f && f.dataset.loaded && f.contentWindow) {
    f.contentWindow.dispatchEvent(
      new KeyboardEvent("keydown", { key: e.key, bubbles: true })
    );
    e.preventDefault();
  }
});

/* Redimensionamento da janela: repassa para o iframe ativo
   (as cenas 3D recalculam câmera/renderer). */
window.addEventListener("resize", () => {
  const f = activeFrame();
  if (f && f.dataset.loaded && f.contentWindow) {
    try {
      f.contentWindow.dispatchEvent(new Event("resize"));
    } catch (_) {}
  }
});

/* Aba inicial (07 — Gustavo) */
switchStudent(7);
