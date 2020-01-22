/**
 * This functions show all the changes props of stateful react component
 */
const componentDidUpdate = (prevProps, prevState) => {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val &&
        console.log(
          `Prop '${key}' changed. \nOld=` +
            JSON.stringify(prevProps[key]) +
            ", \nnew=" +
            JSON.stringify(this.props[key])
        )
    );
    if (this.state) {
      Object.entries(this.state).forEach(
        ([key, val]) =>
          prevState[key] !== val &&
          console.log(
            `State '${key}' changed. Old=` +
              prevState[key] +
              ", new=" +
              this.state[key]
          )
      );
    }
  }