export const Model = (() => {
  class State {
    #goals = [];
    #onChange = () => {};
    
    get goals() {
      return this.#goals;
    }

    set goals(newGoals) {
      this.#goals = newGoals;
      this.#onChange();
    }

    addGoal(newGoal){
      this.goals = [...this.goals, newGoal];
    }

    updateGoal(id, fields){
      this.goals = this.goals.map(g =>
        g.id === id
          ? { ...g, ...fields }
          : g
      )
    }

    subscribe(cb) {
      this.#onChange = cb;
    }
  }

  return { State };
})();