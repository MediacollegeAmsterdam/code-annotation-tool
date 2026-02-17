# Testplan Code Annotatie Tool

## Overzicht
Dit testplan dekt alle kernfunctionaliteit van de Code Annotatie Tool, een VS Code extensie die code uitleg genereert met interactieve annotaties.

---

## 1. VS Code Extensie Integratie

### Test 1.1: Extensie Activeren
**Stappen:**
1. Open VS Code met de extensie geïnstalleerd
2. Open een code bestand (bijv. TypeScript, Python)
3. Selecteer enkele regels code
4. Voer het commando "Explain Code" uit via Command Palette

**Verwacht Resultaat:**
- Commando verschijnt in de Command Palette
- Extensie reageert zonder errors
- Webview paneel opent

### Test 1.2: Geen Code Geselecteerd
**Stappen:**
1. Open een code bestand
2. Zorg dat er geen tekst geselecteerd is
3. Voer het commando "Explain Code" uit

**Verwacht Resultaat:**
- Melding verschijnt: "Please select some code first!"
- Geen webview wordt geopend

---

## 2. Webview Interface

### Test 2.1: Webview Start Correct
**Stappen:**
1. Selecteer code en voer "Explain Code" uit
2. Bekijk het geopende webview paneel

**Verwacht Resultaat:**
- Webview laadt met donker thema
- Header toont "Code Slideshow"
- Stap indicator toont "STEP 1 OF 1"
- Code block verschijnt met syntax highlighting
- Annotatie box(en) zijn zichtbaar met pijlen

### Test 2.2: Interface Elementen Zichtbaar
**Stappen:**
1. Open een webview met uitleg

**Verwacht Resultaat:**
- Navigatie knoppen (Previous/Next) aanwezig
- Taal selector dropdown aanwezig
- "Remove Slide" knop aanwezig
- Code blocks met gekleurde randen zichtbaar
- Annotatie boxes met matching kleuren zichtbaar
- Pijlen verbinden code met uitleg

---

## 3. Code Highlight en Syntax

### Test 3.1: Syntax Highlighting
**Stappen:**
1. Genereer uitleg voor TypeScript code
2. Bekijk de code block weergave

**Verwacht Resultaat:**
- Code heeft correcte syntax kleuren
- Code gebruikt VS Code Dark+ thema
- Code is leesbaar met goede contrast

### Test 3.2: Taal Selectie Wijzigen
**Stappen:**
1. Open een slide met code
2. Klik op de taal dropdown (standaard TypeScript/JS)
3. Selecteer een andere taal (bijv. Python)

**Verwacht Resultaat:**
- Dropdown toont beschikbare talen: TypeScript/JS, Python, C#, C++, Java, Rust
- Code highlighting past zich aan naar geselecteerde taal
- Wijziging is direct zichtbaar

### Test 3.3: Taal Per Slide
**Stappen:**
1. Maak meerdere slides (verschillende code selecties)
2. Stel verschillende talen in voor slide 1 en slide 2
3. Navigeer tussen slides

**Verwacht Resultaat:**
- Elke slide behoudt zijn eigen taal instelling
- Taal selector toont correcte taal voor huidige slide
- Geen interferentie tussen slides

---

## 4. Annotatie Boxes

### Test 4.1: Boxes Zijn Sleepbaar
**Stappen:**
1. Open een uitleg met annotatie boxes
2. Klik en sleep een annotatie box
3. Laat de box los op een nieuwe positie

**Verwacht Resultaat:**
- Box volgt de muis tijdens slepen
- Cursor verandert naar "grab" bij hover, "grabbing" tijdens slepen
- Box blijft op nieuwe positie na loslaten
- Pijl blijft verbonden en past zich aan

### Test 4.2: Box Tekst Wrapping
**Stappen:**
1. Bekijk boxes met verschillende tekstlengtes
2. Zoek een box met lange tekst

**Verwacht Resultaat:**
- Tekst breekt netjes over meerdere regels
- Box blijft binnen max-width van 250px
- Geen tekst valt buiten de box
- Box is goed leesbaar

### Test 4.3: Meerdere Boxes
**Stappen:**
1. Genereer uitleg met meerdere code/uitleg paren
2. Bekijk alle boxes

**Verwacht Resultaat:**
- Elke box heeft unieke kleur (cyclus door kleurenpalet)
- Boxes overlappen niet standaard
- Alle boxes zijn sleepbaar onafhankelijk

---

## 5. Pijlen en Verbindingen

### Test 5.1: Pijlen Verbinden Code en Uitleg
**Stappen:**
1. Open een uitleg slide
2. Bekijk de pijlen tussen code blocks en boxes

**Verwacht Resultaat:**
- Elke code block heeft een pijl naar bijbehorende box
- Pijl kleur matched met code border en box kleur
- Pijlen zijn smooth curves (niet rechte lijnen)

### Test 5.2: Pijlen Updaten Bij Slepen
**Stappen:**
1. Sleep een annotatie box naar verschillende posities
2. Let op de pijl tijdens en na het slepen

**Verwacht Resultaat:**
- Pijl blijft verbonden tijdens slepen
- Pijl past zich real-time aan tijdens beweging
- Pijl toont correcte eindpositie na loslaten

---

## 6. Multi-Slide Navigatie

### Test 6.1: Nieuwe Slide Toevoegen
**Stappen:**
1. Open een eerste uitleg (slide 1)
2. Ga terug naar VS Code
3. Selecteer andere code en voer "Explain Code" uit

**Verwacht Resultaat:**
- Nieuwe slide wordt toegevoegd (slide 2)
- Automatically switches to nieuwe slide
- Indicator toont "STEP 2 OF 2"
- Webview blijft open (niet nieuw venster)

### Test 6.2: Navigeren Tussen Slides
**Stappen:**
1. Maak 3 slides
2. Gebruik Next/Previous knoppen om te navigeren

**Verwacht Resultaat:**
- "Previous" knop disabled op slide 1
- "Next" knop disabled op laatste slide
- Content wisselt smooth met fade animatie
- Stap indicator update correct
- Elke slide toont zijn eigen code en uitleg

### Test 6.3: Slide Verwijderen
**Stappen:**
1. Maak 3 slides
2. Ga naar slide 2
3. Klik "Remove Slide"

**Verwacht Resultaat:**
- Huidige slide wordt verwijderd
- Automatisch naar slide 2 (wat eerst slide 3 was) of laatste beschikbare
- Totaal aantal slides daalt met 1
- Geen errors

### Test 6.4: Laatste Slide Verwijderen
**Stappen:**
1. Maak 1 slide
2. Klik "Remove Slide"

**Verwacht Resultaat:**
- Slide wordt verwijderd
- Melding verschijnt: "No explanations active"
- Instructie getoond om nieuwe uitleg te maken

---

## 7. Positie Persistentie

### Test 7.1: Posities Opslaan
**Stappen:**
1. Open een slide en sleep boxes naar custom posities
2. Wissel naar andere slide
3. Keer terug naar eerste slide

**Verwacht Resultaat:**
- Boxes staan op opgeslagen posities
- Geen reset naar standaard posities
- Pijlen verbonden correct

### Test 7.2: Posities Per Slide Onafhankelijk
**Stappen:**
1. Maak 2 slides
2. Sleep boxes op slide 1 naar positie A
3. Wissel naar slide 2 en sleep boxes naar positie B
4. Wissel terug naar slide 1

**Verwacht Resultaat:**
- Slide 1 boxes op positie A
- Slide 2 boxes op positie B
- Geen interferentie tussen slides

### Test 7.3: Persistentie Over Sessies
**Stappen:**
1. Sleep boxes naar custom posities
2. Sluit webview paneel
3. Open nieuwe uitleg (nieuwe webview)
4. Navigeer naar eerder gemaakte slides

**Verwacht Resultaat:**
- Box posities blijven behouden via localStorage
- Alle slides behouden hun aangepaste layout

---

## 8. Explanation Queue (Wachtrij)

### Test 8.1: Meerdere Verzoeken Snel Achter Elkaar
**Stappen:**
1. Selecteer code fragment 1 en run "Explain Code"
2. Direct daarna selecteer code fragment 2 en run "Explain Code"
3. Direct daarna selecteer code fragment 3 en run "Explain Code"

**Verwacht Resultaat:**
- Alle verzoeken worden toegevoegd aan queue
- Progress notificatie toont: "Generating explanation 1/3", "2/3", "3/3"
- Alle 3 slides worden gecreerd in volgorde
- Geen verzoeken gaan verloren

### Test 8.2: Queue Processing Niet Parallel
**Stappen:**
1. Queue meerdere verzoeken zoals test 8.1
2. Bekijk de verwerking

**Verwacht Resultaat:**
- Verzoeken worden sequentieel verwerkt (niet parallel)
- Progress indicator accuraat
- Webview update smooth tussen slides

---

## 9. Edge Cases en Fouten

### Test 9.1: Zeer Lange Code Block
**Stappen:**
1. Selecteer 50+ regels code
2. Genereer uitleg

**Verwacht Resultaat:**
- Code block toont zonder layout problemen
- Scrollbar verschijnt indien nodig
- Performance blijft acceptabel

### Test 9.2: Zeer Lange Uitleg Tekst
**Stappen:**
1. Genereer uitleg met zeer lange tekst in een box

**Verwacht Resultaat:**
- Box breekt tekst over meerdere regels
- Box maxwidth wordt gerespecteerd
- Box blijft sleepbaar en bruikbaar

### Test 9.3: Meerdere Code Blocks per Slide
**Stappen:**
1. Genereer uitleg met meerdere code/uitleg paren (als markdown dit ondersteunt)

**Verwacht Resultaat:**
- Alle code blocks getoond met borders
- Alle boxes getoond met correcte kleuren
- Alle pijlen correct verbonden
- Kleuren roteren door palet

### Test 9.4: Browser Console Errors
**Stappen:**
1. Doorloop verschillende tests
2. Check browser console (in webview developer tools)

**Verwacht Resultaat:**
- Geen JavaScript errors
- Geen waarschuwingen over performance
- Geen memory leaks na meerdere slides

### Test 9.5: Snel Slide Wisselen
**Stappen:**
1. Maak 5 slides
2. Klik snel meerdere keren op Next/Previous

**Verwacht Resultaat:**
- Interface blijft responsive
- Geen race conditions
- Juiste slide wordt getoond
- Animaties werken smooth

---

## 10. Performance

### Test 10.1: Veel Slides
**Stappen:**
1. Maak 10+ slides
2. Navigeer door alle slides
3. Test verschillende functionaliteit

**Verwacht Resultaat:**
- Navigatie blijft smooth
- Geen vertraging bij laden
- Memory gebruik acceptabel
- Geen lag bij slepen boxes

### Test 10.2: Large Workspace
**Stappen:**
1. Open VS Code met groot project (1000+ bestanden)
2. Test extensie functionaliteit

**Verwacht Resultaat:**
- Extensie laadt zonder vertraging
- Command blijft responsive
- Webview performance niet beïnvloed

---

## 11. Browser Compatibiliteit

### Test 11.1: VS Code Webview Rendering
**Stappen:**
1. Test op verschillende OS (Windows, Mac, Linux indien mogelijk)

**Verwacht Resultaat:**
- Interface ziet er consistent uit
- Alle features werken op elk platform
- Geen platform-specifieke bugs

---

## Samenvatting

Dit testplan dekt:
- ✅ Extensie activatie en commando's
- ✅ Webview interface en layout
- ✅ Syntax highlighting en taal selectie
- ✅ Draggable boxes en interactiviteit
- ✅ Pijl rendering en updates
- ✅ Multi-slide navigatie
- ✅ Persistentie van posities
- ✅ Queue functionaliteit
- ✅ Edge cases en errors
- ✅ Performance scenario's
- ✅ Platform compatibiliteit

**Opmerking voor testers:** Focus op kernfunctionaliteit eerst (secties 1-6), daarna edge cases (7-11). Test systematisch en noteer alle afwijkingen van verwacht gedrag.
