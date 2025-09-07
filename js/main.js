const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
   <div class="bg-white text-center shadow-sm rounded-xl space-y-3 py-10 px-5">
                <h1 class="text-[32px] font-bold text-black">${word.word}</h1>
                <p class="text-[20px] text-black">Meaning /Pronounciation</p>
                <h2 class="text-[32px] font-bangla">${word.meaning}</h2>
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
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-brands fa-leanpub"></i>Lesson - ${lesson.level_no} </button>
    `;

    levelContainer.append(btnDiv);
  }
};

loadLessons();
