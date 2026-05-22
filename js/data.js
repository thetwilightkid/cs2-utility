const CS2_DATA = {
  maps: [
    { id: "mirage",  name: "Mirage",  thumbnail: "🏜️" },
    { id: "dust2",   name: "Dust 2",  thumbnail: "🌅" },
    { id: "inferno", name: "Inferno", thumbnail: "🔥" },
    { id: "anubis",  name: "Anubis",  thumbnail: "🏛️" }
  ],

  categories: ["All", "Smoke", "Flash", "Molotov", "Guide"],

  lineups: [
    // ─── MIRAGE ───
    {
      id: 1, map: "mirage", type: "Smoke", title: "Window smoke",
      description: "Stand in T spawn corner, aim at the top edge of the building. Jump-throw gives a consistent window smoke every time. Very important for A-site executes.",
      from: "T Spawn",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/1a1a2e/e0e0e0?text=Window+Smoke+Lineup",
        "https://placehold.co/600x340/1a1a2e/e0e0e0?text=Window+Smoke+Result"
      ],
      tags: ["T Spawn", "A Site", "Essential"]
    },
    {
      id: 2, map: "mirage", type: "Smoke", title: "Jungle smoke",
      description: "From T ramp, aim at the corner of the wall and do a running throw. Smokes off jungle allowing a safe A execute without flash support.",
      from: "T Ramp",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/1a1a2e/e0e0e0?text=Jungle+Smoke+Lineup"
      ],
      tags: ["T Ramp", "A Site"]
    },
    {
      id: 3, map: "mirage", type: "Smoke", title: "CT smoke",
      description: "From cat catwalk, look at the edge of the ramp wall and stationary throw. Covers CT position on A site completely.",
      from: "Catwalk",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/1a1a2e/e0e0e0?text=CT+Smoke+Lineup"
      ],
      tags: ["Catwalk", "A Site"]
    },
    {
      id: 4, map: "mirage", type: "Flash", title: "Pop flash A ramp",
      description: "Cook the flash for 1 second, throw over the wall from short stairs. Blinds anyone holding A ramp or short. Coordinate with teammates pushing simultaneously.",
      from: "Short Stairs",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/1a1a2e/e0e0e0?text=Pop+Flash+Lineup"
      ],
      tags: ["Short", "A Site"]
    },
    {
      id: 5, map: "mirage", type: "Molotov", title: "B van molotov",
      description: "From T mid, lob the molotov to clear van position on B site. Forces CT to reposition and clears the most common hiding spot.",
      from: "T Mid",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/1a1a2e/e0e0e0?text=Van+Molotov"
      ],
      tags: ["T Mid", "B Site"]
    },
    {
      id: 6, map: "mirage", type: "Guide", title: "Mid control guide",
      description: "Controlling mid on Mirage is one of the most important aspects of the map. Window control gives information and access to both sites. This guide covers when to take mid, how to use smokes, and how to rotate.\n\n**Step 1:** Smoke window early to deny CT info.\n**Step 2:** Send one player to cat with flash support.\n**Step 3:** Use mid control to execute B or split A.",
      from: "Mid",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/1a1a2e/e0e0e0?text=Mid+Control+Overview"
      ],
      tags: ["Mid", "Strategy", "T-Side"]
    },

    // ─── DUST 2 ───
    {
      id: 7, map: "dust2", type: "Smoke", title: "Cross smoke",
      description: "The most important smoke on Dust 2. From T spawn, aim at the corner of the building and jump-throw. Covers long cross allowing safe passage to long A.",
      from: "T Spawn",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/16213e/e0e0e0?text=Cross+Smoke+Lineup"
      ],
      tags: ["T Spawn", "Long A", "Essential"]
    },
    {
      id: 8, map: "dust2", type: "Smoke", title: "B door smoke",
      description: "From tunnels entrance, throw at the skybox to smoke off CT door. Allows safe entry to B site without getting picked through the door.",
      from: "Tunnels",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/16213e/e0e0e0?text=B+Door+Smoke"
      ],
      tags: ["Tunnels", "B Site"]
    },
    {
      id: 9, map: "dust2", type: "Flash", title: "Long A pop flash",
      description: "From pit, cook for 2 seconds and throw over the wall. Blinds anyone in A site and car. Perfect for pushing after cross smoke.",
      from: "Long Pit",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/16213e/e0e0e0?text=Long+Pop+Flash"
      ],
      tags: ["Long A", "A Site"]
    },

    // ─── INFERNO ───
    {
      id: 10, map: "inferno", type: "Smoke", title: "Balcony smoke",
      description: "From T spawn banana start, run-throw toward the building corner. Smokes off balcony allowing free banana walk. Essential for B-site takes.",
      from: "Banana Start",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/2d1200/e0e0e0?text=Balcony+Smoke+Lineup"
      ],
      tags: ["Banana", "B Site", "Essential"]
    },
    {
      id: 11, map: "inferno", type: "Smoke", title: "CT smoke apps",
      description: "From T apps entrance, aim at the top of the arch and jump-throw. Smokes CT position on A site. Combine with arch smoke for a full A execute.",
      from: "Apps",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/2d1200/e0e0e0?text=CT+Apps+Smoke"
      ],
      tags: ["Apps", "A Site"]
    },
    {
      id: 12, map: "inferno", type: "Molotov", title: "B car molotov",
      description: "From CT side, lob molotov to cover car on B. Denies the common aggressive position and forces T's back. Great for retake situations.",
      from: "CT Spawn",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/2d1200/e0e0e0?text=Car+Molotov"
      ],
      tags: ["CT Side", "B Site", "Retake"]
    },

    // ─── ANUBIS ───
    {
      id: 13, map: "anubis", type: "Smoke", title: "Bridge smoke",
      description: "Critical smoke for A site takes. From T mid, aim at the pillar corner and jump-throw. Cuts off rotation from bridge.",
      from: "T Mid",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/0d2137/e0e0e0?text=Bridge+Smoke"
      ],
      tags: ["Mid", "A Site", "Essential"]
    },
    {
      id: 14, map: "anubis", type: "Smoke", title: "Canal smoke",
      description: "From B main, throw at the arch above canal. Smokes off the water channel allowing safe passage without being spotted from CT.",
      from: "B Main",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/0d2137/e0e0e0?text=Canal+Smoke"
      ],
      tags: ["B Main", "B Site"]
    },
    {
      id: 15, map: "anubis", type: "Guide", title: "A site execute guide",
      description: "Anubis A site is unique due to the elevated platform and multiple entry points. A proper execute requires coordinated smokes and flashes.\n\n**Required smokes:** Bridge, CT, Connector.\n**Flash role:** One player throws pop flash from mid before entry.\n**Entry:** Two players push column side, one pushes platform.",
      from: "Multiple",
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      screenshots: [
        "https://placehold.co/600x340/0d2137/e0e0e0?text=A+Site+Execute"
      ],
      tags: ["A Site", "Strategy", "Execute"]
    }
  ]
};
