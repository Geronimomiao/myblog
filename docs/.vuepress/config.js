module.exports = {
  // theme: 'reco',
  title: "Geronimo 邈 ",
  description: "种一棵树最好的时间是十年前 其次是现在",
  base: "/",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: "GitHub",
        link: "https://github.com/Geronimomiao",
        icon: "reco-github",
      },
    ],

    search: true,
    searchMaxSuggestions: 10,
    sidebar: "auto",
    lastUpdated: "Last Updated",
    author: "Geronimo 邈",
    record: "豫ICP备18026088号",
    startYear: "2019",
    logo: "/yuan.png",
  },
  plugins: [
    ["autobar", { pinyinNav: true }],
    "rpurl",
    "meting",
  ],
};
