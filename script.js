// Codex Criminalis - Extracted JavaScript from Working Version

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
        showToast('Ήχοι ενεργοποιημέν
