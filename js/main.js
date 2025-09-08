const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn${id}`)
        clickBtn.classList.add("active");
        displayLevelWord(data.data);
    })
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full  space-y-6 py-10 ">
                <img class="mx-auto" src="assets/error.svg" alt="" srcset="">
                <p class="text-[24px] font-bangla text-gray-300">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-[35px] font-bangla">নেক্সট Lesson এ যান</h2>
                </div>
    `;
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
   <div class="bg-white text-center shadow-sm rounded-xl space-y-3 py-10 px-5">
                <h1 class="text-[32px] font-bold text-black">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
                <p class="text-[20px] text-black">Meaning /Pronounciation</p>
                <h2 class="text-[32px] font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}</h2>
                <div class="flex justify-between pt-6">
                    <img class="w-[56px]" src="assets/grp1.svg" alt="" srcset="">
                    <img class="w-[56px]" src="assets/grp2.svg" alt="" srcset="">
                </div>
            </div>
    `;
    wordContainer.appendChild(card);
  });
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    console.log(lessons);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary"><i class="fa-solid fa-brands fa-leanpub"></i>Lesson - ${lesson.level_no} </button>
    `;

    levelContainer.append(btnDiv);
  }
};

loadLessons();
