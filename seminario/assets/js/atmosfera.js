/* =========================================================
   ATMOSFERA COMPARTILHADA — partículas de fundo (fagulhas de forja)
   Usada pelo shell e por cada página de aluno (exige #bgCanvas no body).
   ========================================================= */
/* =========================================================
     PARTÍCULAS ATMOSFÉRICAS DE FUNDO (Fagulhas sutis de forja)
     ========================================================= */
      const bgCv = document.getElementById("bgCanvas");
      const bgCtx = bgCv.getContext("2d");
      let embers = [];
      function resizeBg() {
        bgCv.width = window.innerWidth;
        bgCv.height = window.innerHeight;
      }
      window.addEventListener("resize", resizeBg);
      resizeBg();
      for (let i = 0; i < 42; i++) {
        embers.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 2.2 + 0.6,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -Math.random() * 0.55 - 0.15,
          a: Math.random() * 0.55 + 0.15,
          c: Math.random() > 0.35 ? "255,122,47" : "56,189,248",
        });
      }
      function drawBg() {
        bgCtx.clearRect(0, 0, bgCv.width, bgCv.height);
        embers.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) {
            p.y = bgCv.height + 10;
            p.x = Math.random() * bgCv.width;
          }
          if (p.x < -10) p.x = bgCv.width + 10;
          if (p.x > bgCv.width + 10) p.x = -10;
          bgCtx.beginPath();
          bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          bgCtx.fillStyle = `rgba(${p.c},${p.a})`;
          bgCtx.fill();
        });
        requestAnimationFrame(drawBg);
      }
      drawBg();

      
