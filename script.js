document.getElementById('searchBtn').addEventListener('click', performSearch);

async function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    const resultArea = document.getElementById('resultArea');
    
    if (!query) return;

    // URL de l'API Wikipedia
    const url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

    try {
        resultArea.innerHTML = "<p style='color:white; padding:20px;'>Analyse des serveurs...</p>";
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Terme introuvable");
        const data = await response.json();

        // On remplace le contenu statique par le résultat réel
        resultArea.innerHTML = `
            <div class="result-card">
                <div class="result-text">
                    <h2>${data.title}</h2>
                    <p>${data.extract}</p>
                    <span class="tag">Informatique / Tech</span>
                </div>
                <div class="result-image">
                    <img src="${data.thumbnail ? data.thumbnail.source : 'https://via.placeholder.com/400x250'}" alt="${data.title}">
                </div>
            </div>
        `;
    } catch (error) {
        resultArea.innerHTML = `<p style="color: #38bdf8; padding:20px;">Désolé, aucune donnée trouvée pour "${query}".</p>`;
    }
}
// 1. Récupérer les données au chargement
let historique = JSON.parse(localStorage.getItem('monHistorique')) || [];

// 2. Fonction pour ajouter une recherche
function ajouterRecherche(terme) {
    historique.push(terme);
    localStorage.setItem('monHistorique', JSON.stringify(historique));
    afficherHistorique();
}