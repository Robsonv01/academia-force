/* ============================================================
   FORCE GYM – Scripts principais do site
   Menu mobile, animações de scroll, contadores, formulário
   ============================================================ */

// ---------- Menu mobile ----------
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('aberto');
    menuToggle.textContent = menu.classList.contains('aberto') ? '✕' : '☰';
  });

  // Fecha o menu ao clicar em um link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('aberto');
      menuToggle.textContent = '☰';
    });
  });
}

// ---------- Ano automático no rodapé ----------
const elAno = document.getElementById('ano');
if (elAno) elAno.textContent = new Date().getFullYear();

// ---------- Botão voltar ao topo ----------
const btnTopo = document.getElementById('btnTopo');
window.addEventListener('scroll', () => {
  if (btnTopo) btnTopo.classList.toggle('visivel', window.scrollY > 500);
});
if (btnTopo) {
  btnTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---------- Animações ao rolar (Intersection Observer) ----------
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target); // anima uma única vez
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observador.observe(el));

// ---------- Contadores animados (números da academia) ----------
function animarContador(el) {
  const alvo = parseInt(el.dataset.alvo, 10) || 0;
  const duracao = 1600; // ms
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const valor = Math.floor(progresso * alvo);
    el.textContent = valor;
    if (progresso < 1) requestAnimationFrame(passo);
    else el.textContent = alvo;
  }
  requestAnimationFrame(passo);
}

const observadorNumeros = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      animarContador(entrada.target);
      observadorNumeros.unobserve(entrada.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.num[data-alvo]').forEach(el => observadorNumeros.observe(el));

// ---------- Formulário de contato → WhatsApp ----------
const formContato = document.getElementById('formContato');
if (formContato) {
  formContato.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !telefone) {
      alert('Por favor, preencha pelo menos nome e telefone.');
      return;
    }

    const texto = [
      'Olá! Vim pelo site da FORCE GYM. 🏋️',
      '',
      '👤 Nome: ' + nome,
      '📱 Telefone: ' + telefone,
      email ? '✉️ E-mail: ' + email : '',
      '📌 Assunto: ' + assunto,
      mensagem ? '📝 Mensagem: ' + mensagem : ''
    ].filter(Boolean).join('\n');

    // Abre o WhatsApp com a mensagem pronta
    const numero = '5554999990000';
    window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(texto), '_blank');
  });
}
