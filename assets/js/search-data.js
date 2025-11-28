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
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
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
        },{id: "post-proabilistic-matrix-factorization",
        
          title: "Proabilistic Matrix Factorization",
        
        description: "Scalable solution for large, sparse, and imbalanced data",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/pmf/";
          
        },
      },{id: "post-variational-calculus",
        
          title: "Variational Calculus",
        
        description: "A brief introduction",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/vc/";
          
        },
      },{id: "post-rényi-dp",
        
          title: "Rényi DP",
        
        description: "A natural relaxation of DP",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/rdp/";
          
        },
      },{id: "post-differential-privacy",
        
          title: "Differential Privacy",
        
        description: "What is it and why is it needed",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/dp/";
          
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
          section: "News",},];
