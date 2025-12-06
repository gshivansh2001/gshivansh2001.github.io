---
layout: post
title: How SDID Works When Covariates Are Used in Stata
description: Understanding how covariates affect synthetic difference-in-differences
date: 2025-02-14
---

When you add covariates to **Synthetic Difference-in-Differences (SDID)**, you are *not* estimating coefficients for those covariates like in OLS. Instead, SDID uses covariates to **improve the construction of the synthetic counterfactual** by residualizing outcomes or projecting covariates before choosing weights. The inclusion of covariates changes the **weights** (ω and λ), which typically reduces bias and variance.

---

## 1. How Covariates Are Incorporated

### **A. Residualized Approach (default in many implementations)**
1. Regress the outcome \( Y_{it} \) on covariates \( X_{it} \).
2. Compute residuals:  
   \[
   \tilde Y_{it} = Y_{it} - X_{it} \hat\beta
   \]
3. Run SDID on \( \tilde Y_{it} \).

### **B. Projected Approach**
Estimate covariate effects **using only control units**, then compute residuals and run SDID. This is more stable when covariates are noisy or correlated with latent trends.

### **C. Joint Estimation (SDIDC)**
A newer method that estimates weights and covariate coefficients together. Useful when covariates and unobserved trends are correlated.

---

## 2. What Changes Inside SDID When Covariates Are Added
SDID selects weights by minimizing:
- Unit imbalance
- Time imbalance
- Regularization penalties

When covariates are included, SDID performs its optimization on **residualized outcomes**, so:

- Unit weights (ω) change  
- Time weights (λ) change  
- The ATT estimate may change  
- No covariate coefficients are reported

If you need β estimates, you must compute them outside SDID or use a joint-estimation method.

---

## 3. Stata `sdid` Options You Should Know

### **`covariates(varlist, optimized)`**
Residualizes using all units. Good for well-behaved covariates.

### **`covariates(varlist, projected)`**
Residualizes using only untreated units. Often more robust.

### **`unstandardized`**
By default, covariates are standardized. Use this option cautiously.

### **`returnweights generate(prefix)`**
Stores unit and time weights in your dataset.

### **`vce(bootstrap | placebo | jackknife)`**
Inference options.  
Choose based on number of treated units and sample size.

---

## 4. Minimal Practical Workflow in Stata

```stata
* Baseline SDID without covariates
sdid outcome unitid time treated, vce(bootstrap) reps(200)

* SDID with optimized covariates
sdid outcome unitid time treated, vce(bootstrap) reps(200) ///
    covariates(age income x1 x2, optimized) ///
    returnweights generate(w_) graph

* SDID with projected covariates
sdid outcome unitid time treated, vce(bootstrap) reps(200) ///
    covariates(age income x1 x2, projected) ///
    returnweights generate(w_) graph

* Inspect weights
sum w_omega*
sum w_lambda*

twoway (line outcome time if treated==1, sort) ///
       (line outcome time [fw=w_omega1] if treated==0, sort), ///
       title("Treated vs Synthetic Control")
```

---

## 5. Diagnosing Whether Covariates Helped

### **1. Pre-treatment balance**
Compute weighted pre-treatment covariate means.

### **2. Trend plots**
Plot treated vs synthetic control trends.

### **3. Compare optimized vs projected**
If they give very different ATTs, inspect covariate behavior.

### **4. Check regularization warnings**
Adjust `zeta_omega()` or `zeta_lambda()` only if necessary.

---

## 6. Practical Pitfalls

- Do **not** include post-treatment covariates.  
- Avoid perfect multicollinearity in covariates.  
- Adding too many covariates can destabilize weights.  
- If you need β coefficients, SDID will *not* report them.

---

## 7. Worked Example (Conceptual)

Suppose:
- `outcome` = student test score  
- Treatment begins in 2015  
- Covariates: `income`, `school_resources`

Residualizing removes predictable variation from covariates so SDID focuses only on matching **unexplained** pre-treatment trends. If covariates differ sharply across treated and controls, `projected` is safer.

---

## 8. References for Further Reading

- Arkhangelsky et al. (2021). *Synthetic Difference-in-Differences*.  
- Stata `sdid` Manual.  
- Hirshberg & Klosin (2024). *Synthetic Differences-in-Differences with Covariates (SDIDC)*.

---

## Next Post: Blog 2
Blog 2 will cover:

- How to extract covariate effects  
- How to interpret them  
- How to evaluate covariate balance formally  
- When projected SDID or joint estimation is preferable
