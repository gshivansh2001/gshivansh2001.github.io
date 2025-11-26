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
        },{id: "news-joined-the-sritne-team-at-isb-and-started-working-as-a-pre-doctoral-researcher-in-the-information-systems-department",
          title: 'Joined the SRITNE team at ISB and started working as a pre-doctoral researcher...',
          description: "",
          section: "News",},{id: "news-attended-isb-nber-conference-on-information-and-competition-in-the-digital-economy",
          title: 'Attended ISB-NBER Conference on Information and Competition in the Digital Economy.',
          description: "",
          section: "News",},{id: "news-attended-and-volunteered-at-code-conference-on-the-digital-economy-varanasi",
          title: 'Attended and volunteered at CODE: Conference on the Digital Economy, Varanasi.',
          description: "",
          section: "News",},{id: "news-attending-and-volunteering-for-isb-poms-workshop-2025-indian-school-of-business-hyderabad",
          title: 'Attending and volunteering for ISB POMS Workshop 2025, Indian School of Business, Hyderabad....',
          description: "",
          section: "News",},];
