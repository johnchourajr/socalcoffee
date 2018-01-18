---
title: Chemex
type: recipe
background: '/uploads/chemex.png'
function: chemexmath()
ingredients:
- label: "Coffee in Grams"
  value: 45
  type: number
  class: chemex-coffee
- label: "Coffee Grind"
  value: Med-Coarse
  type: text
  locked: true
- label: "Water in Grams"
  value: 630
  type: number
  locked: true
  id: chemex-water
- label: "Water Temp"
  value: '190°F'
  type: text
  locked: true
equipment:
- name: "Chemex carafe"
  link: "#"
- name: "Chemex filters"
  link: "#"
- name: "Burr Grinder"
  link: "#"
- name: "Digital Scale"
  link: "#"
- name: "Kettle"
  link: "#"
short_steps:
- label: 'Step 1'
  text: 'Pour Pre-infusion'
  number: 0
  class: chemex-preinfuse
- label: 'Zero Scale'
  text: ''
  number: ''
  class:
- label: 'Step 2'
  text: 'First Pour'
  number: 0
  class: chemex-pour1
- label: 'Step 3'
  text: 'Second Pour'
  number: 0
  class: chemex-pour2
- label: 'Discard Filter'
  text: ''
  number: ''
  class:
- label: Step 4
  text: 'Bypass Pour'
  number: 0
  class: chemex-bypass
long_steps: |-
  Measure **0**{:.chemex-coffeegrams}g of coffee, and grind **medium-coarse**. Bring **0**{:.chemex-water}g of water to a boil (or 190°f). Rinse filter, place grounds in top of chemex and pour a preinfusion of **0**{:.chemex-water}g. Wait 15-30 seconds.
  Zero the scale, and pour water over grounds to **0**{:.chemex-pour1}g in a circlular motion. Once the previous pour has drained, continue pouring to **0**{:.chemex-pour2}g.
  Lastly, once the final pour has drained, discard the coffee filter and add a **0**{:.chemex-bypass}g bypass pour directly into the brewed coffee.
---
