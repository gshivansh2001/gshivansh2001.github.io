---
layout: post
title: "What HonestDiD Is (and Is Not): Making Sense of M = 0, 0.5, 1, 2"
description: An early researcher's account of misreading, re-reading, and finally understanding Rambachan and Roth's approach to sensitivity analysis for parallel trends
date: 2026-10-28
---

I first came across HonestDiD in the robustness sections of papers I was reading for the literature review of a new project. It kept showing up, and it took me a while to understand what it was actually doing. My understanding came in three rounds. First, on the surface, I took it to be a fancier parallel trends test. Then, once I read the original paper and realized it was not that, I had to work out what the paper was really claiming. And finally, when I brought it into the robustness section of my own paper, the "base case" with M = 0 did not match the estimate from my TWFE event study with the same covariates, which for a while convinced me I had done something wrong.

I had not. I just hadn't understood yet what M = 0 actually means. This post goes through that whole process: seeing HonestDiD in other people's papers, reading the paper, using it in my own analysis, and then going back to the paper a second time. Hopefully it saves someone else a bit of second-guessing.

---

#### Where I Started: Seeing It in Other People's Papers

Most of us know the usual routine in a difference-in-differences paper. You run an event study, plot the leads, check that the pre-treatment coefficients are close to zero and insignificant, and say that parallel trends "holds." In the papers I was reading, the HonestDiD plots usually sat right next to these event-study figures, so I put it in the same box in my head: a more rigorous way to check whether parallel trends is satisfied.

I got curious and read Rambachan and Roth (2023), and pretty early on the paper made it clear that this was the wrong way to think about it. It also explains why the usual routine is shakier than it looks. Pre-trends tests often have low power, so not rejecting a pre-trend doesn't mean there isn't one (Freyaldenhoven et al., 2019; Roth, 2022). On top of that, only going ahead with the analysis when the pre-test passes creates its own statistical distortions (Roth, 2022).

So HonestDiD isn't asking *"are the pre-trends zero?"* The question it asks is closer to this:

> If parallel trends fails after treatment by an amount related to what I see before treatment, what can I still say about the treatment effect?

There is no p-value for parallel trends anywhere in the output. What you get is a set of confidence intervals for the treatment effect, each one valid under a different assumption about how badly parallel trends could be violated. Once I stopped looking for a pass/fail result, the rest of the method was a lot easier to follow.

---

#### What the Paper Is Actually Saying

Rambachan and Roth (2023) start from the event-study coefficients $\hat\beta$ we already estimate, split into pre-treatment and post-treatment parts. The main idea is to break down what those coefficients converge to:

$$
\beta = \underbrace{\begin{pmatrix} 0 \\ \tau_{post} \end{pmatrix}}_{\tau} + \underbrace{\begin{pmatrix} \delta_{pre} \\ \delta_{post} \end{pmatrix}}_{\delta}
$$

Here $\tau$ is the causal effect we care about, and $\delta$ is the bias that comes from a difference in trends between the treated and comparison groups. Since there is no treatment effect before treatment (no anticipation), $\tau_{pre} = 0$. That means the pre-period coefficients are only picking up the trend difference: $\beta_{pre} = \delta_{pre}$.

The usual parallel trends assumption just says $\delta_{post} = 0$. HonestDiD replaces it with something weaker. It assumes $\delta$ lies in some set $\Delta$ that the researcher chooses, where $\Delta$ limits how different the post-treatment violations can be from the pre-treatment ones. Under a restriction like this, the treatment effect is no longer a single number. It is **partially identified**, meaning the data are consistent with a range of values.

So the confidence sets HonestDiD reports reflect two kinds of uncertainty:

- **Statistical uncertainty**: the pre-trends are themselves estimated with noise.
- **Identification uncertainty**: even if we knew the pre-trends exactly, we still wouldn't know exactly how to extrapolate them into the post-period.

For me, this was the part that made the paper make sense. HonestDiD is not testing an assumption. It relaxes one and shows you what is left of your result.

---

#### The Two Restrictions You Will Actually Use

The paper allows for many choices of $\Delta$, but in applied work two of them come up the most.

**1. Relative magnitudes, $\Delta^{RM}(\bar M)$**

$$
|\delta_{t+1} - \delta_t| \;\le\; \bar M \cdot \max_{s<0} |\delta_{s+1} - \delta_s| \quad \text{for all } t \ge 0
$$

In words, the period-to-period violation of parallel trends after treatment can be at most $\bar M$ times the largest period-to-period violation we see before treatment. This is the one I was using, and probably the one most people run into first. The way I read the values of $\bar M$:

- $\bar M = 0$: no post-treatment deviation at all, so exact parallel trends after treatment.
- $\bar M = 0.5$: post-treatment violations can be up to half the size of the worst pre-treatment violation.
- $\bar M = 1$: post-treatment violations can be as large as the worst pre-treatment one. The paper suggests this as a natural benchmark when the number of pre- and post-periods is similar.
- $\bar M = 2$: post-treatment violations can be twice as large as anything seen before treatment.

**2. Smoothness, $\Delta^{SD}(M)$**

$$
\big|(\delta_{t+1} - \delta_t) - (\delta_t - \delta_{t-1})\big| \;\le\; M
$$

This one limits how much the *slope* of the differential trend can change from one period to the next (basically a discrete second derivative). Here $M$ is in the units of the outcome, not a multiple of anything. $M = 0$ forces the differential trend to be exactly linear, and a larger $M$ lets it bend.

**Which one should you use?** The paper's answer is that the economics of your setting should decide, not convenience. Their two applications show this well. In the French restaurant VAT cut (Benzarti and Carloni, 2019), the worry is industry-specific shocks like the 2009 recession, so bounding relative magnitudes makes sense. In the duty-to-bargain laws and long-run student outcomes example (Lovenheim and Willen, 2019), the worry is slow-moving secular trends, so smoothness restrictions fit better.

---

#### Bringing It Into My Own Analysis

The first reading gave me the big picture. Later, when I started working on the robustness section of my own paper, HonestDiD felt like a natural thing to add. My event study looked clean, but I wanted to show how much the results could tolerate if parallel trends didn't hold exactly.

Running it was easy enough. Interpreting the output was the hard part. My expectation was simple: M = 0 is HonestDiD's way of saying "assume parallel trends," so it should give me back my TWFE event-study estimate. It didn't. I first went looking for bugs in my code, didn't find any, and then went back to the paper for a second and much slower read, this time paying attention to what $\Delta$ and $M$ mean under each restriction.

---

#### What the Second Reading Taught Me: Why M = 0 Does Not Equal My TWFE Estimate

It turned out there were a few reasons for the mismatch, and none of them were mistakes.

**1. M = 0 means different things under the two restrictions.**

Under $\Delta^{RM}$, $\bar M = 0$ does mean exact parallel trends after treatment. But under $\Delta^{SD}$, $M = 0$ means the differential trend is *exactly linear*, not zero. The estimate is then roughly your event-study coefficient minus a linear extrapolation of the pre-trend. If the pre-trends aren't flat, this can move the estimate quite a lot.

The paper's own example shows this really clearly. In the Lovenheim and Willen application, the original OLS estimate for women's employment is negative and significant. Under $\Delta^{SD}(0)$, though, the robust confidence set has only positive values, because the post-period estimate sits above the linear continuation of a downward pre-trend. The data are the same, but the sign flips, just because of what M = 0 assumes.

**2. Even under exact parallel trends, the interval is not the usual Wald interval.**

Under $\Delta^{RM}(0)$ the point estimate does line up with the event-study coefficient, but the confidence interval is built differently. For relative magnitudes, HonestDiD by default uses the conditional/least-favourable hybrid approach from Andrews, Roth and Pakes, which constructs intervals by inverting a test of moment inequalities. These procedures are designed for the case where the identified set has some width. When it collapses to a single point, they end up more conservative than the standard OLS interval. This is also why the package reports the original OLS interval separately: it's there to compare against, not something HonestDiD is supposed to reproduce.

**3. The target parameter may not be the one you think.**

HonestDiD reports results for $\theta = l'\tau_{post}$, which is a linear combination of the post-period effects. By default this is the effect in the **first post-treatment period**. It isn't an average, and it definitely isn't a pooled TWFE coefficient. So if you compare it with a single `treat × post` coefficient, you are comparing two different estimands.

**4. Covariates are not the issue.**

At one point I suspected HonestDiD was handling my controls differently. It isn't handling them at all. HonestDiD never sees the covariates. It only takes the vector of event-study coefficients $\hat\beta$ and their variance-covariance matrix $\hat\Sigma$, and whatever the regression did with the covariates is already built into those. If both come from the same regression, any difference you see is coming from the restriction and the inference method, not from the controls.

A quick summary of what should and shouldn't match:

| Setting | Centered on | Should it match TWFE? |
|---|---|---|
| Original CI (reported by the package) | Event-study coefficient | Yes, exactly |
| $\Delta^{RM}$, $\bar M = 0$ | Event-study coefficient | Point: roughly yes; interval: wider |
| $\Delta^{SD}$, $M = 0$ | Coefficient minus linear pre-trend extrapolation | Only if pre-trends are flat |
| Default $l$ vs. pooled `treat × post` | First post-period effect vs. overall average | No, different estimands |

---

#### Reading the Sensitivity Plot

Once I sorted out the M = 0 confusion, the sensitivity plot turned out to be the most useful part of the output. The original OLS interval is on the left, followed by the robust intervals for increasing values of $M$ or $\bar M$. As you allow bigger violations, the intervals get wider.

The number to look for is the **breakdown value**, which is the smallest $M$ at which the robust interval first includes zero. In the VAT application, setting $\bar M = 1$ gives a robust interval for the 2009 effect on log profits of roughly [0.07, 0.31], which still excludes zero, and the breakdown value is around $\bar M = 2$. So the conclusion becomes: the effect is significant as long as you're willing to believe the post-treatment violations were no more than about twice the worst pre-treatment one. Whether that's believable, given 2009 was a recession year, is an economic argument rather than a statistical one.

One more thing I didn't expect at first: under $\Delta^{RM}$, the intervals for later periods (or for the average over post-periods) are wider than for the first period. The restriction bounds *consecutive* changes, so the treated and comparison groups get more room to drift apart the further out you go. In the same VAT application, the interval for the average effect over post-periods already includes zero at $\bar M = 1$.

---

#### Running It in Stata

HonestDiD only needs the event-study coefficients and their variance-covariance matrix. So the workflow is to run the event study, check the order of the coefficients, and then call `honestdid`. With event time running from −4 to 3 and −1 as the omitted reference period:

```stata
* Event study (pre1 = event time -1 is the omitted reference)
reghdfe outcome pre4 pre3 pre2 post0 post1 post2 post3 covariates, absorb(unit time) cluster(unit)

* Check the position of each coefficient in e(b)
matrix list e(b)

* Relative magnitudes (default), Mbar from 0.5 to 2
honestdid, pre(1/3) post(4/7) mvec(0.5(0.5)2) coefplot

* Smoothness restriction, M in outcome units
honestdid, pre(1/3) post(4/7) mvec(0(0.01)0.05) delta(sd) coefplot
```

The `pre()` and `post()` options refer to **positions in `e(b)`**, not event times. That's why the event-time dummies should come first in the regression and the covariates after them. I'd check `matrix list e(b)` every time, because if the indices are off, Stata won't complain. You'll just get a sensitivity analysis of the wrong coefficients.

If you want the average post-treatment effect instead of the first-period one, you can pass a weighting vector through `l_vec` (for four post-periods, equal weights of 0.25).

---

#### What I Wish I Had Known at the Start

- It is not a test. HonestDiD doesn't tell you whether parallel trends holds; it tells you how much of a violation your conclusion can survive.
- Pick $\Delta$ based on your setting: relative magnitudes if you're worried about shocks, smoothness if you're worried about secular trends.
- Know what M = 0 means for the $\Delta$ you picked. Under relative magnitudes it's parallel trends, under smoothness it's a linear trend.
- Don't expect the robust interval to reproduce TWFE. Compare it with the original interval the package reports, not with your regression table.
- Be clear about the estimand: first post-period, a specific later period, or the average.
- Report the breakdown value. In my opinion it's the most informative single number in the whole analysis.

---

#### Final Thoughts

Looking back, pretty much all of my confusion came from expecting HonestDiD to behave like tools I already knew. It isn't a pre-trends test, and its M = 0 isn't a re-run of TWFE. What it does is make explicit how much the causal conclusion depends on parallel trends being exactly right, and it states that in terms a reader can actually reason about. Reading the paper twice, once out of curiosity and once with my own results in front of me, is what turned it from a plot I kept seeing in other papers into one of the more convincing parts of my own analysis.

If you're working through HonestDiD on your own project and get stuck, feel free to reach out over email.

---

#### A Short Video on the Paper

AI and I also made a short video about the paper using NotebookLM. It isn't a mathematical walkthrough, but it gives a decent intuitive sense of the idea if you want a quick overview before (or after) going through the paper itself.

<video controls width="100%">
  <source src="{{ '/assets/video/Honest_Parallel_Trends.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## References

- <a href="https://doi.org/10.1093/restud/rdad018">Rambachan, A., and J. Roth (2023), *A More Credible Approach to Parallel Trends*, Review of Economic Studies, 90(5): 2555–2591</a>
- <a href="https://doi.org/10.1257/aeri.20210236">Roth, J. (2022), *Pretest with Caution: Event-Study Estimates after Testing for Parallel Trends*, American Economic Review: Insights, 4(3): 305–322</a>
- Manski, C. F., and J. V. Pepper (2018), *How Do Right-to-Carry Laws Affect Crime Rates? Coping with Ambiguity Using Bounded-Variation Assumptions*, Review of Economics and Statistics, 100(2): 232–244
- Freyaldenhoven, S., C. Hansen, and J. Shapiro (2019), *Pre-event Trends in the Panel Event-Study Design*, American Economic Review, 109(9): 3307–3338
- <a href="https://github.com/asheshrambachan/HonestDiD">HonestDiD R package</a>
- <a href="https://github.com/mcaceresb/stata-honestdid">HonestDiD Stata package</a>