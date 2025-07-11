# ⚖️ Codex Criminalis

**Ελληνικός Ποινικός Κώδικας & Κώδικας Ποινικής Δικονομίας - Progressive Web App**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)

## 📖 Περιγραφή

Το **Codex Criminalis** είναι μια σύγχρονη Progressive Web Application (PWA) που παρέχει πλήρη πρόσβαση στον Ελληνικό Ποινικό Κώδικα και τον Κώδικα Ποινικής Δικονομίας. Η εφαρμογή είναι σχεδιασμένη για δικηγόρους, φοιτητές νομικής, δικαστές και όλους όσους χρειάζονται γρήγορη και αξιόπιστη πρόσβαση στη νομοθεσία.

## ✨ Χαρακτηριστικά

### 🔍 Αναζήτηση
- **Έξυπνη αναζήτηση** άρθρων με αριθμό ή κείμενο
- **Αναζήτηση παραγράφου** με συντακτικό "άρθρο X παρ Y"
- **Instant search** με real-time αποτελέσματα
- **Φίλτρα κώδικα** (ΠΚ/ΚΠΔ)

### 📱 Progressive Web App
- **Εγκατάσταση** σε κινητά & desktop
- **Offline λειτουργία** με Service Worker
- **Native app experience** χωρίς app store
- **Auto-update** μηχανισμός

### 🗂️ Περιήγηση & Οργάνωση
- **Browse mode** για περιήγηση ανά κώδικα
- **Bookmarks** σύστημα για αγαπημένα άρθρα
- **Recent articles** ιστορικό πρόσφατων προβολών
- **Article navigation** πρηγ/επόμενο άρθρο

### 📋 Export & Sharing
- **Copy to clipboard** με formatting
- **Share functionality** native sharing API
- **Print support** optimized για εκτύπωση
- **PDF export** (planned feature)

### 🔄 Version Management
- **Ιστορικό εκδόσεων** άρθρων
- **Συγκριτική προβολή** παλιών/νέων εκδόσεων
- **Date tracking** ισχύος νόμων
- **Legal references** αριθμοί νόμων

## 🚀 Live Demo

**🌐 [https://jamespav26.github.io/codex-criminalis/](https://jamespav26.github.io/codex-criminalis/)**

### 📱 Εγκατάσταση PWA
1. Ανοίξτε το link σε Chrome mobile
2. Πατήστε "Add to Home Screen" ή "Εγκατάσταση"
3. Η εφαρμογή θα εμφανιστεί στην αρχική οθόνη
4. Δουλεύει offline μετά την πρώτη φόρτωση!

## 🛠️ Τεχνολογίες

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **PWA:** Service Worker, Web App Manifest
- **Styling:** CSS Grid, Flexbox, Mobile-first design
- **Icons:** Progressive icons με maskable support
- **Hosting:** GitHub Pages
- **Version Control:** Git & GitHub

## 📂 Δομή Project

```
codex-criminalis/
├── index.html              # Κύρια εφαρμογή
├── manifest.json           # PWA configuration
├── sw.js                   # Service Worker για offline
├── icons/                  # App icons (72x72 έως 512x512)
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── ...
├── data/                   # JSON data files (planned)
│   ├── pk-articles.json
│   └── kpd-articles.json
└── README.md               # Project documentation
```

## 💾 Data Structure

```json
{
  "ΠΚ": {
    "299": {
      "title": "Απάτη",
      "text": "Όποιος με σκοπό...",
      "paragraphs": ["παρ.1 κείμενο", "παρ.2 κείμενο"],
      "versions": [
        {
          "date": "2024", 
          "law": "5089/2024", 
          "text": "..."
        }
      ]
    }
  },
  "ΚΠΔ": { /* similar structure */ }
}
```

## 🔧 Installation & Development

### Προαπαιτούμενα
- Git
- Modern web browser
- Code editor (VS Code recommended)

### Setup
```bash
# Clone repository
git clone https://github.com/jamespav26/codex-criminalis.git
cd codex-criminalis

# Serve locally (Python)
python -m http.server 8000

# Ή με Node.js
npx serve .

# Ανοίξτε: http://localhost:8000
```

### GitHub Pages Deployment
1. Push changes to `main` branch
2. Enable GitHub Pages στις ρυθμίσεις
3. Source: Deploy from branch → main
4. Site available σε: `https://jamespav26.github.io/codex-criminalis/`

## 📋 Roadmap

### ✅ Completed (v1.0)
- [x] Core PWA functionality
- [x] Basic search system
- [x] Article navigation
- [x] Bookmarks & recent articles
- [x] Version management
- [x] Mobile-optimized UI

### 🔄 In Progress (v1.1)
- [ ] Complete data integration (469 ΠΚ + 593 ΚΠΔ άρθρα)
- [ ] Enhanced search algorithms
- [ ] Performance optimizations
- [ ] Advanced caching strategies

### 🎯 Planned (v2.0)
- [ ] Ειδικοί Ποινικοί Νόμοι integration
- [ ] AI-powered legal search
- [ ] Legal cross-references
- [ ] Court decision links
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

Contributions are welcome! Για να συμβάλετε:

1. **Fork** το repository
2. **Create feature branch:** `git checkout -b feature-name`
3. **Commit changes:** `git commit -m 'Add feature'`
4. **Push to branch:** `git push origin feature-name`
5. **Open Pull Request**

### 📝 Contribution Guidelines
- Follow existing code style
- Test PWA functionality offline
- Ensure mobile compatibility
- Document new features
- Update version numbers appropriately

## 📄 License

MIT License - δείτε το [LICENSE](LICENSE) αρχείο για λεπτομέρειες.

## 👨‍💻 Developer

**Dimitris Pavlidis**
- 📧 Email: [dimipav@gmail.com](mailto:dimipav@gmail.com)
- 🐙 GitHub: [@jamespav26](https://github.com/jamespav26)

## 🙏 Acknowledgments

- Ελληνική Δημοκρατία για τη δημόσια διάθεση των νομοθετικών κειμένων
- Open source community για PWA best practices
- Legal professionals για feedback & requirements

## 📊 Statistics

- **469** άρθρα Ποινικού Κώδικα
- **593** άρθρα Κώδικα Ποινικής Δικονομίας
- **100%** offline functionality
- **~4MB** estimated total content size
- **Mobile-first** responsive design

---

### 🔗 Χρήσιμοι Σύνδεσμοι

- [Live Application](https://jamespav26.github.io/codex-criminalis/)
- [GitHub Issues](https://github.com/jamespav26/codex-criminalis/issues)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Web App Manifest Reference](https://developer.mozilla.org/en-US/docs/Web/Manifest)

**⚖️ Για νομικούς επαγγελματίες, από νομικούς επαγγελματίες.**
