# Don Pinkus - Cancer Visualization

Bootstrapped with create-react-app

`npm i && npm start` to run

Note that the "Chart" component has some code specific to this visualizationn (e.g. hard-coded X and Y accessor keys).

If we want to make it a general ScatterChart component we could just factor these out into props, and also pass in the "points", "average point", and "average point links" as children.  If this is desired let me know! (Probably ~10 minutes of refactor).

don.pinkus@gmail.com
847.542.1219

#### Overview of the component hierarchy:

- App
  - CancerGraphic
    - Stepper
    - Chart
      - Tooltip
      - AvgPointAndLinks
    
