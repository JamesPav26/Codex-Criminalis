// Check if we have both article and paragraph
    const parsedQuery = parseSearchQuery(query);
    if (parsedQuery.type === 'article' && paragraphQuery) {
        const paragraphNum = parseInt(paragraphQuery);
        if (!isNaN(paragraphNum)) {
            // Direct article view with paragraph highlight
            const results = searchByArticle(parsedQuery.number, paragraphNum);
            if (results.length > 0) {
                showArticle(results[0].article, results[0].code, paragraphNum);
                return;
            }
        }
    }
    
    // Regular search
    let results = [];
    if (parsedQuery.type === 'article') {
        results = searchByArticle(parsedQuery.number);
    } else {
        results = searchByText(parsedQuery.terms);
    }
    
    console.log('📊 Search results:', results);
    displaySearchResults(results, query);
    showSection('search');
}

function parseSearchQuery(query) {
    query = query.trim().toLowerCase();
    
    // Check for article number patterns
    const articlePatterns = [
        /^(\d+)([αβγδεζηθικλμνξοπρστυφχψωάέήίόύώ]?)$/i,
        /^άρθρο\s*(\d+)([αβγδεζηθικλμνξοπρστυφχψωάέήίόύώ]?)$/i,
        /^(\d+)\s*(πκ|κπδ)$/i
    ];
    
    for (let pattern of articlePatterns) {
        const match = query.match(pattern);
        if (match) {
            return {
                type: 'article',
                number: match[1] + (match[2] || '').toUpperCase().replace('Α', 'A')
            };
        }
    }
    
    // Text search
    return {
        type: 'text',
        terms: query.split(/\s+/).filter(term => term.length > 2)
    };
}

function searchByArticle(articleNumber) {
    console.log('🎯 Searching for article:', articleNumber);
    const results = [];
    
    // Check both PK and KPD
    ['PK', 'KPD'].forEach(codeType => {
        const article = sampleData[codeType][articleNumber];
        if (article) {
            results.push({
                article: articleNumber,
                code: codeType,
                title: article.title,
                text: article.text,
                relevance: 1.0,
                type: 'exact'
            });
        }
    });
    
    return results;
}

function searchByText(terms) {
    console.log('📝 Searching for terms:', terms);
    const results = [];
    
    if (!terms || terms.length === 0) return results;
    
    // Search through all articles
    ['PK', 'KPD'].forEach(codeType => {
        Object.keys(sampleData[codeType]).forEach(articleNum => {
            const article = sampleData[codeType][articleNum];
            let score = 0;
            let matchedTerms = [];
            
            terms.forEach(term => {
                const titleMatch = article.title.toLowerCase().includes(term);
                const textMatch = article.text.toLowerCase().includes(term);
                
                if (titleMatch) {
                    score += 3; // Title matches score higher
                    matchedTerms.push(term);
                }
                if (textMatch) {
                    score += 1;
                    matchedTerms.push(term);
                }
            });
            
            if (score > 0) {
                results.push({
                    article: articleNum,
                    code: codeType,
                    title: article.title,
                    text: article.text,
                    relevance: score,
                    matchedTerms: [...new Set(matchedTerms)], // Remove duplicates
                    type: 'text'
                });
            }
        });
    });
    
    return results.sort((a, b) => b.relevance - a.relevance);
}

function displaySearchResults(results, query) {
    const container = document.getElementById('searchResults');
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>❌ Δεν βρέθηκαν αποτελέσματα για "${query}"</h3>
                <p>Δοκιμάστε:</p>
                <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
                    <li>Αριθμό άρθρου (π.χ. 299, 280A)</li>
                    <li>Λέξεις-κλειδιά (π.χ. απάτη, κλοπή)</li>
                    <li>Πιο γενικούς όρους</li>
                </ul>
            </div>
        `;
        return;
    }
    
    let html = `<h3>🔍 Αποτελέσματα για "${query}" (${results.length})</h3>`;
    
    results.forEach(result => {
        const codeClass = result.code === 'PK' ? 'pk' : 'kpd';
        const codeName = result.code === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
        
        // Create highlighted snippet
        let snippet = result.text;
        if (result.type === 'text' && result.matchedTerms) {
            snippet = highlightTerms(result.text, result.matchedTerms);
        }
        
        html += `
            <div class="result-item" onclick="showArticleFromSearch('${result.article}', '${result.code}', ${JSON.stringify(result.matchedTerms || []).replace(/"/g, '&quot;')})">
                <div class="result-header">
                    <div class="result-article">Άρθρο ${result.article}</div>
                    <div class="result-code ${codeClass}">${codeName}</div>
                </div>
                <div class="result-title">${highlightTerms(result.title, result.matchedTerms || [])}</div>
                <div class="result-snippet">${createSnippet(snippet, 200)}</div>
                <div class="result-relevance" style="font-size: 11px; color: #95a5a6; margin-top: 5px;">
                    Σχετικότητα: ${Math.round(result.relevance * 100)}%
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function highlightTerms(text, terms) {
    if (!terms || terms.length === 0) return text;
    
    let result = text;
    terms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        result = result.replace(regex, '<mark style="background: #fff3cd; padding: 1px 2px; border-radius: 2px;">$1</mark>');
    });
    
    return result;
}

function createSnippet(text, maxLength) {
    // Remove HTML tags for length calculation
    const plainText = text.replace(/<[^>]*>/g, '');
    
    if (plainText.length <= maxLength) return text;
    
    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    const cutPoint = lastSpace > 0 ? lastSpace : maxLength;
    
    // Re-apply highlighting to the truncated text
    return text.substring(0, cutPoint) + '...';
}

function showArticleFromSearch(articleNum, codeType, matchedTerms) {
    playClickSound();
    console.log('📖 Opening article from search:', articleNum, codeType, matchedTerms);
    showArticle(articleNum, codeType, null, matchedTerms);
}

function setSearchMode(mode) {
    playClickSound();
    searchMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active', 'quick', 'extended');
    });
    
    const activeBtn = document.querySelector(`[onclick="setSearchMode('${mode}')"]`);
    activeBtn.classList.add('active', mode);
    
    console.log('🔍 Search mode set to:', mode);
}

// Browse functionality
function showBrowse(codeType) {
    playClickSound();
    console.log('📚 Opening browse for:', codeType);
    
    // Update browse button states
    updateBrowseButtonStates(codeType);
    
    const codeName = codeType === 'PK' ? 'Ποινικός Κώδικας' : 'Κώδικας Ποινικής Δικονομίας';
    const codeIcon = codeType === 'PK' ? '📕' : '📘';
    
    // Get sorted articles
    const articles = Object.keys(sampleData[codeType]).sort((a, b) => {
        const parseArticle = (art) => {
            const match = art.match(/^(\d+)([Α-Ωα-ω]?)$/);
            if (match) {
                return { 
                    num: parseInt(match[1]), 
                    letter: match[2] ? match[2].toUpperCase() : '' 
                };
            }
            return { num: parseInt(art) || 0, letter: '' };
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
            <h2>${codeIcon} ${codeName}</h2>
            <p style="color: #7f8c8d; margin-top: 8px;">
                ${articles.length} διαθέσιμα άρθρα • Κλικ για προβολή
            </p>
        </div>
        <div class="article-list">
    `;
    
    articles.forEach(articleNum => {
        const article = sampleData[codeType][articleNum];
        const isBookmarked = bookmarks.has(articleNum);
        
        html += `
            <div class="article-list-item" onclick="showArticle('${articleNum}', '${codeType}')">
                <div class="article-list-info">
                    <div class="article-list-number">
                        Άρθρο ${articleNum} ${isBookmarked ? '⭐' : ''}
                    </div>
                    <div class="article-list-title">${article.title}</div>
                </div>
                <div class="article-list-arrow">›</div>
            </div>
        `;
    });
    
    html += '</div>';
    
    document.getElementById('browseView').innerHTML = html;
    showSection('browse');
}

function updateBrowseButtonStates(activeCode) {
    // Clear all states first
    clearBrowseButtonStates();
    
    // Set active state for selected button
    if (activeCode === 'PK') {
        document.getElementById('browseButtonPK').classList.add('active', 'pk');
    } else if (activeCode === 'KPD') {
        document.getElementById('browseButtonKPD').classList.add('active', 'kpd');
    }
}

function clearBrowseButtonStates() {
    document.getElementById('browseButtonPK').classList.remove('active', 'pk');
    document.getElementById('browseButtonKPD').classList.remove('active', 'kpd');
}

// Article view functionality
function showArticle(articleNum, codeType, paragraph = null, highlightTerms = []) {
    playClickSound();
    const article = sampleData[codeType][articleNum];
    if (!article) return;
    
    console.log('📖 Showing article:', articleNum, codeType, 'paragraph:', paragraph, 'terms:', highlightTerms);
    
    const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
    const codeIcon = codeType === 'PK' ? '📕' : '📘';
    const codeClass = codeType === 'PK' ? 'pk' : 'kpd';
    const isBookmarked = bookmarks.has(articleNum);
    
    // Get navigation info
    const navInfo = getArticleNavigation(articleNum, codeType);
    
    let html = `
        <div class="article-nav">
            <button class="nav-btn" ${!navInfo.prev ? 'disabled' : ''} 
                    onclick="navigateToArticle('${navInfo.prev}', '${codeType}')">
                ← ΠΡΟΗΓ.
            </button>
            <div class="article-number">
                ΑΡΘΡΟ ${articleNum} ${codeName}
                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">
                    ${navInfo.current}/${navInfo.total}
                </div>
            </div>
            <button class="nav-btn" ${!navInfo.next ? 'disabled' : ''} 
                    onclick="navigateToArticle('${navInfo.next}', '${codeType}')">
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
    
    // Apply text highlighting if search terms provided
    let displayText = article.text;
    if (highlightTerms && highlightTerms.length > 0) {
        console.log('🎨 Applying highlighting for terms:', highlightTerms);
        highlightTerms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            displayText = displayText.replace(regex, '<mark style="background: #fff3cd; padding: 1px 2px; border-radius: 2px; font-weight: 500;">$1</mark>');
        });
    }
    
    if (article.paragraphs && article.paragraphs.length > 1) {
        article.paragraphs.forEach((para, index) => {
            const isHighlighted = paragraph && (index + 1) === paragraph;
            let paraText = para;
            
            // Apply highlighting to paragraph if needed
            if (highlightTerms && highlightTerms.length > 0) {
                highlightTerms.forEach(term => {
                    const regex = new RegExp(`(${term})`, 'gi');
                    paraText = paraText.replace(regex, '<mark style="background: #fff3cd; padding: 1px 2px; border-radius: 2px; font-weight: 500;">$1</mark>');
                });
            }
            
            html += `
                <div class="paragraph ${isHighlighted ? 'highlighted' : ''}">
                    <span class="paragraph-number">${index + 1}.</span>
                    ${paraText}
                </div>
            `;
        });
    } else {
        html += `<p>${displayText}</p>`;
    }
    
    html += `
        </div>
        
        <div class="article-actions">
            <button class="action-btn ${isBookmarked ? 'bookmarked' : ''}" 
                    onclick="toggleBookmark('${articleNum}', this)">
                ${isBookmarked ? '⭐' : '☆'} Σελιδοδείκτης
            </button>
            <button class="action-btn" onclick="copyArticle('${articleNum}', '${codeType}')">
                📋 Αντιγραφή
            </button>
            <button class="action-btn" onclick="shareArticle('${articleNum}', '${codeType}')">
                📤 Κοινοποίηση
            </button>
            <button class="action-btn" onclick="printArticle('${articleNum}', '${codeType}')">
                🖨️ Εκτύπωση
            </button>
            <button class="action-btn" onclick="exportPDF('${articleNum}', '${codeType}')">
                📄 PDF
            </button>
        </div>
    `;
    
    // Add version comparison section if multiple versions exist
    if (article.versions && article.versions.length > 1) {
        html += createVersionSection(article.versions, articleNum, codeType);
    }
    
    document.getElementById('articleView').innerHTML = html;
    showSection('article');
    
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

function getArticleNavigation(currentArticle, codeType) {
    const articles = Object.keys(sampleData[codeType]).sort((a, b) => {
        const parseArticle = (art) => {
            const match = art.match(/^(\d+)([Α-Ωα-ω]?)$/);
            if (match) {
                return { 
                    num: parseInt(match[1]), 
                    letter: match[2] ? match[2].toUpperCase() : '' 
                };
            }
            return { num: parseInt(art) || 0, letter: '' };
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
        next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
        current: currentIndex + 1,
        total: articles.length
    };
}

function navigateToArticle(articleNum, codeType) {
    playClickSound();
    if (articleNum) {
        console.log('🧭 Navigating to article:', articleNum, codeType);
        showArticle(articleNum, codeType);
    }
}

function createVersionSection(versions, articleNum, codeType) {
    let html = `
        <div class="version-info">
            <h4>🔄 Ιστορικό εκδόσεων & Συγκρίσεις</h4>
            <div class="version-buttons">
    `;
    
    versions.forEach((version, index) => {
        const validityDates = getValidityDates(version, index, versions);
        html += `
            <button class="version-btn ${index === 0 ? 'active' : ''}" 
                    onclick="showVersion('${articleNum}', '${codeType}', ${index})">
                ${version.law} (${validityDates})
            </button>
        `;
    });
    
    html += `
            </div>
            <div class="version-controls">
                <button class="compare-btn" onclick="toggleCompareMode('${articleNum}', '${codeType}')">
                    📊 Συγκριτική προβολή εκδόσεων
                </button>
            </div>
            <div class="version-content" id="versionContent">
                <p><strong>📅 Τρέχουσα έκδοση (${versions[0].law}):</strong></p>
                <div class="content">${versions[0].text.replace(/\n\n/g, '</p><p>')}</div>
            </div>
            <div class="compare-view" id="compareView" style="display: none;">
                <div class="compare-controls">
                    <div class="version-selectors">
                        <div class="selector-group">
                            <label>1η έκδοση προς σύγκριση:</label>
                            <select id="compareSelect1" onchange="updateComparison('${articleNum}', '${codeType}')">
                            </select>
                        </div>
                        <div class="selector-group">
                            <label>2η έκδοση προς σύγκριση:</label>
                            <select id="compareSelect2" onchange="updateComparison('${articleNum}', '${codeType}')">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="compare-columns">
                    <div class="compare-column">
                        <h5 id="compareTitle1">Προηγούμενη έκδοση</h5>
                        <div class="content" id="compareOld"></div>
                    </div>
                    <div class="compare-column">
                        <h5 id="compareTitle2">Τρέχουσα έκδοση</h5>
                        <div class="content" id="compareNew"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

function getValidityDates(version, index, versions) {
    if (index === 0) {
        return `από 1/4/${version.date}`;
    }
    
    const nextVersion = versions[index - 1];
    const endYear = nextVersion ? parseInt(nextVersion.date) : new Date().getFullYear();
    return `1/1/${version.date} - 31/3/${endYear}`;
}

function showVersion(articleNum, codeType, versionIndex) {
    playClickSound();
    const article = sampleData[codeType][articleNum];
    const version = article.versions[versionIndex];
    
    // Update active button
    document.querySelectorAll('.version-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update content
    const versionContent = document.getElementById('versionContent');
    versionContent.innerHTML = `
        <p><strong>📅 Έκδοση ${version.date} (${version.law}):</strong></p>
        <div class="content">${version.text.replace(/\n\n/g, '</p><p>')}</div>
    `;
    
    console.log('📖 Showing version:', version.law, 'for article', articleNum);
}

function toggleCompareMode(articleNum, codeType) {
    playClickSound();
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
        populateVersionSelectors(article.versions);
        
        // Initial comparison setup
        updateComparison(articleNum, codeType);
        
        console.log('📊 Entering comparison mode for article', articleNum);
    } else {
        // Hide compare view
        compareView.style.display = 'none';
        versionContent.style.display = 'block';
        compareBtn.textContent = '📊 Συγκριτική προβολή εκδόσεων';
        
        console.log('📝 Exiting comparison mode');
    }
}

function populateVersionSelectors(versions) {
    const select1 = document.getElementById('compareSelect1');
    const select2 = document.getElementById('compareSelect2');
    
    // Clear existing options
    select1.innerHTML = '';
    select2.innerHTML = '';
    
    versions.forEach((version, index) => {
        const validityDates = getValidityDates(version, index, versions);
        const optionText = `${version.law} (${validityDates})`;
        
        select1.appendChild(new Option(optionText, index));
        select2.appendChild(new Option(optionText, index));
    });
    
    // Set default selections
    if (versions.length >= 2) {
        select1.value = 1; // Previous version
        select2.value = 0; // Current version
    }
    
    console.log('🔄 Version selectors populated with', versions.length, 'versions');
}

function updateComparison(articleNum, codeType) {
    const article = sampleData[codeType][articleNum];
    const select1 = document.getElementById('compareSelect1');
    const select2 = document.getElementById('compareSelect2');
    
    if (!select1 || !select2) return;
    
    const version1Index = parseInt(select1.value);
    const version2Index = parseInt(select2.value);
    
    const version1 = article.versions[version1Index];
    const version2 = article.versions[version2Index];
    
    // Update titles
    const validityDates1 = getValidityDates(version1, version1Index, article.versions);
    const validityDates2 = getValidityDates(version2, version2Index, article.versions);
    
    document.getElementById('compareTitle1').textContent = `${version1.law} (${validityDates1})`;
    document.getElementById('compareTitle2').textContent = `${version2.law} (${validityDates2})`;
    
    // Update content
    document.getElementById('compareOld').innerHTML = `
        <div class="content">${version1.text.replace(/\n\n/g, '</p><p>')}</div>
    `;
    document.getElementById('compareNew').innerHTML = `
        <div class="content">${version2.text.replace(/\n\n/g, '</p><p>')}</div>
    `;
    
    console.log('⚖️ Comparing versions:', version1.law, 'vs', version2.law);
}

// Bookmark functionality
function toggleBookmark(articleNum, buttonElement) {
    playClickSound();
    
    if (bookmarks.has(articleNum)) {
        bookmarks.delete(articleNum);
        buttonElement.classList.remove('bookmarked');
        buttonElement.innerHTML = '☆ Σελιδοδείκτης';
        console.log('⭐ Removed bookmark for article', articleNum);
    } else {
        bookmarks.add(articleNum);
        buttonElement.classList.add('bookmarked');
        buttonElement.innerHTML = '⭐ Σελιδοδείκτης';
        console.log('⭐ Added bookmark for article', articleNum);
    }
    
    // Update any visible browse lists
    if (currentSection === 'browse') {
        // Refresh the current browse view to show updated stars
        const currentCodeType = document.querySelector('.browse-header h2').textContent.includes('Ποινικός') ? 'PK' : 'KPD';
        setTimeout(() => showBrowse(currentCodeType), 100);
    }
}

// Export functionality
function copyArticle(articleNum, codeType) {
    playClickSound();
    const article = sampleData[codeType][articleNum];
    const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
    const text = `Άρθρο ${articleNum} ${codeName} - ${article.title}\n\n${article.text}`;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('Το άρθρο αντιγράφηκε στο πρόχειρο');
        console.log('📋 Article copied to clipboard');
    });
}

function shareArticle(articleNum, codeType) {
    playClickSound();
    const article = sampleData[codeType][articleNum];
    const codeName = codeType === 'PK' ? 'ΠΚ' : 'ΚΠΔ';
    const text = `Άρθρο ${articleNum} ${codeName} - ${article.title}\n\n${article.text}`;
    
    if (navigator.share) {
        navigator.share({
            title: `Άρθρο ${articleNum} ${codeName} - ${article.title}`,
            text: text
        });
    } else {
        copyArticle(articleNum, codeType);
        showToast('Το άρθρο αντιγράφηκε για κοινοποίηση');
    }
    console.log('📤 Article shared');
}

function printArticle(articleNum, codeType) {
    playClickSound();
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
    
    showToast('Άρθρο στάλθηκε για εκτύπωση');
    console.log('🖨️ Article sent to printer');
}

function exportPDF(articleNum, codeType) {
    playClickSound();
    showToast('Λειτουργία PDF σε ανάπτυξη');
    console.log('📄 PDF export requested (under development)');
}

// Header controls
function toggleSound() {
    soundEnabled = !soundEnabled;
    
    const btn = document.getElementById('soundBtn');
    if (soundEnabled) {
        btn.innerHTML = '🔊';
        btn.title = 'Απενεργοποίηση ήχου';
        btn.classList.remove('sound-off');
        console.log('🔊 Sound enabled');
    } else {
        btn.innerHTML = '🔇';
        btn.title = 'Ενεργοποίηση ήχου';
        btn.classList.add('sound-off');
        console.log('🔇 Sound disabled');
    }
    
    // Play sound to test (only if enabling)
    if (soundEnabled) {
        playClickSound();
    }
}

function toggleFullscreen() {
    playClickSound();
    
    if (!document.fullscreenElement) {
        // Enter fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Safari
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE11
            document.documentElement.msRequestFullscreen();
        }
        
        document.getElementById('fullscreenBtn').innerHTML = '🗗';
        document.getElementById('fullscreenBtn').title = 'Έξοδος από πλήρη οθόνη';
        console.log('⛶ Entering fullscreen mode');
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE11
            document.msExitFullscreen();
        }
        
        document.getElementById('fullscreenBtn').innerHTML = '⛶';
        document.getElementById('fullscreenBtn').title = 'Πλήρης οθόνη';
        console.log('🗗 Exiting fullscreen mode');
    }
}

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', function() {
    const btn = document.getElementById('fullscreenBtn');
    if (document.fullscreenElement) {
        btn.innerHTML = '🗗';
        btn.title = 'Έξοδος από πλήρη οθόνη';
    } else {
        btn.innerHTML = '⛶';
        btn.title = 'Πλήρης οθόνη';
    }
});

function showDevInfo() {
    playClickSound();
    document.getElementById('devModal').style.display = 'block';
    console.log('ℹ️ Developer info modal opened');
}

function closeDevInfo() {
    playClickSound();
    document.getElementById('devModal').style.display = 'none';
    console.log('ℹ️ Developer info modal closed');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('devModal');
    if (event.target === modal) {
        closeDevInfo();
    }
});

// Utility functions
function showToast(message) {
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

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // ESC to close modals
    if (event.key === 'Escape') {
        closeDevInfo();
    }
    
    // F11 for fullscreen (prevent default and use our handler)
    if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
    }
    
    // Ctrl+K or Cmd+K for search focus
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Enter in search input
    if (event.key === 'Enter' && event.target.id === 'searchInput') {
        performSearch();
    }
});

// Enable/disable paragraph search based on main search
document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value.trim();
    const parsedQuery = parseSearchQuery(query);
    const paragraphInput = document.getElementById('paragraphInput');
    
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
document.getElementById('paragraphInput').addEventListener('input', function(e) {
    const mainQuery = document.getElementById('searchInput').value.trim();
    const paragraphQuery = e.target.value.trim();
    
    if (mainQuery && paragraphQuery && !e.target.disabled) {
        // Small delay to avoid too many searches
        setTimeout(() => {
            if (document.getElementById('searchInput').value.trim() === mainQuery && 
                document.getElementById('paragraphInput').value.trim() === paragraphQuery) {
                performSearch();
            }
        }, 500);
    }
});

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Codex Criminalis v1.4.0 initializing...');
    
    // Test all core functions
    const requiredFunctions = [
        'showSection', 'showHome', 'showBrowse', 'showArticle', 
        'performSearch', 'toggleSound', 'toggleFullscreen', 
        'showDevInfo', 'toggleBookmark', 'navigateToArticle'
    ];
    
    let allGood = true;
    requiredFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            console.log('✅', funcName, 'loaded');
        } else {
            console.log('❌', funcName, 'missing');
            allGood = false;
        }
    });
    
    if (allGood) {
        console.log('🎉 All functions loaded successfully!');
        console.log('📊 Sample data articles:', Object.keys(sampleData.PK).length, 'PK +', Object.keys(sampleData.KPD).length, 'KPD');
        console.log('⭐ Bookmarks:', Array.from(bookmarks));
        console.log('🔊 Sound enabled:', soundEnabled);
        console.log('📱 Ready for user interaction!');
    } else {
        console.log('⚠️ Some functions are missing!');
    }
    
    // Show home section
    showSection('home');
});

// Global error handler
window.addEventListener('error', function(event) {
    console.error('❌ Global error:', event.error);
    showToast('Προέκυψε σφάλμα. Ελέγξτε την κονσόλα για λεπτομέρειες.');
});

// Make functions globally available for onclick handlers
window.showSection = showSection;
window.showHome = showHome;
window.showBrowse = showBrowse;
window.showArticle = showArticle;
window.performSearch = performSearch;
window.setSearchMode = setSearchMode;
window.toggleSound = toggleSound;
window.toggleFullscreen = toggleFullscreen;
window.showDevInfo = showDevInfo;
window.closeDevInfo = closeDevInfo;
window.toggleBookmark = toggleBookmark;
window.navigateToArticle = navigateToArticle;
window.copyArticle = copyArticle;
window.shareArticle = shareArticle;
window.printArticle = printArticle;
window.exportPDF = exportPDF;
window.showVersion = showVersion;
window.toggleCompareMode = toggleCompareMode;
window.updateComparison = updateComparison;
window.showArticleFromSearch = showArticleFromSearch;

console.log('🌟 Codex Criminalis v1.4.0 - Ready for action! 🚀');// Codex Criminalis v1.4.0 - Main JavaScript
console.log('🚀 Codex Criminalis v1.4.0 initializing...');

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

// Global variables
let currentSection = 'home';
let bookmarks = new Set(['299', '187A', '322']); // Sample bookmarks
let recentArticles = ['280A', '324']; // Sample recent
let searchMode = 'quick';

// Sound System with subtle keyboard click
let soundEnabled = true;
let audioContext = null;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playClickSound() {
    if (!soundEnabled) return;
    
    initAudio();
    
    // Create a subtle keyboard click sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Very subtle frequencies for mechanical keyboard click
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.01);
    
    // Very low volume and quick decay
    gainNode.gain.setValueAtTime(0.02, audioContext.currentTime); // Much quieter
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.02);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.02); // Very quick
}

// Section management
function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionName + 'Section').classList.add('active');
    currentSection = sectionName;
    
    // Clear browse button states if not browsing
    if (sectionName !== 'browse') {
        clearBrowseButtonStates();
    }
}

function showHome() {
    playClickSound();
    console.log('🏠 Returning to home');
    showSection('home');
}

// Search functionality
function performSearch() {
    playClickSound();
    const query = document.getElementById('searchInput').value.trim();
    const paragraphQuery = document.getElementById('paragraphInput').value.trim();
    
    if (!query) return;
    
    console.log('🔍 Performing search for:', query);
    
    // Check if we have both article and paragraph
    const parse
