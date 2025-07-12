// Codex Criminalis - Fixed JavaScript (No Syntax Errors)
console.log("🚀 Codex Criminalis Loading...");

// Sample Data - Basic functionality test
const sampleData = {
    "PK": {
        "299": {
            "title": "Απάτη",
            "text": "Όποιος με σκοπό να αποκομίσει για τον εαυτό του ή για άλλον παράνομο περιουσιακό όφελος, βλάπτει ξένη περιουσία προκαλώντας ή διατηρώντας σε κάποιον πλάνη με τεχνάσματα ή με παρασιώπηση της αλήθειας, τιμωρείται με φυλάκιση μέχρι δέκα έτη.",
            "paragraphs": [
                "Όποιος με σκοπό να αποκομίσει για τον εαυτό του ή για άλλον παράνομο περιουσιακό όφελος, βλάπτει ξένη περιουσία προκαλώντας ή διατηρώντας σε κάποιον πλάνη με τεχνάσματα ή με παρασιώπηση της αλήθειας, τιμωρείται με φυλάκιση μέχρι δέκα έτη."
            ]
        },
        "280": {
            "title": "Κλοπή",
            "text": "Όποιος αφαιρεί ξένο κινητό πράγμα με σκοπό να το ιδιοποιηθεί παράνομα, τιμωρείται με φυλάκιση μέχρι πέντε έτη ή με χρηματική ποινή.",
            "paragraphs": [
                "Όποιος αφαιρεί ξένο κινητό πράγμα με σκοπό να το ιδιοποιηθεί παράνομα, τιμωρείται με φυλάκιση μέχρι πέντε έτη ή με χρηματική ποινή.",
                "Εάν η αξία του πράγματος δεν υπερβαίνει τα τετρακόσια ευρώ, ο δράστης τιμωρείται με φυλάκιση μέχρι δύο έτη ή με χρηματική ποινή.",
                "Εάν η κλοπή διαπράχθηκε κατά συναυτουργία από τρία ή περισσότερα πρόσωπα, η ποινή είναι φυλάκιση από έξι μήνες μέχρι δέκα έτη."
            ]
        }
    },
    "KPD": {
        "322": {
            "title": "Προσωρινή κράτηση",
            "text": "Με βούλευμα ή διάταγμα του δικαστικού συμβουλίου ή του δικαστή ανακρίσεως, μπορεί να διαταχθεί η προσωρινή κράτηση του κατηγορούμενου εάν συντρέχουν οι προϋποθέσεις των άρθρων 282 και 307 και εάν είναι αναγκαία για να εξασφαλισθεί η παρουσία του κατηγορούμενου στη δίκη.",
            "paragraphs": [
                "Με βούλευμα ή διάταγμα του δικαστικού συμβουλίου ή του δικαστή ανακρίσεως, μπορεί να διαταχθεί η προσωρινή κράτηση του κατηγορούμενου εάν συντρέχουν οι προϋποθέσεις των άρθρων 282 και 307 και εάν είναι αναγκαία για να εξασφαλισθεί η παρουσία του κατηγορούμενου στη δίκη.",
                "Η προσωρινή κράτηση μπορεί επίσης να διαταχθεί για την αποτροπή νέων εγκλημάτων ή για την εξασφάλιση της ομαλής διεξαγωγής της ανάκρισης."
            ]
        }
    }
};

// Basic Search Class
class CodexSearch {
    constructor() {
        this.currentMode = 'quick';
        this.searchIndex = this.buildSearchIndex();
        this.bookmarks = new Set(['299', '322']); // Sample bookmarks
        console.log("🔍 Search system initialized");
    }

    buildSearchIndex() {
        console.log("📖 Building search index...");
        const index = {};
        
        Object.keys(sampleData).forEach(codeType => {
            Object.keys(sampleData[codeType]).forEach(articleNum => {
                const article = sampleData[codeType][articleNum];
                const key = `${articleNum}_${codeType}`;
                
                index[key] = {
                    article: articleNum,
                    code: codeType,
                    title: article.title,
                    text: article.text,
                    keywords: this.extractKeywords(article.title + ' ' + article.text)
                };
            });
        });
        
        console.log(`📚 Index built with ${Object.keys(index).length} articles`);
        return index;
    }

    extractKeywords(text) {
        return text.toLowerCase()
            .replace(/[άάἀἁἂἃἄἅἆἇὰάᾀᾁᾂᾃᾄᾅᾆᾇᾰᾱᾲᾳᾴᾶᾷ]/g, 'α')
            .replace(/[έέἐἑἒἓἔἕὲέ]/g, 'ε')
            .replace(/[ήήἠἡἢἣἤἥἦἧὴήῂῃῄῆῇ]/g, 'η')
            .replace(/[ίίἰἱἲἳἴἵἶἷὶίῒῖῗ]/g, 'ι')
            .replace(/[όόὀὁὂὃὄὅὸό]/g, 'ο')
            .replace(/[ύύὐὑὒὓὔὕὖὗὺύῢῦῧ]/g, 'υ')
            .replace(/[ώώὠὡὢὣὤὥὦὧὼώῲῳῴῶῷ]/g, 'ω')
            .split(/\s+/)
            .filter(word => word.length > 2);
    }

    search(query) {
        console.log(`🔍 Searching for: "${query}"`);
        
        if (!query || query.trim() === '') {
            return [];
        }

        // Simple article number search
        const articleMatch = query.match(/^(\d+)([αβγδΑΒΓΔ]?)$/i);
        if (articleMatch) {
            const articleNum = articleMatch[1] + (articleMatch[2] || '');
            return this.searchByArticle(articleNum);
        }

        // Text search
        return this.searchByText(query);
    }

    searchByArticle(articleNumber) {
        const results = [];
        
        Object.keys(sampleData).forEach(codeType => {
            if (sampleData[codeType][articleNumber]) {
                const article = sampleData[codeType][articleNumber];
                results.push({
                    article: articleNumber,
                    code: codeType,
                    title: article.title,
                    text: article.text,
                    relevance: 1.0
                });
            }
        });
        
        console.log(`📄 Found ${results.length} articles for number ${articleNumber}`);
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    searchByText(query) {
        const results = [];
        const searchTerms = this.extractKeywords(query);
        
        Object.values(this.searchIndex).forEach(item => {
            let score = 0;
            let matches = 0;
            
            searchTerms.forEach(term => {
                if (item.title.toLowerCase().includes(term)) {
                    score += 3; // Title matches are more important
                    matches++;
                }
                if (item.keywords.includes(term)) {
                    score += 1;
                    matches++;
                }
            });
            
            if (matches > 0) {
                const relevance = score / searchTerms.length;
                results.push({
                    article: item.article,
                    code: item.code,
                    title: item.title,
                    text: item.text,
                    relevance: relevance,
                    matchedTerms: matches
                });
            }
        });
        
        const sortedResults = results.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
        console.log(`📊 Found ${sortedResults.length} text search results`);
        return sortedResults;
    }
}

// Basic App Class
class CodexApp {
    constructor() {
        this.search = new CodexSearch();
        this.currentSection = 'home';
        this.currentView = null;
        console.log("🚀 App initialized");
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        console.log("🎧 Setting up event listeners...");
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }

        // Search mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.search.currentMode = e.target.dataset.mode;
                console.log(`🔄 Search mode changed to: ${this.search.currentMode}`);
            });
        });

        // Browse buttons
        document.querySelectorAll('[data-action="browse"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const code = e.target.closest('[data-code]').dataset.code;
                this.showBrowse(code);
            });
        });

        // Bookmark and recent items
        document.querySelectorAll('.bookmark-item, .recent-item').forEach(item => {
            item.addEventListener('click', () => {
                const article = item.dataset.article;
                const code = item.dataset.code;
                this.showArticle(article, code);
            });
        });

        console.log("✅ Event listeners set up successfully");
    }

    performSearch() {
        const query = document.getElementById('searchInput').value.trim();
        
        if (!query) {
            console.log("⚠️ Empty search query");
            return;
        }
        
        console.log(`🔍 Performing search: "${query}"`);
        const results = this.search.search(query);
        this.displaySearchResults(results, query);
        this.showSection('search');
    }

    displaySearchResults(results, query) {
        const container = document.getElementById('searchResults');
        
        if (!container) {
            console.error("❌ Search results container not found");
            return;
        }
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>Δεν βρέθηκαν αποτελέσματα για "${query}"</h3>
                    <p>Δοκιμάστε διαφορετικούς όρους αναζήτησης.</p>
                </div>
            `;
            return;
        }
        
        let html = `<h3>Αποτελέσματα για "${query}" (${results.length})</h3>`;
        
        results.forEach(result => {
            const codeClass = result.code === 'PK' ? 'pk' : 'kpd';
            const codeName = result.code === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
            
            html += `
                <div class="result-item" onclick="app.showArticle('${result.article}', '${result.code}')">
                    <div class="result-header">
                        <div class="result-article">Άρθρο ${result.article}</div>
                        <div class="result-code ${codeClass}">${codeName}</div>
                    </div>
                    <div class="result-title">${result.title}</div>
                    <div class="result-snippet">${this.createSnippet(result.text, 150)}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        console.log(`✅ Displayed ${results.length} search results`);
    }

    createSnippet(text, maxLength) {
        if (text.length <= maxLength) return text;
        const truncated = text.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
    }

    showArticle(articleNum, codeType) {
        console.log(`📄 Showing article ${articleNum} from ${codeType}`);
        
        const article = sampleData[codeType][articleNum];
        if (!article) {
            console.error(`❌ Article ${articleNum} not found in ${codeType}`);
            return;
        }
        
        const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
        const codeIcon = codeType === 'PK' ? '📕' : '📘';
        const codeClass = codeType === 'PK' ? 'pk' : 'kpd';
        
        let html = `
            <div class="article-header">
                <h2>Άρθρο ${articleNum} - ${article.title}</h2>
                <div class="meta">
                    <span class="code-icon ${codeClass}">${codeIcon}</span>
                    ${codeName} | Ενημερωμένη έκδοση
                </div>
            </div>
            
            <div class="article-content">
        `;
        
        if (article.paragraphs && article.paragraphs.length > 1) {
            article.paragraphs.forEach((para, index) => {
                html += `
                    <div class="paragraph">
                        <span class="paragraph-number">${index + 1}.</span>
                        ${para}
                    </div>
                `;
            });
        } else {
            html += `<p>${article.text}</p>`;
        }
        
        html += `
            </div>
            
            <div class="article-actions">
                <button class="action-btn" onclick="app.copyArticle('${articleNum}', '${codeType}')">
                    📋 Αντιγραφή
                </button>
                <button class="action-btn" onclick="app.shareArticle('${articleNum}', '${codeType}')">
                    📤 Κοινοποίηση
                </button>
            </div>
        `;
        
        const articleView = document.getElementById('articleView');
        if (articleView) {
            articleView.innerHTML = html;
            this.showSection('article');
            console.log(`✅ Article ${articleNum} displayed`);
        } else {
            console.error("❌ Article view container not found");
        }
    }

    showBrowse(codeType) {
        console.log(`📚 Showing browse for ${codeType}`);
        
        const codeName = codeType === 'PK' ? 'Ποινικός Κώδικας' : 'Κώδικας Ποινικής Δικονομίας';
        const articles = Object.keys(sampleData[codeType]);
        
        let html = `
            <div class="browse-header">
                <h2>${codeName}</h2>
            </div>
            <div class="article-list">
        `;
        
        articles.forEach(articleNum => {
            const article = sampleData[codeType][articleNum];
            
            html += `
                <div class="article-list-item" onclick="app.showArticle('${articleNum}', '${codeType}')">
                    <div class="article-list-info">
                        <div class="article-list-number">Άρθρο ${articleNum}</div>
                        <div class="article-list-title">${article.title}</div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        const browseView = document.getElementById('browseView');
        if (browseView) {
            browseView.innerHTML = html;
            this.showSection('browse');
            console.log(`✅ Browse view for ${codeType} displayed`);
        } else {
            console.error("❌ Browse view container not found");
        }
    }

    showSection(sectionName) {
        console.log(`🔄 Switching to section: ${sectionName}`);
        
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionName + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
            console.log(`✅ Section ${sectionName} activated`);
        } else {
            console.error(`❌ Section ${sectionName} not found`);
        }
    }

    copyArticle(articleNum, codeType) {
        const article = sampleData[codeType][articleNum];
        const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
        const text = `Άρθρο ${articleNum} ${codeName} - ${article.title}\n\n${article.text}`;
        
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Το άρθρο αντιγράφηκε στο πρόχειρο');
            console.log(`📋 Article ${articleNum} copied to clipboard`);
        }).catch(err => {
            console.error('❌ Copy failed:', err);
        });
    }

    shareArticle(articleNum, codeType) {
        const article = sampleData[codeType][articleNum];
        const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
        const text = `Άρθρο ${articleNum} ${codeName} - ${article.title}\n\n${article.text}`;
        
        if (navigator.share) {
            navigator.share({
                title: `Άρθρο ${articleNum} ${codeName} - ${article.title}`,
                text: text
            }).then(() => {
                console.log(`📤 Article ${articleNum} shared`);
            }).catch(err => {
                console.error('❌ Share failed:', err);
            });
        } else {
            this.copyArticle(articleNum, codeType);
            this.showToast('Το άρθρο αντιγράφηκε για κοινοποίηση');
        }
    }

    showToast(message) {
        console.log(`🍞 Toast: ${message}`);
        
        // Create toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c3e50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    console.log("🏁 DOM Content Loaded - Initializing Codex Criminalis...");
    try {
        app = new CodexApp();
        console.log("✅ Codex Criminalis initialized successfully!");
    } catch (error) {
        console.error("❌ Failed to initialize Codex Criminalis:", error);
    }
});

console.log("📜 Codex Criminalis script loaded successfully");
