# Generates broad purpose demo data for explaining tidyverse and statistics

# whether watching a movie about journalism can affect trust in journalists.
# - Two repeated measures: trust before and after the intervention
# - Three groups: control, positive about journalism, negative about journalism
# - Other variables: age, newspaper subscription, news consumption

library(sjPlot)
library(tidyverse)
set.seed(1)

rescale <- function(x, new_min = 1, new_max = 10) {
  (x - min(x, na.rm = TRUE)) / (max(x, na.rm = TRUE) - min(x, na.rm = TRUE)) * (new_max - new_min) + new_min
}

# number of participants. Make sure to use multiple of 3 for equal distribution of groups
n <- 600

# simulate age
age <- round(runif(n, 18, 65))

# assign groups in repetitions to ensure equal distribution (data is random anyway)
experiment_group <- rep(1:3, length.out=n) |> factor(labels = c("control", "negative", "positive"))


# simulate subscription to have likelihood increase with age, using a logistic function
subscription_odds <- 1 / (1 + exp(-0.06*age + 2))
np_subscription <- rbinom(n, 1, subscription_odds)

subscription_prob = subscription_odds / (1 + subscription_odds)
# plot(age ~ as.factor(np_subscription))

# create variable for average hours of news consumption per week, and make it so that it's higher for people with
# newspaper subscription, but people without subscription have higher variance (for showing levene's test)
news_consumption <- rnorm(n, mean = 8 + np_subscription*4 + age*0.1, sd = 3 - np_subscription*1.5)
news_consumption[news_consumption < 0] <- 0
news_consumption = round(news_consumption)
# plot(news_consumption ~ as.factor(np_subscription))


political_orientation = sample(c("left", "center", "right"), n, replace = TRUE, prob = c(0.3, 0.4, 0.34))
political_interest = rnorm(n, mean = 5, sd = 2.5) |> rescale(1,7)

# simulate trust_t1.
is_left = political_orientation == "left"
is_right = political_orientation == "right"

trust_t1 <- rnorm(n, mean = 3 + 0.03*age  + news_consumption*0.05 +  political_interest*0.1 +  is_left*-0.2 + is_left*political_interest*0.2 + is_right*0.35 + is_right*political_interest*-0.3, sd = 1)
trust_t1[trust_t1 < 1] <- 1
trust_t1[trust_t1 > 10] <- 10
# plot(age, trust_t1)


# simulate trust_t2 to:
# - be based on trust_t1
# - be lower in the negative group compared to the neutral group
# - be slightly higher, but not significantly, in the positive group compared to the neutral group
# - make the negative effect weaker for those who are subscribed to the newspaper
# - force 10 pt scale
trust_t2 <- trust_t1 +
  (experiment_group == "positive") * 0.4 +
  (experiment_group == "negative") * (!np_subscription) * -1.6+
  (experiment_group == "negative") * np_subscription * -0.3 +
  rnorm(n, mean = 0, sd = 1)
trust_t2[trust_t2 < 1] <- 1
trust_t2[trust_t2 > 10] <- 10
# plot(trust_t2 ~ experiment_group)

# create tibble and randomize order
d = tibble(
    age = age,
    political_orientation = political_orientation,
    political_interest = political_interest,
    np_subscription = factor(np_subscription, labels = c("no", "yes")),
    news_consumption = news_consumption,
    experiment_group = experiment_group,
    trust_t1 = trust_t1,
    trust_t2 = trust_t2
)
d = d[sample(nrow(d)),]
d = cbind(id = 1:n, d)

# Now decompose the trust scales into underlying items.
# To do this in a way that roughtyl preserves the simulated correlations,
# we'll first generate the items with error, and then reconstruct
# the scales from the items.

sim_trust_item <- function(x, coef, sd, inversed=F) {
  v = rnorm(length(x), mean = x*coef, sd = sd)
  v[v < 1] = 1
  v[v > 10] = 10
  v = round(v)
  if (inversed) v = 11 - v
  v
}

sim_trust_items <- function(x, prefix='') {
  item1 = sim_trust_item(x, 0.812, 0.43)
  item2 = sim_trust_item(x, 0.5, 1.6)
  item3 = sim_trust_item(x, 0.857, 0.70, TRUE)
  item4 = sim_trust_item(x, 0.725, 0.55)
  item5 = sim_trust_item(x, 0.912, 0.35)

  df = tibble(item1, item2, item3, item4, item5)
  colnames(df) = paste0(prefix, colnames(df))
  df
}

t1_items = sim_trust_items(d$trust_t1, 'trust_t1_')
t2_items = sim_trust_items(d$trust_t2, 'trust_t2_')

t1_items_alligned = t1_items
t1_items_alligned$trust_t1_item3 = 11 - t1_items_alligned$trust_t1_item3
t2_items_alligned = t2_items
t2_items_alligned$trust_t2_item3 = 11 - t2_items_alligned$trust_t2_item3

## create scales using only items 1,3,4,5.
scale_items = c('trust_t1_item1', 'trust_t1_item3', 'trust_t1_item4', 'trust_t1_item5')
new_trust_t1 = rowMeans(t1_items_alligned[, scale_items])
scale_items = c('trust_t2_item1', 'trust_t2_item3', 'trust_t2_item4', 'trust_t2_item5')
new_trust_t2 = rowMeans(t2_items_alligned[, scale_items])

## check if the correlations are still there
cor.test(d$trust_t1, new_trust_t1)$estimate
cor.test(d$trust_t2, new_trust_t2)$estimate
d$trust_t1 = new_trust_t1
d$trust_t2 = new_trust_t2
d = cbind(d, t1_items, t2_items)


function() {
  ### Testing some basic stats

  # T-TEST: we can demonstrate independent samples t-test with np_subscription.
  # variances equal
  car::leveneTest(trust_t1 ~ np_subscription, data = d)
  t.test(trust_t1 ~ np_subscription, var.equal=TRUE, data = d)
  plot(trust_t1 ~ np_subscription, data = d)

  # variances not equal
  car::leveneTest(news_consumption ~ np_subscription, data = d)
  t.test(age ~ np_subscription, var.equal=FALSE, data = d)
  plot(age ~ np_subscription, data = d)

  # ANOVA
  aov(trust_t2 ~ experiment_group, data = d) |> summary()
  plot(trust_t2 ~ experiment_group, data = d)

  # Regression with interaction
  m = lm(trust_t2 ~ experiment_group * np_subscription, data = d)
  plot_model(m, type = "pred", terms = c("experiment_group", "np_subscription"), show.values = TRUE)

  dl <- d |>
    pivot_longer(cols = c(trust_t1, trust_t2), names_to = "time", values_to = "trust") |>
    mutate(time = ifelse(time == "trust_t1", "t1", "t2"))

  ggplot(dl, aes(x = age, y = trust, color = experiment_group)) +
    geom_point() +
    geom_smooth(method = "lm", se = FALSE) +
    facet_wrap(~time)

  library(sjPlot)
  d |>
    select(trust_t1_item1:trust_t1_item5) |>
    tab_corr()

  m1 <- lm(trust_t1 ~ age, data = d)
  m2 <- lm(trust_t1 ~ political_orientation, data = d)
  m3 <- lm(trust_t1 ~ age + political_orientation, data = d)
  tab_model(m1,m2,m3)

  d |>
    group_by(political_orientation) |>
    summarize(m = mean(trust_t1), sd = sd(trust_t1), n = n(), m_age = mean(age))

  plot_model(m2, type = "pred", terms = c("age", "political_orientation"))

}

## adding some missing values and noise, and then saving
set.seed(1)

# Some people entered age as birthyear, and one person is too young
ds = d

# some people didnnt enter age
ds$age[sample(1:n, 5)] = NA

# adding a stupid space in news_consumption
colnames(ds)[colnames(ds) == "news_consumption"] = "news consumption"


i = sample(1:n, 4)
## we need the specific birthyears to be deterministic for the tutorials
ds$age[i] = c(1987, 1970, 1967, 17)

output_dir <- Sys.getenv("DATALITERACY_DATA_OUTPUT_DIR", unset = "data/generated")
dir.create(output_dir, showWarnings = FALSE, recursive = TRUE)
write_csv(ds, file.path(output_dir, "practice_data.csv"))
