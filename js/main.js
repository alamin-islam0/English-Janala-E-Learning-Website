const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
                            <div>
                                <h2 class="text-[36px] pb-2">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation} )</h2>
                            </div>
                            <div class="space-y-3">
                                <h2 class="font-bold text-[24px]">Meaning</h2>
                                <h2 class=" text-[24px] font-bangla">${word.meaning}</h2>
                            </div>
                            <div class="space-y-3">
                                <h2 class="font-bold">Example</h2>
                                <h2 class="">${word.sentence}</h2>
                            </div>
                            <div class="space-y-3">
                                <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
                                <div class=" space-x-2 flex gap-2.5">
                                    <button class="bg-[#EDF7FF] border-[#D7E4EF] text-black btn font-normal btn-active btn-primary">${word.synonyms[0]}</button>
                                    <button class="bg-[#EDF7FF] border-[#D7E4EF] text-black btn font-normal btn-active btn-primary">${word.synonyms[1]}</button>
                                    <button class="bg-[#EDF7FF] border-[#D7E4EF] text-black font-normal btn btn-active btn-primary">${word.synonyms[2]}</button>

                                </div>

                                <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
                    </div>
    `;
  document.getElementById("my_modal_5").showModal();
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
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
   <div class="bg-white text-center shadow-sm rounded-xl space-y-3 py-10 px-5">
                <h1 class="text-[32px] font-bold text-black">${
                  word.word ? word.word : "শব্দ পাওয়া যায়নি"
                }</h1>
                <p class="text-[20px] text-black">Meaning /Pronounciation</p>
                <h2 class="text-[32px] font-bangla">${
                  word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
                } / ${
      word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"
    }</h2>
                <div class="flex justify-between pt-6">
                    <img onclick="loadWordDetail(${
                      word.id
                    })" class="hover:bg-gray-300 hover:rounded-[8px] w-[56px]" src="assets/grp1.svg" alt="" srcset="">
                    <img class="hover:bg-gray-300 hover:rounded-[8px] w-[56px]" src="assets/grp2.svg" alt="" srcset="">
                </div>
            </div>
    `;
    wordContainer.appendChild(card);
  });
  manageSpinner(false);
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
