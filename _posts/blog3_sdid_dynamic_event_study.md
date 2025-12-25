---
layout: post
title: Dynamic Treatment Effects with SDID in Stata: From ATT to Event Studies
description: How sdid_event makes dynamic treatment effects feasible without manual re-estimation
date: 2025-02-14
---

While working with SDID and covariates for a recent project, everything initially seemed to be going smoothly. The average treatment effect on the treated (ATT) was well-behaved, inference was stable, and the results aligned with expectations. But very quickly, a familiar question from applied work came back: **how does the treatment effect evolve over time?**

In a standard fixed-effects regression, this would be straightforward. One could estimate a dynamic specification with leads and lags, plot the coefficients, and interpret them as an event study. With SDID, however, this felt far less obvious. My first instinct was that estimating dynamic effects would require repeatedly truncating the panel, re-balancing it at each horizon, and re-running SDID multiple times—an approach that would be both computationally expensive and conceptually inelegant. Given that SDID is already heavier than a two-way fixed effects regression, doing this manually felt impractical.

That intuition turned out to be only partially correct. After some digging through the recent literature and Statalist discussions, I learned that dynamic treatment effects can, in fact, be obtained cleanly within the SDID framework—without iterating over subsamples—using the `sdid_event` command.

---

## Why Dynamic Effects Are Subtle in SDID

The challenge with dynamic treatment effects is not unique to SDID. A large literature has shown that conventional event studies based on two-way fixed effects regressions can produce misleading estimates when treatment timing is staggered and treatment effects are heterogeneous. In such settings, coefficients on leads and lags may be contaminated by effects from other periods or cohorts, making both pre-trend tests and post-treatment dynamics difficult to interpret.

SDID was originally proposed as a solution to some of these problems by explicitly constructing a synthetic counterfactual that matches treated units in the pre-treatment period. However, the original SDID estimator delivers a single ATT that averages over all post-treatment periods. By construction, it does not immediately tell us *when* the effect emerges or how it evolves over time.

This is precisely the gap that motivated recent extensions of SDID to event study settings.

---

## From SDID to Event-Study SDID

The key insight behind event-study SDID is that the overall SDID ATT can be decomposed into a sequence of **relative-time-specific treatment effects**. Instead of comparing average outcomes before and after treatment, we compare treated units to their synthetic controls at each relative period after adoption, net of the same pre-treatment adjustment.

Formally, the SDID ATT can be written as a weighted average of cohort-specific dynamic effects. For a given cohort, the dynamic effect at relative time \( \ell \) compares treated units \( \ell \) periods after treatment to their synthetic controls, subtracting the pre-treatment weighted difference. Aggregating these cohort-specific effects across cohorts yields an event-study-style estimand that is consistent with the SDID logic.

This decomposition is not ad hoc. It follows directly from the structure of the SDID estimator and preserves its core identifying assumptions.

---

## The `sdid_event` Command in Stata

The `sdid_event` command implements this idea directly. Rather than forcing the researcher to re-estimate SDID repeatedly, it computes dynamic treatment effects in a single step.

A minimal example looks like this:

```stata
sdid_event outcome unitid time treated, vce(bootstrap) disag
```

The output includes:
- the overall SDID ATT,
- dynamic treatment effects at each relative period,
- and, optionally, cohort-specific dynamic effects when the `disag` option is used.

Crucially, these estimates are internally consistent with the SDID estimator. Averaging the dynamic effects recovers the overall ATT.

---

## Covariates and Dynamic Effects

Because my original motivation came from using SDID *with covariates*, a natural follow-up question was whether dynamic effects could also be estimated with covariate adjustment. This turns out to be possible, with some important nuances.

Just like in standard SDID, covariates in `sdid_event` are used to residualize the outcome before constructing the synthetic control. Historically, `sdid_event` only supported the projected covariate adjustment, reflecting concerns about stability and interpretability. Recent updates have expanded support to include the optimized method as well, aligning the behavior of `sdid_event` with `sdid`.

In practice, the syntax mirrors what we are already familiar with:

```stata
sdid_event outcome unitid time treated, ///
    covariates(x1 x2 x3, projected) vce(bootstrap)
```

or, with optimized adjustment in newer versions,

```stata
sdid_event outcome unitid time treated, ///
    covariates(x1 x2 x3, optimized) vce(bootstrap)
```

The interpretation remains the same as in static SDID: covariates help improve balance and reduce noise, but they are not part of the causal estimand.

---

## Interpretation and Comparison with TWFE Event Studies

One of the reasons I found event-study SDID particularly appealing is that it sidesteps many of the issues highlighted in the recent event study literature. Unlike two-way fixed effects regressions with leads and lags, SDID-based dynamic effects do not rely on comparisons between early- and late-treated units in a way that induces contamination. Each dynamic effect compares treated units to a synthetic control built from untreated units, preserving a clean counterfactual.

This does not mean that all identifying assumptions disappear. Parallel trends in the pre-treatment period remain essential, and anticipation effects must still be ruled out. But the interpretation of dynamic effects is far more transparent than in traditional TWFE event studies with staggered adoption.

---

## Why This Matters in Practice

From a practical standpoint, `sdid_event` completely changes how feasible dynamic analysis is with SDID. What initially felt like a computational nightmare—manually truncating panels, re-balancing data, and re-running SDID dozens of times—turns out to be unnecessary. Dynamic treatment effects can be obtained with a single command, using estimands that are coherent with the SDID framework.

For applied work, this makes SDID a much more attractive alternative to traditional event study regressions, especially in settings with staggered treatment timing and concerns about heterogeneous effects.

---

## Final Thoughts

My initial hesitation about dynamic SDID effects came from treating SDID as a static estimator by default. Once I understood that the ATT itself can be decomposed into relative-time components, the logic of event-study SDID became clear. The `sdid_event` command operationalizes this idea in a way that is both theoretically grounded and computationally efficient.

If you are already comfortable with SDID for average effects, moving to dynamic analysis no longer requires a conceptual leap—or a large amount of additional code. It simply requires recognizing that the SDID estimator already contains the building blocks for an event study.

---

## References

- Arkhangelsky et al. (2021). *Synthetic Difference-in-Differences*.  
- Sun and Abraham (2021). *Estimating Dynamic Treatment Effects in Event Studies with Heterogeneous Treatment Effects*.  
- Ciccia (2024). *A Short Note on Event-Study Synthetic Difference-in-Differences Estimators*.  
- Statalist discussions on `sdid_event` and covariates.
