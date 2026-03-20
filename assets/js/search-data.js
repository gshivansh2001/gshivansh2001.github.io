// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-research",
          title: "Research",
          description: "My research examines how information design and governance choices on digital platforms shape user behavior, market outcomes, and perceptions. I focus on settings where platform interventions such as disclosure policies, moderation rules, and algorithmic design generate behavioral responses. Using large-scale observational data, I combine computational methods with econometric approaches to study how different participants including creators, consumers, and market actors adapt to changes in platform environments. More broadly, my work aims to understand how micro-level behavioral responses to platform design aggregate into broader organizational and market-level consequences.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Curriculum Vitae",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-beyond-research",
          title: "Beyond Research",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/books/";
          },
        },{id: "post-replicating-quot-male-backlash-and-female-guilt-quot-women-39-s-employment-and-ipv-in-urban-india",
        
          title: "Replicating &quot;Male Backlash and Female Guilt&quot; — Women&#39;s Employment and IPV in Urban...",
        
        description: "A walk-through of replicating Dhanaraj and Mahambare (2022) using NFHS-4 data, covering probit, bivariate IV probit, and the challenges of instrumenting paid work",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/econA.md/";
          
        },
      },{id: "post-how-to-obtain-and-interpret-covariate-estimates-in-sdid-using-stata",
        
          title: "How to Obtain and Interpret Covariate Estimates in SDID Using Stata",
        
        description: "Understanding what SDID reports for covariates and how to correctly recover coefficients and p-values",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/sdidcov/";
          
        },
      },{id: "post-what-really-happens-when-you-add-covariates-to-sdid",
        
          title: "What Really Happens When You Add Covariates to SDID",
        
        description: "An early researcher’s walkthrough on understanding covariates in synthetic difference-in-differences",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/sdidI/";
          
        },
      },{id: "news-joined-the-sritne-team-at-isb-and-started-working-as-a-pre-doctoral-researcher-in-the-information-systems-department",
          title: 'Joined the SRITNE team at ISB and started working as a pre-doctoral researcher...',
          description: "",
          section: "News",},{id: "news-attended-isb-nber-conference-on-information-and-competition-in-the-digital-economy",
          title: 'Attended ISB-NBER Conference on Information and Competition in the Digital Economy.',
          description: "",
          section: "News",},{id: "news-attended-and-volunteered-at-code-conference-on-the-digital-economy-varanasi",
          title: 'Attended and volunteered at CODE: Conference on the Digital Economy, Varanasi.',
          description: "",
          section: "News",},{id: "news-attended-and-volunteered-for-isb-poms-workshop-2025-indian-school-of-business-hyderabad",
          title: 'Attended and volunteered for ISB POMS Workshop 2025, Indian School of Business, Hyderabad....',
          description: "",
          section: "News",},{id: "news-attended-isb-deakin-symposium-on-marketing-technology-amp-amp-ai-indian-school-of-business-hyderabad",
          title: 'Attended ISB - Deakin Symposium on Marketing Technology &amp;amp;amp; AI, Indian School of...',
          description: "",
          section: "News",},{id: "news-attended-nber-conference-on-household-finance-across-the-lifecycle-fall-2025-indian-school-of-business-hyderabad",
          title: 'Attended NBER Conference on Household Finance across the Lifecycle, Fall 2025, Indian School...',
          description: "",
          section: "News",},];
