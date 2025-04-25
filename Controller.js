import { APIs } from "./api.js";
import { Model } from "./Model.js";
import { View } from "./View.js";

const Controller = ((model, view, api) => {
  const state = new model.State();

  const addGoalHandler = (e) => {
    e.preventDefault();
    const goalContent = view.getGoalInputValue();
    const categoryContent =  view.getCategorySelectValue();
    const repetitionContent = view.getRepetitionsInputValue();

    if(goalContent === '' || repetitionContent === ''){
      alert('Goal and repetitions cannot be empty');

      return;
    }

    api.createGoal({description: goalContent, category: categoryContent, repetitions: repetitionContent, achieved: false}).then(newGoal => {
      view.clearInput();
      state.addGoal(newGoal);
    })
  }

  const init = () => {
    state.subscribe(() => {
      view.renderGoals(state.goals);
    });
  
    api.getGoals().then(goals => {
      state.goals = goals;
    });
  
    view.addBtnEL.addEventListener("click", addGoalHandler);
  
    view.onMarkAchieved(id => {
      api.updateGoal({ id, achieved: true })
         .then(updated => state.updateGoal(id, { achieved: true }));
    });
  }

  return { init }
})(Model, View, APIs);

Controller.init();