// --------------------- Intro Animation -----------------
document.body.classList.add("intro-active"); /* wartet mit Podium Animation bis Intro fertig */

window.addEventListener("load", () => {
  const intro = document.getElementById("energy-intro");

  /* falls kein Intro besteht, wird alles gestartet */
  if (!intro) { 
    document.body.classList.remove("intro-active");
    startApp();
    return;
  }

  /* Strahlen rund um Logo */
  const rays = intro.querySelectorAll(".energy-rays span");
  const lengths = [6, 8, 11];
  const radius = 24;
  const gap = 0.2;

  /* Strahl einzeln animieren, da unterschiedlich */
  rays.forEach((ray, i) => {
    const deg = i * (360 / rays.length);
    const length = lengths[i % lengths.length];

    ray.style.height = `${length}rem`;

    ray.animate(
      [
        {
          opacity: 0,
          transform: `
            translate(-50%, -50%)
            rotate(${deg}deg)
            translateY(${radius + gap}rem)
            scaleY(0)
          `
        },
        {
          opacity: 1,
          transform: `
            translate(-50%, -50%)
            rotate(${deg}deg)
            translateY(${radius + gap}rem)
            scaleY(1)
          `
        }
      ],
      {
        duration: 420,
        delay: i * 55,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards"
      }
    );
  });

  /* Nach Abschluss der Animation wird Intro ausgeblendet */
  setTimeout(() => {
    intro.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 400, fill: "forwards" }
    ).onfinish = () => {
      intro.remove();
      document.body.classList.remove("intro-active");
      startApp();
    };
  }, rays.length * 90 + 600);
});


// --------------------- DATEN -----------------
let audio = null;
let podiumAnimationTimeout = null;
let fixedPodiumHeight = null;
let podiumRunId = 0;


// --------------------- API -----------------

/* Holt die Daten je nach zeitraum (Tag, Woche, Monat)*/
async function getBy(period, date) {
  let url;

  if (period === "date") {
    url = `https://energy-radio.kaya-moser.ch/backend/api/getByDate.php?date=${date}`;
  } else if (period === "week") {
    url = `https://energy-radio.kaya-moser.ch/backend/api/getByWeek.php?date=${date}`;
  } else if (period === "month") {
    url = `https://energy-radio.kaya-moser.ch/backend/api/getByMonth.php?date=${date}`;
  } else {
    console.error("Unbekannte Periode:", period);
    return;
  }
  /*aktueller Modus also Songs oder Artist*/
  const modeInput = document.querySelector('input[name="mode"]:checked');
  const mode = modeInput ? modeInput.value : "songs";

  try {
    const response = await fetch(url);
    const data = await response.json();

  /* laufender Song wird gestoppt */
    if (audio) {
      audio.pause();
      audio = null;
    }
    /* Stern Animation Podest 1 zurücksetzen */
    document
      .querySelector(".podium-box-1")
      ?.classList.remove("is-playing");


    /* Modus "Song"*/
    if (mode === "songs") {
      /* Nur für Platz 1*/
      document.querySelector(".podium-box-1 .mode-title").innerText = data.top_titles[0].title;
      document.querySelector(".podium-box-1 .artist-name").innerText = data.top_titles[0].artist;
      document.querySelector(".podium-box-1 .plays").innerText =
        `${data.top_titles[0].count ?? ""} Abspielungen`;

      /*Song von Podest 1 wird abgespielt*/
      audio = new Audio(data.top_titles[0].audiourl);
      audio.play();

      /*Stern von Platz 1 wird animiert*/
      document
        .querySelector(".podium-box-1")
        ?.classList.add("is-playing");

      /*Podest 2*/
      document.querySelector(".podium-box-2 .mode-title").innerText = data.top_titles[1].title;
      document.querySelector(".podium-box-2 .artist-name").innerText = data.top_titles[1].artist;
      document.querySelector(".podium-box-2 .plays").innerText =
        `${data.top_titles[1].count ?? ""} Abspielungen`;

      /*Podest 3*/
      document.querySelector(".podium-box-3 .mode-title").innerText = data.top_titles[2].title;
      document.querySelector(".podium-box-3 .artist-name").innerText = data.top_titles[2].artist;
      document.querySelector(".podium-box-3 .plays").innerText =
        `${data.top_titles[2].count ?? ""} Abspielungen`;
    }

    /* Modus "Artist"*/
    if (mode === "artist") {
      document.querySelector(".podium-box-1 .mode-title").innerText = data.top_artists[0].artist;
      document.querySelector(".podium-box-1 .artist-name").innerText = "";
      document.querySelector(".podium-box-1 .plays").innerText =
        `${data.top_artists[0].count ?? ""} Abspielungen`;

      document.querySelector(".podium-box-2 .mode-title").innerText = data.top_artists[1].artist;
      document.querySelector(".podium-box-2 .artist-name").innerText = "";
      document.querySelector(".podium-box-2 .plays").innerText =
        `${data.top_artists[1].count ?? ""} Abspielungen`;

      document.querySelector(".podium-box-3 .mode-title").innerText = data.top_artists[2].artist;
      document.querySelector(".podium-box-3 .artist-name").innerText = "";
      document.querySelector(".podium-box-3 .plays").innerText =
        `${data.top_artists[2].count ?? ""} Abspielungen`;
    }

  } catch (error) {
    console.error(error);
  }
}

const getByDate  = date => getBy("date", date);
const getByWeek  = date => getBy("week", date);
const getByMonth = date => getBy("month", date);


// -------------Daten, Animation, Audio und Video zusammenführen  -----------------
function startApp() {

  /* Podest wird ins Blickfeld geschoben*/
  const podium = document.querySelector(".podium");
  if (podium) podium.scrollIntoView({ block: "end" });

  /* Initiale Zustände*/
  let mode = "songs";
  let timespan = "des_tages";
  let date = new Date().toISOString().split("T")[0];

  /* UI-Elemente*/
  const modeInputs = document.querySelectorAll('input[name="mode"]');
  const timespanInputs = document.querySelectorAll('input[name="timespan"]');
  const datePicker = document.getElementById("datepicker");

  /*Default-UI setzen*/
  document.getElementById("songs").checked = true;
  document.getElementById("des_tages").checked = true;
  datePicker.value = date;

  /* Modus Wechsel ob Song oder Artist*/
  modeInputs.forEach(input => {
    input.addEventListener("change", e => {
      mode = e.target.id;
      handleSelectionChange();
    });
  });
  /* Zeitraum Wechsel*/
  timespanInputs.forEach(input => {
    input.addEventListener("change", e => {
      timespan = e.target.id;
      handleSelectionChange();
    });
  });
  /* Datum Wechsel*/
  datePicker.addEventListener("change", e => {
    date = e.target.value;
    handleSelectionChange();
  });

  /*Reaktion auf JEDE Änderung*/
  function handleSelectionChange() {
    podiumRunId++; /*sobald neuer Durchlauf, werden alte Timeouts ungültig*/
    const currentRun = podiumRunId;

    /*Video stoppen und zurücksetzen*/
    const video = document.getElementById("bg-video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    /*Stern Animaiton zurücksetzen*/
    document
      .querySelector(".podium-box-1")
      ?.classList.remove("is-playing");

    /*Daten neu laden*/
    if (timespan === "des_tages") getByDate(date);
    if (timespan === "der_woche") getByWeek(date);
    if (timespan === "des_monats") getByMonth(date);

    resetPodium(); /*Podest wird visuell zurückgesetzt*/

    if (podiumAnimationTimeout) clearTimeout(podiumAnimationTimeout); /*laufende Animations-Timeouts abbrechen*/

    /*neue Podest-Animation starten*/
    podiumAnimationTimeout = setTimeout(() => { 
      animatePodiumJS(currentRun);
    }, 100);
  }

  function getOffscreenOffset() {
    return window.innerHeight + 80;
  }

// ------------- Podest Animation -------------
  function animatePodiumJS(runId) {
    const sequence = [
      document.querySelector(".podium-box-3"),
      document.querySelector(".podium-box-2"),
      document.querySelector(".podium-box-1"),
    ];

    sequence.forEach((el, index) => {
      if (!el) return;

    /*neue Podest-Animation starten*/
      el.animate(
        [
          { transform: `translateY(${getOffscreenOffset()}px)`, opacity: 0 },
          { transform: "translateY(-8px)", opacity: 1, offset: 0.78 },
          { transform: "translateY(0)", opacity: 1 }
        ],
        {
          duration: 1700,
          delay: [100, 900, 1600][index],
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards"
        }
      );
     
     /*Video wird erst gestarten, wenn Animation Podest 1 fertig ist*/
      if (index === 2) {
        const video = document.getElementById("bg-video");
        if (video) {
          setTimeout(() => {
            if (runId === podiumRunId && video.paused) {
              video.play();
            }
          }, 2500);
        }
      }
    });
  }
  /*Podest wird zurückgesetzt*/
  function resetPodium() {
    document.querySelectorAll(".podium article").forEach(el => {
      el.getAnimations().forEach(anim => anim.cancel());
      el.style.opacity = 0;
      el.style.transform = `translateY(${getOffscreenOffset()}px)`;
    });
  }

  handleSelectionChange();
}
