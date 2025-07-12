// 📜 Codex Criminalis - Main Application JavaScript
// Extracted from working single-file version

// Sample Data - In production, this would be loaded from JSON files
const sampleData = {
    "PK": {
        "299": {
            "title": "Απάτη",
            "text": "Όποιος με σκοπό να αποκομίσει για τον εαυτό του ή για άλλον παράνομο περιουσιακό όφελος, βλάπτει ξένη περιουσία προκαλώντας ή διατηρώντας σε κάποιον πλάνη με τεχνάσματα ή με παρασιώπηση της αλήθειας, τιμωρείται με φυλάκιση μέχρι δέκα έτη.",
            "paragraphs": [
                "Όποιος με σκοπό να αποκομίσει για τον εαυτό του ή για άλλον παράνομο περιουσιακό όφελος, βλάπτει ξένη περιουσία προκαλώντας ή διατηρώντας σε κάποιον πλάνη με τεχνάσματα ή με παρασιώπηση της αλήθειας, τιμωρείται με φυλάκιση μέχρι δέκα έτη."
            ],
            "versions": [
                {"date": "2024", "law": "5089/2024", "text": "Όποιος με σκοπό να αποκομίσει για τον εαυτό του ή για άλλον παράνομο περιουσιακό όφελος, βλάπτει ξένη περιουσία προκαλώντας ή διατηρώντας σε κάποιον πλάνη με τεχνάσματα ή με παρασιώπηση της αλήθειας, τιμωρείται με φυλάκιση μέχρι δέκα έτη."},
                {"date": "2020", "law": "4619/2019", "text": "Όποιος με σκοπό να αποκομίσει για τον εαυτό του ή για άλλον παράνομο περιουσιακό όφελος, βλάπτει ξένη περιουσία προκαλώντας ή διατηρώντας σε κάποιον πλάνη με τεχνάσματα ή με παραποίηση, τιμωρείται με φυλάκιση μέχρι οκτώ έτη."}
            ]
        },
        "280": {
            "title": "Κλοπή",
            "text": "Όποιος αφαιρεί ξένο κινητό πράγμα με σκοπό να το ιδιοποιηθεί παράνομα, τιμωρείται με φυλάκιση μέχρι πέντε έτη ή με χρηματική ποινή.",
            "paragraphs": [
                "Όποιος αφαιρεί ξένο κινητό πράγμα με σκοπό να το ιδιοποιηθεί παράνομα, τιμωρείται με φυλάκιση μέχρι πέντε έτη ή με χρηματική ποινή.",
                "Εάν η αξία του πράγματος δεν υπερβαίνει τα τετρακόσια ευρώ, ο δράστης τιμωρείται με φυλάκιση μέχρι δύο έτη ή με χρηματική ποινή.",
                "Εάν η κλοπή διαπράχθηκε κατά συναυτουργία από τρία ή περισσότερα πρόσωπα, η ποινή είναι φυλάκιση από έξι μήνες μέχρι δέκα έτη."
            ],
            "versions": [
                {"date": "2024", "law": "5089/2024", "text": "Όποιος αφαιρεί ξένο κινητό πράγμα με σκοπό να το ιδιοποιηθεί παράνομα, τιμωρείται με φυλάκιση μέχρι πέντε έτη ή με χρηματική ποινή.\n\nΕάν η αξία του πράγματος δεν υπερβαίνει τα τετρακόσια ευρώ, ο δράστης τιμωρείται με φυλάκιση μέχρι δύο έτη ή με χρηματική ποινή.\n\nΕάν η κλοπή διαπράχθηκε κατά συναυτουργία από τρία ή περισσότερα πρόσωπα, η ποινή είναι φυλάκιση από έξι μήνες μέχρι δέκα έτη."}
            ]
        },
        "280A": {
            "title": "Υπεξαίρεση",
            "text": "Όποιος ως όργανο ή εκπρόσωπος νομικού προσώπου ή ως υπάλληλος ή εντολοδόχος φυσικού ή νομικού προσώπου ή ως διαχειριστής ξένης περιουσίας, παράνομα ιδιοποιείται χρήματα ή άλλα κινητά πράγματα που του έχουν εμπιστευθεί ή που έχει υπό την κατοχή του λόγω της ιδιότητάς του, τιμωρείται με φυλάκιση τουλάχιστον έξι μηνών.",
            "paragraphs": [
                "Όποιος ως όργανο ή εκπρόσωπος νομικού προσώπου ή ως υπάλληλος ή εντολοδόχος φυσικού ή νομικού προσώπου ή ως διαχειριστής ξένης περιουσίας, παράνομα ιδιοποιείται χρήματα ή άλλα κινητά πράγματα που του έχουν εμπιστευθεί ή που έχει υπό την κατοχή του λόγω της ιδιότητάς του, τιμωρείται με φυλάκιση τουλάχιστον έξι μηνών."
            ],
            "versions": [
                {"date": "2024", "law": "5089/2024", "text": "Όποιος ως όργανο ή εκπρόσωπος νομικού προσώπου ή ως υπάλληλος ή εντολοδόχος φυσικού ή νομικού προσώπου ή ως διαχειριστής ξένης περιουσίας, παράνομα ιδιοποιείται χρήματα ή άλλα κινητά πράγματα που του έχουν εμπιστευθεί ή που έχει υπό την κατοχή του λόγω της ιδιότητάς του, τιμωρείται με φυλάκιση τουλάχιστον έξι μηνών."}
            ]
        },
        "187A": {
            "title": "Βιασμός",
            "text": "Όποιος με σωματική βία ή με απειλή σοβαρού και άμεσου κινδύνου αναγκάζει κάποιον σε συνουσία ή σε άλλη ιδιαίτερα ταπεινωτική ή εξευτελιστική σεξουαλική πράξη, τιμωρείται με φυλάκιση από πέντε μέχρι είκοσι έτη.",
            "paragraphs": [
                "Όποιος με σωματική βία ή με απειλή σοβαρού και άμεσου κινδύνου αναγκάζει κάποιον σε συνουσία ή σε άλλη ιδιαίτερα ταπεινωτική ή εξευτελιστική σεξουαλική πράξη, τιμωρείται με φυλάκιση από πέντε μέχρι είκοσι έτη.",
                "Με την ίδια ποινή τιμωρείται όποιος έχει συνουσία ή επιχειρεί άλλη σεξουαλική πράξη με πρόσωπο που δεν μπορεί να αντισταθεί λόγω σωματικής ή ψυχικής κατάστασης.",
                "Εάν από την πράξη προκλήθηκε σοβαρή σωματική βλάβη ή ο θάνατος του παθόντος, ο δράστης τιμωρείται με ισόβια κάθειρξη ή με κάθειρξη τουλάχιστον δέκα ετών."
            ],
            "versions": [
                {"date": "2024", "law": "5089/2024", "text": "Όποιος με σωματική βία ή με απειλή σοβαρού και άμεσου κινδύνου αναγκάζει κάποιον σε συνουσία ή σε άλλη ιδιαίτερα ταπεινωτική ή εξευτελιστική σεξουαλική πράξη, τιμωρείται με φυλάκιση από πέντε μέχρι είκοσι έτη.\n\nΜε την ίδια ποινή τιμωρείται όποιος έχει συνουσία ή επιχειρεί άλλη σεξουαλική πράξη με πρόσωπο που δεν μπορεί να αντισταθεί λόγω σωματικής ή ψυχικής κατάστασης.\n\nΕάν από την πράξη προκλήθηκε σοβαρή σωματική βλάβη ή ο θάνατος του παθόντος, ο δράστης τιμωρείται με ισόβια κάθειρξη ή με κάθειρξη τουλάχιστον δέκα ετών."}
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
            ],
            "versions": [
                {"date": "2024", "law": "5089/2024", "text": "Με βούλευμα ή διάταγμα του δικαστικού συμβουλίου ή του δικαστή ανακρίσεως, μπορεί να διαταχθεί η προσωρινή κράτηση του κατηγορούμενου εάν συντρέχουν οι προϋποθέσεις των άρθρων 282 και 307 και εάν είναι αναγκαία για να εξασφαλισθεί η παρουσία του κατηγορούμενου στη δίκη.\n\nΗ προσωρινή κράτηση μπορεί επίσης να διαταχθεί για την αποτροπή νέων εγκλημάτων ή για την εξασφάλιση της ομαλής διεξαγωγής της ανάκρισης."}
            ]
        },
        "324": {
            "title": "Διάρκεια κράτησης",
            "text": "Η προσωρινή κράτηση του κατηγορούμενου για πλημμέλημα δεν μπορεί να υπερβεί τους έξι μήνες. Για κακούργημα δεν μπορεί να υπερβεί τους δεκαοκτώ μήνες μέχρι τη συζήτηση της υπόθεσης στο πρωτοβάθμιο δικαστήριο.",
            "paragraphs": [
                "Η προσωρινή κράτηση του κατηγορούμενου για πλημμέλημα δεν μπορεί να υπερβεί τους έξι μήνες.",
                "Για κακούργημα δεν μπορεί να υπερβεί τους δεκαοκτώ μήνες μέχρι τη συζήτηση της υπόθεσης στο πρωτοβάθμιο δικαστήριο.",
                "Σε εξαιρετικές περιπτώσεις και με ειδική αιτιολογία, η διάρκεια μπορεί να παραταθεί."
            ],
            "versions": [
                {"date": "2024", "law": "5089/2024", "text": "Η προσωρινή κράτηση του κατηγορούμενου για πλημμέλημα δεν μπορεί να υπερβεί τους έξι μήνες.\n\nΓια κακούργημα δεν μπορεί να υπερβεί τους δεκαοκτώ μήνες μέχρι τη συζήτηση της υπόθεσης στο πρωτοβάθμιο δικαστήριο.\n\nΣε εξαιρετικές περιπτώσεις και με ειδική αιτιολογία, η διάρκεια μπορεί να παραταθεί."}
            ]
        },
        "320": {
            "title": "Ένταλμα σύλληψης",
            "text": "Ένταλμα σύλληψης εκδίδεται από τον εισαγγελέα ή τον δικαστή ανακρίσεως όταν υπάρχουν σοβαρές ενδείξεις ότι ο κατηγορούμενος έχει διαπράξει αξιόποινη πράξη.",
            "paragraphs": [
                "Ένταλμα σύλληψης εκδίδεται από τον εισαγγελέα ή τον δικαστή ανακρίσεως όταν υπάρχουν σοβαρές ενδείξεις ότι ο κατηγορούμενος έχει διαπράξει αξιόποινη πράξη."
            ],
            "versions": [
                {"date": "2024", "law": "5089/2024", "text": "Ένταλμα σύλληψης εκδίδεται από τον εισαγγελέα ή τον δικαστή ανακρίσεως όταν υπάρχουν σοβαρές ενδείξεις ότι ο κατηγορούμενος έχει διαπράξει αξιόποινη πράξη."}
            ]
        },
        "325": {
            "title": "Άρση προσωρινής κράτησης",
            "text": "Η προσωρινή κράτηση αίρεται αυτοδικαίως όταν παρέλθει ο χρόνος που προβλέπεται στο άρθρο 324 ή όταν εκδοθεί σχετική απόφαση του αρμόδιου δικαστηρίου.",
            "paragraphs": [
                "Η προσωρινή κράτηση αίρεται αυτοδικαίως όταν παρέλθει ο χρόνος που προβλέπεται στο άρθρο 324 ή όταν εκδοθεί σχετική απόφαση του αρμόδιου δικαστηρίου."
            ],
            "versions": [
                {"date": "2024", "law": "5089/2024", "text": "Η προσωρινή κράτηση αίρεται αυτοδικαίως όταν παρέλθει ο χρόνος που προβλέπεται στο άρθρο 324 ή όταν εκδοθεί σχετική απόφαση του αρμόδιου δικαστηρίου."}
            ]
        }
    }
};

// Search functionality
class CodexSearch {
    constructor() {
        this.currentMode = 'quick';
        this.searchIndex = this.buildSearchIndex();
        this.currentArticle = null;
        this.bookmarks = new Set(['299', '187A', '322']); // Sample bookmarks
        this.recentArticles = ['280A', '324']; // Sample recent articles
    }

    buildSearchIndex() {
        const index = {};
        
        // Index articles and content
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

    parseQuery(query) {
        query = query.trim();
        
        // Check if it's an article number search
        const articleMatch = query.match(/^(\d+)([αβγδΑΒΓΔ]?)\.?(\d+)?$/i);
        if (articleMatch) {
            return {
                type: 'article',
                number: articleMatch[1] + (articleMatch[2] || ''),
                paragraph: articleMatch[3] ? parseInt(articleMatch[3]) : null
            };
        }

        // Check for "άρθρο X" format
        const articleWordMatch = query.match(/άρθρο\s*(\d+)([αβγδΑΒΓΔ]?)/i);
        if (articleWordMatch) {
            return {
                type: 'article',
                number: articleWordMatch[1] + (articleWordMatch[2] || ''),
                paragraph: null
            };
        }

        // Text search
        return {
            type: 'text',
            terms: this.extractKeywords(query)
        };
    }

    search(query, mode = 'quick') {
        const parsedQuery = this.parseQuery(query);
        
        if (parsedQuery.type === 'article') {
            return this.searchByArticle(parsedQuery.number, parsedQuery.paragraph);
        } else {
            return this.searchByText(parsedQuery.terms, mode);
        }
    }

    searchByArticle(articleNumber, paragraph = null) {
        const results = [];
        
        Object.keys(sampleData).forEach(codeType => {
            if (sampleData[codeType][articleNumber]) {
                const article = sampleData[codeType][articleNumber];
                results.push({
                    article: articleNumber,
                    code: codeType,
                    title: article.title,
                    text: article.text,
                    paragraph: paragraph,
                    relevance: 1.0
                });
            }
        });
        
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    searchByText(terms, mode) {
        if (!terms || terms.length === 0) return [];
        
        const results = [];
        const maxResults = mode === 'quick' ? 10 : 50;
        
        Object.values(this.searchIndex).forEach(item => {
            let score = 0;
            let matches = 0;
            
            terms.forEach(term => {
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
                const relevance = score / terms.length;
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
        
        return results
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, maxResults);
    }
}

// Application state management
class CodexApp {
    constructor() {
        this.search = new CodexSearch();
        this.currentSection = 'home';
        this.currentView = null;
        this.initializeEventListeners();
        this.showSection('home');
    }

    initializeEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const paragraphInput = document.getElementById('paragraphInput');
        const searchBtn = document.getElementById('searchBtn');
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        paragraphInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performParagraphSearch();
        });
        
        // Enable/disable paragraph search based on main search
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            const parsedQuery = this.search.parseQuery(query);
            
            if (parsedQuery.type === 'article' && parsedQuery.number) {
                paragraphInput.disabled = false;
                paragraphInput.placeholder = `Παράγραφος άρθρου ${parsedQuery.number}`;
            } else {
                paragraphInput.disabled = true;
                paragraphInput.value = '';
                paragraphInput.placeholder = 'Παράγραφος/Εδάφιο';
            }
        });
        
        // Auto-trigger paragraph search when both fields have values
        paragraphInput.addEventListener('input', (e) => {
            const mainQuery = searchInput.value.trim();
            const paragraphQuery = e.target.value.trim();
            
            if (mainQuery && paragraphQuery && !paragraphInput.disabled) {
                this.performParagraphSearch();
            }
        });
        
        searchBtn.addEventListener('click', () => this.performSearch());
        
        // Search mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.search.currentMode = e.target.dataset.mode;
            });
        });
        
        // Browse buttons
        document.querySelectorAll('[data-action="browse"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showBrowse(e.target.closest('[data-code]').dataset.code);
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
    }

    performSearch() {
        const query = document.getElementById('searchInput').value.trim();
        const paragraphQuery = document.getElementById('paragraphInput').value.trim();
        
        if (!query) return;
        
        // Check if we have both article and paragraph
        const parsedQuery = this.search.parseQuery(query);
        if (parsedQuery.type === 'article' && paragraphQuery) {
            const paragraphNum = parseInt(paragraphQuery);
            if (!isNaN(paragraphNum)) {
                // Direct article view with paragraph highlight
                const results = this.search.searchByArticle(parsedQuery.number, paragraphNum);
                if (results.length > 0) {
                    this.showArticle(results[0].article, results[0].code, paragraphNum);
                    return;
                }
            }
        }
        
        // Regular search
        const results = this.search.search(query, this.search.currentMode);
        this.displaySearchResults(results, query);
        this.showSection('search');
    }

    performParagraphSearch() {
        const mainQuery = document.getElementById('searchInput').value.trim();
        const paragraphQuery = document.getElementById('paragraphInput').value.trim();
        
        if (!mainQuery || !paragraphQuery) return;
        
        // Parse main query to get article number
        const parsedQuery = this.search.parseQuery(mainQuery);
        if (parsedQuery.type === 'article') {
            const paragraphNum = parseInt(paragraphQuery);
            if (!isNaN(paragraphNum)) {
                const results = this.search.searchByArticle(parsedQuery.number, paragraphNum);
                if (results.length > 0) {
                    this.showArticle(results[0].article, results[0].code, paragraphNum);
                }
            }
        }
    }

    displaySearchResults(results, query) {
        const container = document.getElementById('searchResults');
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>Δεν βρέθηκαν αποτελέσματα για "${query}"</h3>
                    <p>Δοκιμάστε διαφορετικούς όρους ή χρησιμοποιήστε την εκτεταμένη αναζήτηση.</p>
                    <button class="extended-search-btn" onclick="app.performExtendedSearch('${query}')">
                        🔍 Εκτεταμένη αναζήτηση
                    </button>
                </div>
            `;
            return;
        }
        
        let html = `<h3>Αποτελέσματα για "${query}" (${results.length})</h3>`;
        
        results.forEach(result => {
            const codeClass = result.code === 'PK' ? 'pk' : 'kpd';
            const codeName = result.code === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
            
            html += `
                <div class="result-item" onclick="app.showArticle('${result.article}', '${result.code}', ${result.paragraph || 'null'})">
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
    }

    createSnippet(text, maxLength) {
        if (text.length <= maxLength) return text;
        const truncated = text.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
    }

    showArticle(articleNum, codeType, paragraph = null) {
        const article = sampleData[codeType][articleNum];
        if (!article) return;
        
        this.search.currentArticle = { article: articleNum, code: codeType };
        
        const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
        const codeIcon = codeType === 'PK' ? '📕' : '📘';
        const codeClass = codeType === 'PK' ? 'pk' : 'kpd';
        const isBookmarked = this.search.bookmarks.has(articleNum);
        
        // Get navigation info
        const navInfo = this.getNavigationInfo(articleNum, codeType);
        
        let html = `
            <button class="fullscreen-toggle" onclick="app.toggleFullscreen()" title="Προβολή πλήρους οθόνης">📖</button>
            
            <div class="article-nav">
                <button class="nav-btn" ${!navInfo.prev ? 'disabled' : ''} 
                        onclick="app.navigateArticle('${navInfo.prev}', '${codeType}')">
                    ← ΠΡΟΗΓ.
                </button>
                <div class="article-number">ΑΡΘΡΟ ${articleNum} ${codeName}</div>
                <button class="nav-btn" ${!navInfo.next ? 'disabled' : ''} 
                        onclick="app.navigateArticle('${navInfo.next}', '${codeType}')">
                    ΕΠΟΜ. →
                </button>
            </div>
            
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
                const isHighlighted = paragraph && (index + 1) === paragraph;
                html += `
                    <div class="paragraph ${isHighlighted ? 'highlighted' : ''}">
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
                <button class="action-btn ${isBookmarked ? 'bookmarked' : ''}" 
                        onclick="app.toggleBookmark('${articleNum}', this)">
                    ${isBookmarked ? '⭐' : '☆'} Σελιδοδείκτης
                </button>
                <button class="action-btn" onclick="app.copyArticle('${articleNum}', '${codeType}')">
                    📋 Αντιγραφή
                </button>
                <button class="action-btn" onclick="app.shareArticle('${articleNum}', '${codeType}')">
                    📤 Κοινοποίηση
                </button>
                <button class="action-btn" onclick="app.printArticle('${articleNum}', '${codeType}')">
                    🖨️ Εκτύπωση
                </button>
                <button class="action-btn" onclick="app.exportPDF('${articleNum}', '${codeType}')">
                    📄 PDF
                </button>
            </div>
        `;
        
        if (article.versions && article.versions.length > 1) {
            html += this.createVersionSection(article.versions, articleNum, codeType);
        }
        
        document.getElementById('articleView').innerHTML = html;
        this.showSection('article');
        
        // Scroll to highlighted paragraph if specified
        if (paragraph) {
            setTimeout(() => {
                const highlighted = document.querySelector('.paragraph.highlighted');
                if (highlighted) {
                    highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }

    createVersionSection(versions, articleNum, codeType) {
        let html = `
            <div class="version-info">
                <h4>🔄 Ιστορικό εκδόσεων</h4>
                <div class="version-buttons">
        `;
        
        versions.forEach((version, index) => {
            const validityDates = this.getValidityDates(version, index, versions);
            html += `
                <button class="version-btn ${index === 0 ? 'active' : ''}" 
                        onclick="app.showVersion('${articleNum}', '${codeType}', ${index})">
                    ${version.law} (${validityDates})
                </button>
            `;
        });
        
        html += `
                </div>
                <div class="version-controls">
                    <button class="compare-btn" onclick="app.toggleCompareMode('${articleNum}', '${codeType}')">
                        📊 Συγκριτική προβολή
                    </button>
                </div>
                <div class="version-content" id="versionContent">
                    <p><strong>Τρέχουσα έκδοση (${versions[0].law}):</strong></p>
                    <p>${versions[0].text.replace(/\n\n/g, '</p><p>')}</p>
                </div>
                <div class="compare-view" id="compareView" style="display: none;">
                    <div class="compare-controls">
                        <div class="version-selectors">
                            <div class="selector-group">
                                <label>1η έκδοση:</label>
                                <select id="compareSelect1" onchange="app.updateComparison('${articleNum}', '${codeType}')">
                                </select>
                            </div>
                            <div class="selector-group">
                                <label>2η έκδοση:</label>
                                <select id="compareSelect2" onchange="app.updateComparison('${articleNum}', '${codeType}')">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="compare-columns">
                        <div class="compare-column">
                            <h5 id="compareTitle1">Προηγούμενη έκδοση</h5>
                            <div id="compareOld"></div>
                        </div>
                        <div class="compare-column">
                            <h5 id="compareTitle2">Τρέχουσα έκδοση</h5>
                            <div id="compareNew"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }

    getValidityDates(version, index, versions) {
        // Για την τρέχουσα έκδοση
        if (index === 0) {
            return `από 1/4/${version.date}`;
        }
        
        // Για παλιότερες εκδόσεις
        const nextVersion = versions[index - 1];
        const endYear = nextVersion ? parseInt(nextVersion.date) : new Date().getFullYear();
        return `1/1/${version.date} - 31/3/${endYear}`;
    }

    getNavigationInfo(currentArticle, codeType) {
        const articles = Object.keys(sampleData[codeType]).sort((a, b) => {
            // Custom sort for alphanumeric articles
            const parseArticle = (art) => {
                const match = art.match(/^(\d+)([Α-Ω]?)$/);
                if (match) {
                    return { num: parseInt(match[1]), letter: match[2] || '' };
                }
                return { num: parseInt(art), letter: '' };
            };
            
            const aData = parseArticle(a);
            const bData = parseArticle(b);
            
            if (aData.num !== bData.num) {
                return aData.num - bData.num;
            }
            return aData.letter.localeCompare(bData.letter);
        });
        
        const currentIndex = articles.indexOf(currentArticle);
        
        return {
            prev: currentIndex > 0 ? articles[currentIndex - 1] : null,
            next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
        };
    }

    navigateArticle(articleNum, codeType) {
        if (articleNum) {
            this.showArticle(articleNum, codeType);
        }
    }

    showBrowse(codeType) {
        const codeName = codeType === 'PK' ? 'Ποινικός Κώδικας' : 'Κώδικας Ποινικής Δικονομίας';
        const articles = Object.keys(sampleData[codeType]).sort((a, b) => {
            const parseArticle = (art) => {
                const match = art.match(/^(\d+)([Α-Ω]?)$/);
                if (match) {
                    return { num: parseInt(match[1]), letter: match[2] || '' };
                }
                return { num: parseInt(art), letter: '' };
            };
            
            const aData = parseArticle(a);
            const bData = parseArticle(b);
            
            if (aData.num !== bData.num) {
                return aData.num - bData.num;
            }
            return aData.letter.localeCompare(bData.letter);
        });
        
        let html = `
            <div class="browse-header">
                <h2>${codeName}</h2>
            </div>
            <div class="article-list">
        `;
        
        articles.forEach(articleNum => {
            const article = sampleData[codeType][articleNum];
            const isBookmarked = this.search.bookmarks.has(articleNum);
            
            html += `
                <div class="article-list-item" onclick="app.showArticle('${articleNum}', '${codeType}')">
                    <div class="article-list-info">
                        <div class="article-list-number">Άρθρο ${articleNum} ${isBookmarked ? '⭐' : ''}</div>
                        <div class="article-list-title">${article.title}</div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        document.getElementById('browseView').innerHTML = html;
        this.showSection('browse');
    }

    showSection(sectionName) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(sectionName + 'Section').classList.add('active');
        this.currentSection = sectionName;
    }

    toggleBookmark(articleNum, buttonElement) {
        if (this.search.bookmarks.has(articleNum)) {
            this.search.bookmarks.delete(articleNum);
            buttonElement.classList.remove('bookmarked');
            buttonElement.innerHTML = '☆ Σελιδοδείκτης';
        } else {
            this.search.bookmarks.add(articleNum);
            buttonElement.classList.add('bookmarked');
            buttonElement.innerHTML = '⭐ Σελιδοδείκτης';
        }
    }

    copyArticle(articleNum, codeType) {
        const article = sampleData[codeType][articleNum];
        const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
        const text = `Άρθρο ${articleNum} ${codeName} - ${article.title}\n\n${article.text}`;
        
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Το άρθρο αντιγράφηκε στο πρόχειρο');
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
            });
        } else {
            this.copyArticle(articleNum, codeType);
            this.showToast('Το άρθρο αντιγράφηκε για κοινοποίηση');
        }
    }

    printArticle(articleNum, codeType) {
        const article = sampleData[codeType][articleNum];
        const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
        
        // Create print content
        const printContent = `
            <html>
            <head>
                <title>Άρθρο ${articleNum} ${codeName} - ${article.title}</title>
                <style>
                    body { font-family: Georgia, serif; line-height: 1.6; margin: 40px; }
                    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                    .meta { color: #7f8c8d; font-size: 14px; margin-bottom: 20px; }
                    .paragraph { margin-bottom: 15px; }
                    .paragraph-number { font-weight: bold; color: #3498db; }
                    @media print { body { margin: 20px; } }
                </style>
            </head>
            <body>
                <h1>Άρθρο ${articleNum} - ${article.title}</h1>
                <div class="meta">${codeName} | Ενημερωμένη έκδοση</div>
                <div class="content">
                    ${article.paragraphs && article.paragraphs.length > 1 
                        ? article.paragraphs.map((para, index) => 
                            `<div class="paragraph"><span class="paragraph-number">${index + 1}.</span> ${para}</div>`
                          ).join('')
                        : `<p>${article.text}</p>`
                    }
                </div>
            </body>
            </html>
        `;
        
        // Open print dialog
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
        
        this.showToast('Άρθρο στάλθηκε για εκτύπωση');
    }

    exportPDF(articleNum, codeType) {
        this.showToast('Λειτουργία PDF σε ανάπτυξη');
    }

    toggleFullscreen() {
        const articleView = document.getElementById('articleView');
        
        if (articleView.classList.contains('article-view-fullscreen')) {
            // Exit fullscreen
            articleView.classList.remove('article-view-fullscreen');
            document.querySelector('.fullscreen-toggle').innerHTML = '📖';
            document.querySelector('.fullscreen-toggle').title = 'Προβολή πλήρους οθόνης';
        } else {
            // Enter fullscreen
            articleView.classList.add('article-view-fullscreen');
            document.querySelector('.fullscreen-toggle').innerHTML = '✕';
            document.querySelector('.fullscreen-toggle').title = 'Έξοδος από πλήρη οθόνη';
        }
    }

    showVersion(articleNum, codeType, versionIndex) {
        const article = sampleData[codeType][articleNum];
        const version = article.versions[versionIndex];
        
        // Update active button
        document.querySelectorAll('.version-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update content
        const versionContent = document.getElementById('versionContent');
        versionContent.innerHTML = `
            <p><strong>Έκδοση ${version.date} (${version.law}):</strong></p>
            <p>${version.text.replace(/\n\n/g, '</p><p>')}</p>
        `;
    }

    performExtendedSearch(query) {
        this.search.currentMode = 'extended';
        document.querySelector('[data-mode="extended"]').classList.add('active');
        document.querySelector('[data-mode="quick"]').classList.remove('active');
        
        document.getElementById('searchInput').value = query;
        this.performSearch();
    }

    toggleCompareMode(articleNum, codeType) {
        const article = sampleData[codeType][articleNum];
        const compareView = document.getElementById('compareView');
        const versionContent = document.getElementById('versionContent');
        const compareBtn = document.querySelector('.compare-btn');
        
        if (compareView.style.display === 'none') {
            // Show compare view
            compareView.style.display = 'block';
            versionContent.style.display = 'none';
            compareBtn.textContent = '📝 Κανονική προβολή';
            
            // Populate dropdowns
            this.populateVersionSelectors(article.versions);
            
            // Initial comparison setup
            this.updateComparison(articleNum, codeType);
        } else {
            // Hide compare view
            compareView.style.display = 'none';
            versionContent.style.display = 'block';
            compareBtn.textContent = '📊 Συγκριτική προβολή';
        }
    }

    populateVersionSelectors(versions) {
        const select1 = document.getElementById('compareSelect1');
        const select2 = document.getElementById('compareSelect2');
        
        // Clear existing options
        select1.innerHTML = '';
        select2.innerHTML = '';
        
        versions.forEach((version, index) => {
            const validityDates = this.getValidityDates(version, index, versions);
            const optionText = `${version.law} (${validityDates})`;
            
            select1.appendChild(new Option(optionText, index));
            select2.appendChild(new Option(optionText, index));
        });
        
        // Set default selections
        if (versions.length >= 2) {
            select1.value = 1; // Previous version
            select2.value = 0; // Current version
        }
    }

    updateComparison(articleNum, codeType) {
        const article = sampleData[codeType][articleNum];
        const select1 = document.getElementById('compareSelect1');
        const select2 = document.getElementById('compareSelect2');
        
        if (!select1 || !select2) return;
        
        const version1Index = parseInt(select1.value);
        const version2Index = parseInt(select2.value);
        
        const version1 = article.versions[version1Index];
        const version2 = article.versions[version2Index];
        
        // Update titles
        const validityDates1 = this.getValidityDates(version1, version1Index, article.versions);
        const validityDates2 = this.getValidityDates(version2, version2Index, article.versions);
        
        document.getElementById('compareTitle1').textContent = `${version1.law} (${validityDates1})`;
        document.getElementById('compareTitle2').textContent = `${version2.law} (${validityDates2})`;
        
        // Update content
        document.getElementById('compareOld').innerHTML = `
            <p>${version1.text.replace(/\n\n/g, '</p><p>')}</p>
        `;
        document.getElementById('compareNew').innerHTML = `
            <p>${version2.text.replace(/\n\n/g, '</p><p>')}</p>
        `;
    }

    showToast(message) {
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
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }
}

// Add CSS for toast animations - Using dynamic style injection
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CodexApp();
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('PWA: Service Worker registered'))
      .catch(error => console.log('PWA: Service Worker registration failed'));
  });
}
