const VERSAO = 14;

const CACHE = "trunfo-egipcio-v" + VERSAO;

const ARQUIVOS = [ "./", "index.html", "baixar.html", "style.css?v=" + VERSAO, "cards.js?v=" + VERSAO, "motor.js?v=" + VERSAO, "rede.js?v=" + VERSAO, "script.js?v=" + VERSAO, "online.js?v=" + VERSAO, "app.js?v=" + VERSAO, "musica-fundo.mp3", "musica-fundo.ogg", "manifest.json", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "assets/1a-ra.jpeg", "assets/2a-serpopardo.jpeg", "assets/3a-ramses-ii.jpeg", "assets/4a-akhenaton.jpeg", "assets/5a-queops.jpeg", "assets/6a-tutancamon.jpeg", "assets/7a-neftis.jpeg", "assets/8a-aton.jpeg", "assets/1b-apep.jpeg", "assets/2b-atum.jpeg", "assets/3b-sekhmet.jpeg", "assets/4b-nun.jpeg", "assets/5b-horus.jpeg", "assets/6b-isis.jpeg", "assets/7b-anubis.jpeg", "assets/8b-maat.jpeg", "assets/1c-set.jpeg", "assets/2c-hathor.jpeg", "assets/3c-amon-ra.jpeg", "assets/4c-thoth.jpeg", "assets/5c-ptah.jpeg", "assets/6c-osiris.jpeg", "assets/7c-bastet.jpeg", "assets/8c-esfinge.jpeg", "assets/1d-ammit.jpeg", "assets/2d-khonsu.jpeg", "assets/3d-mut.jpeg", "assets/4d-heka.jpeg", "assets/5d-medjed.jpeg", "assets/6d-hapi.jpeg", "assets/7d-imhotep.jpeg", "assets/8d-cleopatra-vii.jpeg" ];

self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ARQUIVOS.map(u => new Request(u, {
        cache: "reload"
    })))));
});

self.addEventListener("activate", event => {
    event.waitUntil(caches.keys().then(nomes => Promise.all(nomes.filter(nome => nome.indexOf("trunfo-egipcio-") === 0 && nome !== CACHE).map(nome => caches.delete(nome)))).then(() => self.clients.claim()));
});

self.addEventListener("message", event => {
    if (event.data === "atualizar") self.skipWaiting();
});

self.addEventListener("fetch", event => {
    const req = event.request;
    if (req.method !== "GET") return;
    if (new URL(req.url).origin !== self.location.origin) return;
    event.respondWith(caches.open(CACHE).then(cache => cache.match(req, {
        ignoreSearch: req.mode === "navigate"
    }).then(achou => {
        if (achou) return achou;
        return fetch(req).catch(() => {
            if (req.mode === "navigate") return cache.match("index.html");
            return Response.error();
        });
    })));
});
