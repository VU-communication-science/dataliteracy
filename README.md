# R Methods book 

## Book link

[dataliteracy.cc](https://dataliteracy.cc)


## Setting things up

### Install Quarto

First, [install Quarto](https://quarto.org/docs/get-started/). I'll assume you're using RStudio (otherwise let me know and I'll add instructions).

### Install Git

Install [Git](https://git-scm.com/downloads).

### Clone the GitHub repo

You can directly use Git from within R.
Go to File -> New Project -> Version control -> Git.
Use the repository URL: https://github.com/VU-communication-science/R-canon

This copies the repository to the designated folder on your device, and opens
it as an R project. 

### Install packages

To preview the book locally, you'll need to have installed the R packages used in the chapters you are working on. You can use the `install_dependencies.R` script if you want to install packages based on the `.qmd` files you've changed. (Note: The GitHub Actions workflow will automatically handle installing dependencies for changed files when you push your code.)


## Updating the book

Updating the book takes 2 steps:

* Make changes to the Quarto source files (`.qmd`) and preview them locally.
* Commit and push the source changes to GitHub.

The website will automatically be built and updated by a GitHub Actions workflow.
Note that it might take a few minutes after pushing for the change to show up on the live website.


### Previewing the book locally

Open any Quarto file in the project. You should then see the Render button (ctrl + shift + K) in the toolbar of RStudio. This will render the file so you can preview your changes.

*Note: Build files and output directories (like `_site`, `docs`, `_freeze`) are now excluded from version control via `.gitignore`. You do not need to worry about tracking or committing these files.*

### Pushing changes to GitHub

In your Environment pane in RStudio, you should see a **Git** tab. If you open this you
see a list of all the source files that you edited. 

To update the website, you will need to submit your source file changes to GitHub:

* Click on the **Commit** button. This opens a new window which shows all the edited
files at the top, and you can also see the specific changes per file.
* **Stage** the files you want to update (e.g., your `.qmd` files).
* Write a **Commit** message. This can just be a single sentence describing what you did (e.g. "Updated ANOVA tutorial").
* Close the pop-up window when ready. You should now see a sentence saying something like "Your branch is ahead of 'origin/main' by 1 commit".
* To push this commit to GitHub, click the **Push** button. (The first time you might have to login to GitHub first).

Once pushed, GitHub Actions will automatically read your changed files, install any necessary dependencies, render the book, and deploy the updated pages to the website. If the build fails, the commit author will receive an email notification from GitHub.

### Pulling changes from GitHub

Every time you start working on the book, make sure to **Pull** any recent
changes from GitHub first. 

Someone else (or you on a different device) might have updated the book,
so if you don't get the most recent version, you might be working in an older
version of the book. If so, you'll get an error when trying to push your changes:

"Updates were rejected because the remote contains work that you do not have locally"

You will then need to **Pull** the most recent version. Click the **Pull** button (you might need to use the one in your main RStudio window, not the one from the Commit pop-up). 

Because all build outputs are now ignored, you should no longer experience merge conflicts related to the `docs/` folder! You will only get conflicts if you and someone else edited the exact same lines in a source `.qmd` file.


## About the structure of the book

Notice that the directory names match the sections of the book (e.g. data-management, analysis). Inside these directories you see:

- An index.qmd file.
- The .qmd files for the tutorials, or directories for subsections.

The index.qmd file is the main file for the section, and it will be rendered as the main page of the section.
Also notice that the YAML at the top specifies the **title** and **order**. e.g. see analysis/index.qmd.

```yaml
---
title: Analysis
order: 3
---
```

Here we could add the main page for the analysis section. 
(empty at the time of writing)

The **title** setting is obvious. The **order** setting determines where in the order of sections the Analysis section is placed. 
At the time of writing this is the third section (after `Getting Started` and `Data management`).

#### TLDR

To add a new tutorial, simply create a new `.qmd` file in the appropriate directory, and add a YAML header at the top that specifies the title and order.
To add a new (sub)section, create a new directory, and add an `index.qmd` file with the title and order.
