
Here I will document a new structure for the modules, for a more modular approach that alligns with the skill tree.

First, I'll make starting modules for different trees, that introduce  the general idea behind the modules. Currently thinkin:

- computational literacy: explains why students need to understand how a computer works. This becomes the parent of the "working with R" module, and I'll probably also add a sibling here for more basic (non r) computer skills, like how the file system works
- statistical literacy: This begins by focussing on statistical concepts, regardless of R. Probably start with brNches for means and probability.
- Data law and ethics: This will be a small tree, but it would basically cover some general concepts about your responsibilities when working with data. Modules would include things like copyright and GDPR

The idea would be that these threes also merge together at different points. The "summarizing" module from computational literacy, that focusses on the stuff (group_by, summarise), with flow into descriptive statistics. And then we'll also have a branch from statistical literacy flow into this. 

I'll then also add more smaller modules. Thinking of the following general branches (we'll add intersection between them later)

- computational literacy
  - Intro to R (takes first part of 'working with r module'. focus on installation of R and Rstudio, and basics of how to run code and assign values)
  - Data types (takes later stuff from the current 'working with R' module. Introduces vectors and data frames. And different value types (character, numeric, logical)
  - Tidyverse (Introduction to the tidyverse. Rewrite of current "data frames" module. Start with explaining what the tidyverse is, and then shows how it lets us create versatile piplines for managing data. Then introduces the basics)
