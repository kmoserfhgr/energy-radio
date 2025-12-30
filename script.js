// --------------------- Intro Animation -----------------
window.addEventListener("load", () => {
  const intro = document.getElementById("energy-intro");
  if (!intro) return;

  const rays = intro.querySelectorAll(".energy-rays span");

  const radius = 24;          // abstand vom logo (rem)
  const lengths = [6, 8, 11];   // kurz / mittel / lang (rem)

  rays.forEach((ray, i) => {
    const deg = i * 30;
    ray.style.height = `${lengths[i % lengths.length]}rem`;

    ray.animate(
      [
        {
          opacity: 0,
          transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(${radius}rem) scaleY(0)`
        },
        {
          opacity: 1,
          transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(${radius}rem) scaleY(1)`
        }
      ],
      {
        duration: 260,
        delay: i * 90,
        easing: "cubic-bezier(0.2, 0.9, 0.2, 1)",
        fill: "forwards"
      }
    );
  });

  setTimeout(() => {
    intro.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" })
      .onfinish = () => intro.remove();
  }, rays.length * 90 + 600);
});




// --------------------- DATEN -----------------
let audio = null;
let podiumAnimationTimeout = null;
let fixedPodiumHeight = null;

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

  // Mode aus dem Radio-Button holen
  const modeInput = document.querySelector('input[name="mode"]:checked');
  const mode = modeInput ? modeInput.value : "songs";

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (audio) audio.pause();

    if (mode === "songs") {
      document.querySelector(".podium-box-1 .mode-title").innerText = data.top_titles[0].title;
      document.querySelector(".podium-box-1 .artist-name").innerText = data.top_titles[0].artist;
      document.querySelector(".podium-box-1 .plays").innerText = `${data.top_titles[0].count ?? ""} Abspielungen`;
      audio = new Audio(data.top_titles[0].audiourl);
      audio.play();

      document.querySelector(".podium-box-2 .mode-title").innerText = data.top_titles[1].title;
      document.querySelector(".podium-box-2 .artist-name").innerText = data.top_titles[1].artist;
      document.querySelector(".podium-box-2 .plays").innerText = `${data.top_titles[1].count ?? ""} Abspielungen`;

      document.querySelector(".podium-box-3 .mode-title").innerText = data.top_titles[2].title;
      document.querySelector(".podium-box-3 .artist-name").innerText = data.top_titles[2].artist;
      document.querySelector(".podium-box-3 .plays").innerText = `${data.top_titles[2].count ?? ""} Abspielungen`;

    } else if (mode === "artist") {
      document.querySelector(".podium-box-1 .mode-title").innerText = data.top_artists[0].artist;
      document.querySelector(".podium-box-1 .artist-name").innerText = "";
      document.querySelector(".podium-box-1 .plays").innerText = `${data.top_artists[0].count ?? ""} Abspielungen`;

      document.querySelector(".podium-box-2 .mode-title").innerText = data.top_artists[1].artist;
      document.querySelector(".podium-box-2 .artist-name").innerText = "";
      document.querySelector(".podium-box-2 .plays").innerText = `${data.top_artists[1].count ?? ""} Abspielungen`;

      document.querySelector(".podium-box-3 .mode-title").innerText = data.top_artists[2].artist;
      document.querySelector(".podium-box-3 .artist-name").innerText = "";
      document.querySelector(".podium-box-3 .plays").innerText = `${data.top_artists[2].count ?? ""} Abspielungen`;
    }

  } catch (error) {
    console.error(error);
  }
}

// Wrapper für bestehende Aufrufe
const getByDate  = (date) => getBy("date",  date);
const getByWeek  = (date) => getBy("week",  date);
const getByMonth = (date) => getBy("month", date);

// --------------- AUSWAHL DER MODI ----------------
document.addEventListener("DOMContentLoaded", () => {

  let mode = "songs";
  let timespan = "des_tages";
  let date = new Date().toISOString().split('T')[0];

  const modeInputs = document.querySelectorAll('input[name="mode"]');
  const timespanInputs = document.querySelectorAll('input[name="timespan"]');
  const datePicker = document.getElementById('datepicker');

  document.getElementById("songs").checked = true;
  document.getElementById("des_tages").checked = true;
  datePicker.value = date;

  modeInputs.forEach(input => {
    input.addEventListener("change", e => {
      mode = e.target.id;
      handleSelectionChange();
    });
  });

  timespanInputs.forEach(input => {
    input.addEventListener("change", e => {
      timespan = e.target.id;
      handleSelectionChange();
    });
  });

  datePicker.addEventListener("change", e => {
    date = e.target.value;
    handleSelectionChange();
  });

  function handleSelectionChange() {
    console.log("Aktuelle Auswahl:", mode, timespan, date);

    const video = document.getElementById("bg-video");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }

    if (timespan === "des_tages") {
      getByDate(date);
    } else if (timespan === "der_woche") {
      getByWeek(date);
    } else if (timespan === "des_monats") {
      getByMonth(date);
    }

    resetPodium();
    const podium = document.querySelector(".podium");

    if (!fixedPodiumHeight && podium) {
      fixedPodiumHeight = podium.getBoundingClientRect().height;
      podium.style.height = fixedPodiumHeight + "px";
    }

    if (podiumAnimationTimeout) {
    clearTimeout(podiumAnimationTimeout);
    }

    podiumAnimationTimeout = setTimeout(() => {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      animatePodiumJS();
    });
  } else {
    animatePodiumJS();
  }
}, 100);
  }

  // --------------- Animation des Podiums ----------------
  function getOffscreenOffset(el) {
  const rect = el.getBoundingClientRect();
  return window.innerHeight - rect.top + 20; // +20px Sicherheit
}
function animatePodiumJS() {
    const sequence = [
      document.querySelector(".podium-box-3"),
      document.querySelector(".podium-box-2"),
      document.querySelector(".podium-box-1"),
    ];

    sequence.forEach((el, index) => {
  if (!el) return;

  const animation = el.animate(
    [
      { transform: `translateY(${getOffscreenOffset(el)}px)`, opacity: 0 },
      { transform: "translateY(-12px)", opacity: 1, offset: 0.75 },
      { transform: "translateY(0)", opacity: 1 }
    ],
    {
      duration: 1200,
      delay: [0, 300, 600][index],
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards"
    }
  );


  // Video startet bei Ende Animation Podest 1
if (index === 2) {
  const video = document.getElementById("bg-video");

  if (video) {
    setTimeout(() => {
      if (video.paused) {
        video.play();
      }
    }, 850);
  }
}
});
}


  function resetPodium() {
    document.querySelectorAll(".podium article").forEach(el => {
      el.getAnimations().forEach(anim => anim.cancel());
      el.style.opacity = 0;
      el.style.transform = `translateY(${getOffscreenOffset(el)}px)`;
    });
  }

  handleSelectionChange();
});