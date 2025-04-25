export const View = (() => {
  const goalListEL = document.querySelector(".goal-list");
  const goalInputEL = document.querySelector("#goal");
  const categorySelectEL = document.querySelector("#category");
  const repetitionInputEL = document.querySelector("#repetitions");
  const addBtnEL = document.querySelector("#goal-add-btn")
  
  let markCb = () => {};
  const onMarkAchieved = cb => markCb = cb;

  goalListEL.addEventListener("click", e => {
    if (e.target.matches(".goal-btn-mark")) {
      const id = e.target.closest("li").id;
      markCb(id);
    }
  });

  const renderGoals = (goals) => {
    goalListEL.innerHTML = "";
    goals.forEach(goal => {
      const li = document.createElement("li");
      li.classList.add("goal-li")
      li.id = goal.id;
      li.innerHTML = goal.achieved
        ? `<span class="goal-achieved">${goal.description} <b>- ${goal.category}</b> (${goal.repetitions})</span>`
        : `<span>${goal.description} <b>- ${goal.category}</b> (${goal.repetitions})</span>
           <button class="goal-btn-mark">Mark as Achieved</button>`;
      goalListEL.appendChild(li);
    })
  }

  const getGoalInputValue = () => {
    return goalInputEL.value;
  }

  const getCategorySelectValue = () => {
    return categorySelectEL.value;
  }

  const getRepetitionsInputValue = () => {
    return repetitionInputEL.value;
  }

  const clearInput = () => {
    goalInputEL.value = "";
    categorySelectEL.value = "cardio"
    repetitionInputEL.value = "";
  }

  return {
    renderGoals,
    getGoalInputValue,
    getCategorySelectValue,
    getRepetitionsInputValue,
    clearInput,
    onMarkAchieved,
    addBtnEL
  }
})();