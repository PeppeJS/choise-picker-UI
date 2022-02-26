/** SPIEGAZIONE DI SVILUPPO E LOGOCA APPLICATA */
// 1) DEVO ANDARE A SCRIVERE DENTRO IL TEXTAREA, QUINDI MI OCCORE PRENDERE IL "focus" PER
// SCRIVERCI AL SUO INTERNO
// 2) DEVO CREARE UN EVENTO DI "listener-keyup" E VADO A CREARMI ALL'INTERNO UNA "function"
// E VADO A PRENDERMI "event" VALORE DI RITORNO DALLA "function"
// 3) CREO LA "function" CHE CREERA' DEI TAGS TRAMITE UN "array" SOTTO IL TEXTAREA
// COME "span" (AGGIUNGERE UN CONTROLLO PER EVITARE GLI SPAZI) E VERRANO POI AGGIUNTI
// A "html" DENTRO IL <div id="container-choice"> (INIZIALMENTE LO PRENDIAMO VUOTO)
// 4) CONTROLLIAMO SE ABBIAMO PREMUTO "enter" E DOPO UN SECONDO PULIAMO "input" E
// CREIAMO UNA "function" PER LA GESTIONE DEL RANDOM

const areaText = document.getElementById('textarea');
const containerSpan = document.getElementById('container-choice');

areaText.focus();

areaText.addEventListener('keyup', function (event) {
  createTagsSpan(event.target.value);

  if (event.key === 'Enter') {
    setTimeout(() => {
      event.target.value = '';
    }, 10);

    randomSelect();
  }
});

function createTagsSpan(params) {
  const tags = params
    .split(',')
    .filter((value) => value.trim() !== '')
    .map((value) => value.trim());

  containerSpan.innerHTML = '';

  tags.forEach((element) => {
    const createSpan = document.createElement('span');
    createSpan.classList.add('choices');
    createSpan.innerText = element;
    containerSpan.appendChild(createSpan);
  });
}

/** RANDOM LOGIC */

// QUESTA FUNZIONE CREA UNA SCELTA RANDOMICA
function randomSelect() {
  // IL NUMERO VOLTE CHE STA ANDANDO AD EVIDENZIARE OGNUNO DI ESSI PRIMA DI FERMARSI
  const times = 30;
  // STIAMO ANDANDO A SETTARE (lo prendiamo) UN INTERVALLO PERCHE ESSO SI DEVE RIPETERE
  // OGNI 100 MILL
  const interval = setInterval(() => {
    // VOGLIAMO UNA SCELTA CASUALE E CI ANDIAMO A CREARE UNA "function" E METTERLA DENTRO
    // UNA VARIABILE
    const randomTag = pickRandomTag();
    // CONTROLLO SE randomTag E' DEFINITO
    if (randomTag !== undefined) {
      // PASSIAMO "randomTag" DENTRO LA "function highlightTag" PER EVIDENZIARLO
      highlightTag(randomTag);
      // IMPOSTO UN TEMPO (quando viene passato sopra per essere evidenziato)
      // E PASSIAMO "randomTag" DENTRO LA "function unHighlightTag"
      setTimeout(() => {
        unHighlightTag(randomTag);
      }, 100);
    }
  }, 100);

  /** QUESTA PARTE SERVE AD INTERROMPERE L'ESECUZIONE DELLA SCELTA DOPO 3000 MILL
   * ED A MOSTRARE/EVIDENZIARE LA SCELTA (3000 MILL)
   */
  // DEVO SETTARE UN TIMEOUT PRENDENDO IL "times" MOLTIPLICANDO * 100
  setTimeout(() => {
    // VADO A PULIRE NOSTRO INTERVALLO
    clearInterval(interval);
    // IMPOSTO UN "setTimeout" IN 100 MILL
    setTimeout(() => {
      // ANDIAMO A PRENDERE IL NOSTRO "randomTag"
      const randomTag = pickRandomTag();
      // ANDIAMO AD EVIDENZIARE IL NOSTRO "randomTag"
      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}
// CREIAMO UNA FUNZIONE pickRandomTag PER LA SCELTA CASUALE
function pickRandomTag() {
  // ANDIAMO A PRENDERCI TUTTI GLI "span/tags"
  const tags = document.querySelectorAll('.choices');
  // QUESTI "span/tags" SONO DEI "nodelist" E SONO SIMILI AD UN "array" CON UN INDEX
  // QUINDI L'INDEX STA ANDANDO AD ESSERE RANDOM, QUINDI ANDIAMO A MOLTIPLICARE PER LA
  // LUNGHEZZA DEL "span/tags"
  return tags[Math.floor(Math.random() * tags.length)];
}
// CREO UNA FUNZIONE "highlightTag", CHE STA ANDANDO A PRENDERE IN UNO SPECIFICO TAG
// DOVE AGGIUNGO LA CLASSE
function highlightTag(params) {
  params.classList.add('highlight');
}
// CREO UNA FUNZIONE "unHighlightTag"  CHE STA ANDANDO A PRENDERE IN UNO SPECIFICO TAG
// DOVE RIMUOVO LA CLASSE
function unHighlightTag(params) {
  params.classList.remove('highlight');
}
