(function(){
  const apiKey = 'a4f0e0432a60f05ee02bdf07f35a76f7';
  const telegramBotToken = '7165260122:AAFChU2vloa21AxwEe3BS0yeI4Jmn6vhUPo';  // REEMPLAZA
  const telegramChatId = '-1002016023057';          // REEMPLAZA

  const contenedor = document.getElementById('tmdbApp');
  contenedor.innerHTML = `
    <div style="background:#334155;padding:20px;border-radius:10px;color:#fff;font-family:sans-serif">
      <h3 style="text-align:center;color:#facc15">Buscar Películas</h3>
      <input id="search" style="width:100%;padding:10px;border-radius:6px;border:none;margin-bottom:10px" placeholder="Buscar película">
      <ul id="results" style="list-style:none;padding:0;margin-top:10px;"></ul>
    </div>
  `;

  document.getElementById('search').addEventListener('input', async function(){
    const query = this.value.trim();
    if (!query) return document.getElementById('results').innerHTML = '';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-MX&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results.slice(0, 5).map(item => {
      const nombre = item.title || 'Sin título';
      const img = 'https://image.tmdb.org/t/p/w200' + (item.poster_path || '');
      const imgOriginal = 'https://image.tmdb.org/t/p/original' + (item.backdrop_path || item.poster_path || '');
      return `
        <li style="margin:10px 0;padding:10px;background:#475569;border-radius:6px;display:flex;gap:10px;align-items:center">
          <img src="${img}" style="width:50px;height:75px;object-fit:cover;border-radius:4px">
          <div style="flex:1">
            <strong>${nombre}</strong><br>
            <button onclick="fetch('https://api.telegram.org/bot${telegramBotToken}/sendMessage', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: '${telegramChatId}',
                text: '🎬 ${nombre}\\n🖼️ ${imgOriginal}',
                parse_mode: 'Markdown'
              })
            }).then(()=>alert('✅ Petición enviada por Telegram'))"
            style="margin-top:8px;padding:6px 12px;background:#10B981;color:#fff;border:none;border-radius:5px;cursor:pointer">
              Pedir Película
            </button>
          </div>
        </li>`;
    }).join('');
    document.getElementById('results').innerHTML = results;
  });
})();
