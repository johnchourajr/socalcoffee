---
title: Pour Over
type: recipe
background: '/uploads/pourover.png'
ratio: 15
function: pourovermath()
ingredients:
- label: "Coffee in Grams"
  value: 30
  type: number
  class: pourover-coffee
- label: "Coffee Grind"
  value: Medium
  type: text
  locked: true
- label: "Water in Grams"
  value: 0
  type: number
  locked: true
  id: pourover-water
- label: "Water Temp"
  value: '190°F'
  type: text
  locked: true
equipment:
- name: "Pour Over Dripper"
  link: "#"
- name: "Pour Over Filters"
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
  class: pourover-preinfuse
- label: 'Wait 30 Seconds'
  text: ''
  number: ''
  class:
- label: 'Step 2'
  text: 'First Pour'
  number: 0
  class: pourover-pour1
- label: 'Wait 45-60 Seconds'
  text: ''
  number: ''
  class:
- label: 'Step 3'
  text: 'Second Pour'
  number: 0
  class: pourover-pour2
- label: 'Wait 15 Seconds'
  text: ''
  number: ''
  class:
- label: 'Step 4'
  text: 'Third Pour'
  number: 0
  class: pourover-pour3
long_steps: |-
  ...
---
