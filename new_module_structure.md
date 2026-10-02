
Here I will document a new structure for the modules, for a more modular approach that alligns with the skill tree.

We'll first focus on getting the skill tree right. THe idea here is to have recommended learning paths, and somehow cluster modules together in a way that makes sense. The "categories' in the worktree should correspond to the top level modules. Currently thinking we should have:

- Statistical foundations
- Computational skills
- Data law and ethics
- Measurement
- Descriptive statistics (will include visualizations)
- Inferential statistics

The idea would be that these themes intersect, but not always in the same order. For instance, for descriptive statistics we only need to know the basics of statistical foundations, but for inferential statistics we need to know more about statistical foundations. For both descriptive and inferential statistics, we need to know basics for how to work with data frames, but advance data management stuff like measurement and data cleaning is a separate branch. So we won't for instance make "data cleaning" a prerequisite for inferential statistics in the tree, because the tree is only about recommended learning paths, and not about what is required to do a statistical analysis. Likewise, the module for model diagnostics comes AFTER the module for model fitting, because that order makes more sense for learning.

We will try to keep the paths simple, by always starting a category with a node that introduces the category (which is basically the chapter for that module. So "statistical foundations" is also a quarto file).
