# E2E Testy – Kontakty napříč doménami

## 🔍 Popis

Tento projekt slouží jako ukázka testování tvorby kontaktu v aplikaci, která běží na více jazykových a doménových verzích:

- `staging.fakturaonline.cz`
- `staging.invoiceonline.com`
- `staging.fakturaonline.sk`

Cílem bylo vytvořit přenositelný, udržitelný a doménově oddělený Cypress test pro vytvoření kontaktu, který reflektuje různé specifikace formulářů napříč mutacemi.

---

## 🧱 Struktura projektu

- `cypress/fixtures/` – Testovací data specifická pro každou doménu (`testData.cz.json`, `testData.sk.json`, `testData.com.json`)
- `cypress/e2e/` – Hlavní E2E test: `createContact.cy.ts`
- `cypress/pages/` – Page objekty pro přístup k elementům: `ContactsPage.ts`, `LoginPage.ts`
- `cypress/constants/` – Statické typy a URL adresy (`types.ts`, `urls.ts`)
- `cypress.config.ts` – Konfigurace testů, výběr `DOMAIN` a `ENV` pomocí `process.env`

---

## ▶️ Spuštění testů

```bash
# CZ varianta
DOMAIN=cz ENV=stag yarn cypress open

# SK varianta
DOMAIN=sk ENV=stag yarn cypress open

# EN varianta
DOMAIN=com ENV=stag yarn cypress open
```

> `DOMAIN` určuje jazykovou/doménovou variantu  
> `ENV` určuje prostředí – např. `stag` nebo `prod`

---

## 🛠️ Aktuální omezení

- ❌ **Testy pro EN a SK domény nejsou v tuto chvíli spolehlivě spustitelné.**  
  Důvodem je nekonzistentní struktura HTML elementů ve formuláři – například ve slovenské mutaci je pole „Meno“ označeno jako `input[type="password"]`, což znemožňuje výběr správného inputu přes standardní selektory.

- ✅ **Doporučení pro opravu:**  
  Implementovat do všech jazykových verzí formuláře unikátní a konzistentní `data-testid` selektory. To umožní stabilní výběr polí bez ohledu na jazyk nebo vizuální text.

---

## 🧠 Možnosti rozšíření testů

- Ověření validace formuláře (např. nevalidní e-mail, prázdná povinná pole)
- Testování editace již existujícího kontaktu
- Mazání kontaktů
- Filtrování, hledání a řazení kontaktů
- Responzivita – testování na různých zařízeních (mobil, tablet)

---

## 📦 CI a flaky testy

- Pro běh v CI doporučujeme využít:
  - **headless režim**
  - **automatické retry** na flaky scénáře
  - **snapshot testy** pro klíčové obrazovky

- Stabilitu síťové vrstvy zajišťuje použití `cy.intercept()` a `cy.wait()` pro konkrétní requesty – to je již implementováno při ukládání kontaktu.

---

## ✅ Shrnutí

Tento projekt ukazuje, jak přistupovat ke správě testovacích scénářů, které běží napříč vícejazyčnými verzemi aplikace, a jak lze flexibilně přistupovat k rozdílné struktuře formulářů pomocí Cypressu, page object patternu a fixtures. Přestože některé varianty zatím nejsou plně funkční kvůli omezením na frontend straně, základní architektura testů je připravena na rozšíření.
