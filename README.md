# kinematica-js
A Library for Running and Displaying Browser-Based Physics Simulations

## An MVC Approach

Kinematica.js treats a physics demo as a **simulation** that needs to be **visualized**. The basic structure is:

1. A **model** containing all of the variables relevant to the simulation as well as a formula used to generate each variable value; these variables can depend on one another, but as a collection, their only dependence must be on ***t***, ***dt***, their ***initial values***, and a collection of ***parameters*** that characterize a simulation. The values cannot be directly manipulated, though they can be retrieved and used to display metrics and visualizations.
2. Several **views**, including animations (via Konva), tables of values (via HTML), and plots (via, hopefully, Plotly.js).
3. A **controller** which, for every animation frame, tells the model to update itself (i.e. generate the current set of variable values) based on current time and time since last frame, then feeds the new variable values to the views, causing their appearances to update.

## Simulations as Configurations

For starters, define a model:

```javascript
// These are parameters that characterize the simulation; order doesn't matter.
p = [
  {
    name: "v",
    value: "0.5",
    prettyName: "v_{car}",
    desc: "The velocity of the car.",
    units: "m/s"                  // units not yet implemented
  },{
    name: "m",
    value: "2000",
    prettyName: "m_{car}",
    desc: "The mass of the car.",
    units: "kg"
  }
];

// These are the physical variables we are interested in; ORDER MATTERS.
vars = [
  {
    name: "x",                    // NECESSARY
    dimensions: [],               // implement later; length=dims, tuple gives shape. will be very helpful for interpreting.
    init: 0,                      // only required if the formula is iterative
    prettyName: "x_{car}",        // defaults to name; can be rendered in KaTeX
    desc: "The current position of our car.",   // optional, but recommended
    units: "m",                   // not yet implemented, but part of api; will be handy soon
    formula: function(x, t, dt, params) {
      // each update function takes as arguments:
      // 1. the current value of this variable
      // 2. the current simulation time
      // 3. the time elapsed since the last recalculation
      // 4. the collection of parameters characterizing this simulation
      // each function should return the new value of the variable;
      // the function does not necessarily have to use x, t, dt,
      // or params.
      return x + params.v0+dt;
    }                             // NECESSARY
  },{
    name: "E",
    init: 0,
    formula: function(x, t, dt, params) {
      return 0.5*params.m*params.v*params.v;
    }
  }
];

// Eventually, instantiating a simulation object will potentially involve more interesting configuration information. For now, you just instantiate, then you add parameters and variables, and that's it.
simulation = new Kinematica();    // Instantiate a simulation object
simulation.addParameters(p);      // Add parameters for the simulation
simulation.addVariables(vars);    // Add variables in order
simulation.start();               // Start running the simulation (no visuals added yet)
setTimeout(simulation.stop, 500); // Run for half a second (at least), then stop
```

## Things to watch out for

We'll need to be careful of a few things.

1. Removing variables or parameters from the model might screw up dependencies; it will be important to unset the current values of storage variables so that, if a dependency is removed, an error will come up on the next update call. In other words, we need to make sure we clean up the value storage as we delete the configuration object in the same way that we create the value storage when we add the configuration object (see the above code block, in the models array, for examples of configuration objects).

## Roadmap

### Model

- [ ] Come up with a bunch of tests for this API; in particular, come up with configurations that should patently fail, and assert that they should cause errors to be thrown.
- [ ] Flesh out the update and getter API.
- [ ] Come up with tests for the update and getter API.
- [ ] Add a testing framework.
- [ ] Create a skeleton of the library.
- [ ] Configure continuous integration for testing.
- [ ] Add JSDoc.
- [ ] Start implementing the model API.

### Controller

- [ ] Specify a list of update functions (initially just updateVariables) that need to be called at set intervals.

### GUI

- [ ] Specify controller functions for recalculating static resources.
- [ ] Create an API for updating values of static parameters.
- [ ] Create an API for adding message sending from a view.
- [ ] Use dat.gui to make calls to this API to allow for user interactivity.

### Visualization

- [ ] Define what configuration looks like for visualization objects.
- [ ] Define what Konva configuration looks like (e.g. scaling, container, etc.)
- [ ] Figure out how to do batch draws in Konva efficiently.
- [ ] Create a Konva wrapper with an API.
- [ ] Create visualization constructor + add/remove visual objects API.

### Metrics

- [ ] Design a metrics table; just decide how it looks.
- [ ] Create an adder/remover and a constructor for metrics, as well as an update function.

### Plotting

- [ ] See whether Plotly is useful.
- [ ] Start brainstorming an API and use cases.
