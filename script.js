// Codex Criminalis - Complete JavaScript (FULL VERSION)

// ===== GLOBAL STATE =====
let soundEnabled = true;
let currentSection = 'home';

// Sample data
const sampleData = {
    "PK": {
        "299": {
            "title": "Απάτη",
            "text": "Όποιος με σκοπό να αποκομίσει για τον εαυτό του ή για άλλον παράνομο περιουσιακό όφελος, βλάπτει ξένη περιουσία προκαλώντας ή διατηρώντας σε κάποιον πλάνη με τεχνάσματα ή με παρασιώπηση της αλήθειας, τιμωρείται με φυλάκιση μέχρι δέκα έτη."
        },
        "280": {
            "title": "Κλοπή", 
            "text": "Όποιος αφαιρεί ξένο κινητό πράγμα με σκοπό να το ιδιοποιηθεί παράνομα, τιμωρείται με φυλάκιση μέχρι πέντε έτη ή με χρηματική ποινή."
        },
        "280A": {
            "title": "Υπεξαίρεση",
            "text": "Όποιος ως όργανο ή εκπρόσωπος νομικού προσώπου ή ως υπάλληλος ή εντολοδόχος φυσικού ή νομικού προσώπου ή ως διαχειριστής ξένης περιουσίας, παράνομα ιδιοποιείται χρήματα ή άλλα κινητά πράγματα που του έχουν εμπιστευθεί ή που έχει υπό την κατοχή του λόγω της ιδιότητάς του, τιμωρείται με φυλάκιση τουλάχιστον έξι μηνών."
        },
        "187A": {
            "title": "Βιασμός",
            "text": "Όποιος με σωματική βία ή με απειλή σοβαρού και άμεσου κινδύνου αναγκάζει κάποιον σε συνουσία ή σε άλλη ιδιαίτερα ταπεινωτική ή εξευτελιστική σεξουαλική πράξη, τιμωρείται με φυλάκιση από πέντε μέχρι είκοσι έτη."
        }
    },
    "KPD": {
        "322": {
            "title": "Προσωρινή κράτηση",
            "text": "Με βούλευμα ή διάταγμα του δικαστικού συμβουλίου ή του δικαστή ανακρίσεως, μπορεί να διαταχθεί η προσωρινή κράτηση του κατηγορούμενου εάν συντρέχουν οι προϋποθέσεις των άρθρων 282 και 307 και εάν είναι αναγκαία για να εξασφαλισθεί η παρουσία του κατηγορούμενου στη δίκη."
        },
        "324": {
            "title": "Διάρκεια κράτησης", 
            "text": "Η προσωρινή κράτηση του κατηγορούμενου για πλημμέλημα δεν μπορεί να υπερβεί τους έξι μήνες. Για κακούργημα δεν μπορεί να υπερβεί τους δεκαοκτώ μήνες μέχρι τη συζήτηση της υπόθεσης στο πρωτοβάθμιο δικαστήριο."
        },
        "320": {
            "title": "Ένταλμα σύλληψης",
            "text": "Ένταλμα σύλληψης εκδίδεται από τον εισαγγελέα ή τον δικαστή ανακρίσεως όταν υπάρχουν σοβαρές ενδείξεις ότι ο κατηγορούμενος έχει διαπράξει αξιόποινη πράξη."
        },
        "325": {
            "title": "Άρση προσωρινής κράτησης",
            "text": "Η προσωρινή κράτηση αίρεται αυτοδικαίως όταν παρέλθει ο χρόνος που προβλέπεται στο άρθρο 324 ή όταν εκδοθεί σχετική απόφαση του αρμόδιου δικαστηρίου."
        }
    }
};

// ===== UTILITY FUNCTIONS =====
function updateDebug(message) {
    const debug = document.getElementById('debugInfo');
    if (debug) {
        debug.textContent = message;
    }
    console.log('DEBUG:', message);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

function playClickSound() {
    if (!soundEnabled) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio not supported:', e);
    }
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
    }
}

// ===== MAIN FUNCTIONS =====
function goHome() {
    updateDebug('goHome() called');
    playClickSound();
    showSection('home');
    
    // Clear active browse buttons
    document.querySelectorAll('.code-btn').forEach(btn => {
        btn.classList.remove('active');
    });
}

function toggleSound(event) {
    if (event) event.stopPropagation();
    updateDebug('toggleSound() called');
    
    soundEnabled = !soundEnabled;
    const soundBtn = document.querySelector('.sound-toggle');
    
    if (soundEnabled) {
        soundBtn.textContent = '🔊';
        soundBtn.classList.remove('muted');
        soundBtn.title = 'Απενεργοποίηση ήχων';
        showToast('Ήχοι ενεργοποιημένοι');
    } else {
        soundBtn.textContent = '🔇';
        soundBtn.classList.add('muted');
        soundBtn.title = 'Ενεργοποίηση ήχων';
        showToast('Ήχοι απενεργοποιημένοι');
    }
    
    playClickSound();
}

function toggleFullscreen(event) {
    if (event) event.stopPropagation();
    updateDebug('toggleFullscreen() called');
    playClickSound();
    
    showToast('Fullscreen λειτουργία σε ανάπτυξη');
}

function showDevInfo(event) {
    if (event) event.stopPropagation();
    updateDebug('showDevInfo() called');
    playClickSound();
    
    const modal = document.getElementById('devModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeDevInfo() {
    updateDebug('closeDevInfo() called');
    playClickSound();
    
    const modal = document.getElementById('devModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function setSearchMode(mode, buttonElement) {
    updateDebug('setSearchMode() called: ' + mode);
    playClickSound();
    
    // Clear all active
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set active
    buttonElement.classList.add('active');
}

function showBrowse(codeType, buttonElement) {
    updateDebug('showBrowse() called: ' + codeType);
    playClickSound();
    
    // Clear all active browse buttons
    document.querySelectorAll('.code-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set this button active
    buttonElement.classList.add('active');
    
    showToast(`Περιήγηση ${codeType === 'PK' ? 'Ποινικού Κώδικα' : 'ΚΠΔ'} σε ανάπτυξη`);
}

function performSearch() {
    updateDebug('performSearch() called');
    playClickSound();
    
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        showToast('Εισάγετε όρο αναζήτησης');
        return;
    }
    
    showToast(`Αναζήτηση για: "${query}" σε ανάπτυξη`);
}

function showArticle(articleNum, codeType) {
    updateDebug(`showArticle() called: ${articleNum} ${codeType}`);
    playClickSound();
    
    const article = sampleData[codeType] && sampleData[codeType][articleNum];
    if (!article) {
        showToast('Το άρθρο δεν βρέθηκε');
        return;
    }
    
    const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
    const codeIcon = codeType === 'PK' ? '📕' : '📘';
    
    const articleContent = document.getElementById('articleContent');
    if (articleContent) {
        articleContent.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #dee2e6;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <button class="mode-btn clickable" onclick="goHome()">← Αρχική</button>
                    <div style="font-weight: 600; color: #2c3e50;">ΑΡΘΡΟ ${articleNum} ${codeName}</div>
                    <div style="opacity: 0.5;">📄</div>
                </div>
                
                <div style="border-bottom: 2px solid #3498db; padding-bottom: 15px; margin-bottom: 20px;">
                    <h2 style="color: #2c3e50; font-size: 20px; margin-bottom: 5px;">Άρθρο ${articleNum} - ${article.title}</h2>
                    <div style="color: #7f8c8d; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px;">${codeIcon}</span>
                        ${codeName} | Ενημερωμένη έκδοση
                    </div>
                </div>
                
                <div style="line-height: 1.6; font-size: 16px; color: #2c3e50; margin-bottom: 20px;">
                    <p>${article.text}</p>
                </div>
                
                <div style="display: flex; gap: 10px; padding-top: 15px; border-top: 1px solid #dee2e6; flex-wrap: wrap;">
                    <button class="mode-btn clickable" onclick="copyArticle('${articleNum}', '${codeType}')">📋 Αντιγραφή</button>
                    <button class="mode-btn clickable" onclick="showToast('Share λειτουργία σε ανάπτυξη')">📤 Κοινοποίηση</button>
                    <button class="mode-btn clickable" onclick="showToast('Print λειτουργία σε ανάπτυξη')">🖨️ Εκτύπωση</button>
                </div>
            </div>
        `;
        
        showSection('article');
    }
}

function copyArticle(articleNum, codeType) {
    updateDebug(`copyArticle() called: ${articleNum} ${codeType}`);
    playClickSound();
    
    const article = sampleData[codeType] && sampleData[codeType][articleNum];
    if (!article) {
        showToast('Άρθρο δεν βρέθηκε');
        return;
    }
    
    const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
    const text = `Άρθρο ${articleNum} ${codeName} - ${article.title}\n\n${article.text}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Το άρθρο αντιγράφηκε στο πρόχειρο');
        }).catch(() => {
            showToast('Αποτυχία αντιγραφής');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('Το άρθρο αντιγράφηκε στο πρόχειρο');
        } catch {
            showToast('Αποτυχία αντιγραφής');
        }
        document.body.removeChild(textArea);
    }
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    updateDebug('DOM Content Loaded - Initializing...');
    
    // Test all functions
    const functions = ['goHome', 'toggleSound', 'toggleFullscreen', 'showDevInfo', 'closeDevInfo', 'showBrowse', 'performSearch', 'showArticle'];
    const missing = functions.filter(fn => typeof window[fn] !== 'function');
    
    if (missing.length === 0) {
        updateDebug('✅ All functions loaded successfully');
        showToast('Codex Criminalis φορτώθηκε επιτυχώς!');
    } else {
        updateDebug('❌ Missing functions: ' + missing.join(', '));
    }
    
    // Add Enter key support for search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Add click outside modal to close
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeDevInfo();
        }
    });
    
    // Add ESC key support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDevInfo();
        }
    });
    
    // Hide debug info after 5 seconds
    setTimeout(() => {
        const debug = document.getElementById('debugInfo');
        if (debug) {
            debug.style.display = 'none';
        }
    }, 5000);
});

// Make functions globally available
window.goHome = goHome;
window.toggleSound = toggleSound;
window.toggleFullscreen = toggleFullscreen;
window.showDevInfo = showDevInfo;
window.closeDevInfo = closeDevInfo;
window.setSearchMode = setSearchMode;
window.showBrowse = showBrowse;
window.performSearch = performSearch;
window.showArticle = showArticle;
window.copyArticle = copyArticle;

// Global error handler
window.addEventListener('error', function(e) {
    updateDebug('❌ JavaScript Error: ' + e.message);
    console.error('Error:', e);
});

// Initial status
updateDebug('JavaScript loaded - Ready!');
