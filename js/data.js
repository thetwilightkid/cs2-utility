// ─────────────────────────────────────────────────────────────────────────────
//  HOW TO ADD YOUR OWN CONTENT
//
//  VIDEOS:      video: "videos/mirage/mirage_window_smoke_1.mp4"
//  SCREENSHOTS: screenshots: ["images/screenshots/mirage/shot1.png"]
//  RADAR:       set mapMarker: { x: 50, y: 50 } — use the marker tool to get coords
//  YOUTUBE:     youtube: "https://www.youtube.com/embed/VIDEO_ID"
// ─────────────────────────────────────────────────────────────────────────────

const CS2_DATA = {
  maps: [
    { id: "mirage",  name: "Mirage",  thumbnail: "🏜️", icon: "images/icons/de_mirage.png",  radar: "images/maps/de_mirage_radar_psd.png",  thumb: "images/thumbs/mirage.png"  },
    { id: "dust2",   name: "Dust 2",  thumbnail: "🌅", icon: "images/icons/de_dust2.png",   radar: "images/maps/de_dust2_radar_psd.png",   thumb: "images/thumbs/dust2.png"   },
    { id: "inferno", name: "Inferno", thumbnail: "🔥", icon: "images/icons/de_inferno.png", radar: "images/maps/de_inferno_radar_psd.png", thumb: "images/thumbs/inferno.png" },
    { id: "anubis",  name: "Anubis",  thumbnail: "🏛️", icon: "images/icons/de_anubis.png",  radar: "images/maps/de_anubis_radar_psd.png",  thumb: "images/thumbs/anubis.png"  }
  ],

  categories: ["All", "Smoke", "Flash", "Molotov", "Guide"],

  grenadeIcons: {
    Smoke:   "images/grenade_icons/smoke.png",
    Flash:   "images/grenade_icons/flash.png",
    Molotov: "images/grenade_icons/molotov.png",
    Guide:   null
  },

  lineups: [

    // ── MIRAGE ────────────────────────────────────────────────────────────
    {
      id: 1,
      map: "mirage",
      type: "Smoke",
      title: "Window Smoke 1",
      description: "Встать в правый угол ступенек на спавне и нацелиться на второй узор.\nСмок работает всегда, однако его могут заблокировать\n\n**Чтобы кинуть нужно зажать ЛКМ и прыгнуть, выпустить вместе с прыжком.",
      from: "T Spawn",
      video: "videos/mirage/mirage_window_smoke_1.mp4",
      screenshots: [
        "images/screenshots/mirage/mirage_window_smoke_1.png"
      ],
      mapMarker: { x: 91, y: 35 },
      tags: ["T Spawn", "Window Smoke", "Essential"]
    },

    {
      id: 2,
      map: "mirage",
      type: "Smoke",
      title: "Jungle smoke",
      description: "From T ramp, aim at the corner of the wall and do a running throw.\nSmokes off jungle allowing a safe A execute without flash support.",
      from: "T Ramp",
      video: "videos/mirage/jungle-smoke.mp4",
      screenshots: ["images/screenshots/mirage/jungle-smoke.jpg"],
      mapMarker: { x: 44, y: 30 },
      tags: ["T Ramp", "A Site"]
    },

    {
      id: 3,
      map: "mirage",
      type: "Smoke",
      title: "CT smoke",
      description: "From cat catwalk, look at the edge of the ramp wall and stationary throw.\nCovers CT position on A site completely.",
      from: "Catwalk",
      video: "videos/mirage/ct-smoke.mp4",
      screenshots: ["images/screenshots/mirage/ct-smoke.jpg"],
      mapMarker: { x: 62, y: 28 },
      tags: ["Catwalk", "A Site"]
    },

    {
      id: 4,
      map: "mirage",
      type: "Flash",
      title: "Pop flash A ramp",
      description: "Cook the flash for 1 second, throw over the wall from short stairs.\nBlinds anyone holding A ramp or short.",
      from: "Short Stairs",
      video: "videos/mirage/ramp-flash.mp4",
      screenshots: ["images/screenshots/mirage/ramp-flash.jpg"],
      mapMarker: { x: 58, y: 42 },
      tags: ["Short", "A Site"]
    },

    {
      id: 5,
      map: "mirage",
      type: "Molotov",
      title: "B van molotov",
      description: "From T mid, lob the molotov to clear van position on B site.\nForces CT to reposition and clears the most common hiding spot.",
      from: "T Mid",
      video: "videos/mirage/van-molotov.mp4",
      screenshots: ["images/screenshots/mirage/van-molotov.jpg"],
      mapMarker: { x: 36, y: 55 },
      tags: ["T Mid", "B Site"]
    },

    {
      id: 6,
      map: "mirage",
      type: "Guide",
      title: "Mid control guide",
      description: "Controlling mid on Mirage is one of the most important aspects of the map.\n\n**Step 1:** Smoke window early to deny CT info.\n**Step 2:** Send one player to cat with flash support.\n**Step 3:** Use mid control to execute B or split A.",
      from: "Mid",
      video: "videos/mirage/mid-guide.mp4",
      screenshots: ["images/screenshots/mirage/mid-overview.jpg"],
      mapMarker: { x: 50, y: 50 },
      tags: ["Mid", "Strategy", "T-Side"]
    },

    // ── DUST 2 ────────────────────────────────────────────────────────────
    {
      id: 7,
      map: "dust2",
      type: "Smoke",
      title: "Cross smoke",
      description: "The most important smoke on Dust 2.\nFrom T spawn, aim at the corner of the building and jump-throw.\nCovers long cross allowing safe passage to long A.",
      from: "T Spawn",
      video: "videos/dust2/cross-smoke.mp4",
      screenshots: ["images/screenshots/dust2/cross-smoke.jpg"],
      mapMarker: { x: 28, y: 35 },
      tags: ["T Spawn", "Long A", "Essential"]
    },

    {
      id: 8,
      map: "dust2",
      type: "Smoke",
      title: "B door smoke",
      description: "From tunnels entrance, throw at the skybox to smoke off CT door.\nAllows safe entry to B site without getting picked through the door.",
      from: "Tunnels",
      video: "videos/dust2/b-door-smoke.mp4",
      screenshots: ["images/screenshots/dust2/b-door-smoke.jpg"],
      mapMarker: { x: 66, y: 72 },
      tags: ["Tunnels", "B Site"]
    },

    {
      id: 9,
      map: "dust2",
      type: "Flash",
      title: "Long A pop flash",
      description: "From pit, cook for 2 seconds and throw over the wall.\nBlinds anyone in A site and car. Perfect for pushing after cross smoke.",
      from: "Long Pit",
      video: "videos/dust2/long-flash.mp4",
      screenshots: ["images/screenshots/dust2/long-flash.jpg"],
      mapMarker: { x: 22, y: 28 },
      tags: ["Long A", "A Site"]
    },

    // ── INFERNO ───────────────────────────────────────────────────────────
    {
      id: 10,
      map: "inferno",
      type: "Smoke",
      title: "Balcony smoke",
      description: "From T spawn banana start, run-throw toward the building corner.\nSmokes off balcony allowing free banana walk. Essential for B-site takes.",
      from: "Banana Start",
      video: "videos/inferno/balcony-smoke.mp4",
      screenshots: ["images/screenshots/inferno/balcony-smoke.jpg"],
      mapMarker: { x: 30, y: 65 },
      tags: ["Banana", "B Site", "Essential"]
    },

    {
      id: 11,
      map: "inferno",
      type: "Smoke",
      title: "CT smoke apps",
      description: "From T apps entrance, aim at the top of the arch and jump-throw.\nSmokes CT position on A site. Combine with arch smoke for full A execute.",
      from: "Apps",
      video: "videos/inferno/ct-smoke.mp4",
      screenshots: ["images/screenshots/inferno/ct-smoke.jpg"],
      mapMarker: { x: 68, y: 40 },
      tags: ["Apps", "A Site"]
    },

    {
      id: 12,
      map: "inferno",
      type: "Molotov",
      title: "B car molotov",
      description: "From CT side, lob molotov to cover car on B.\nDenies the common aggressive position and forces T's back.",
      from: "CT Spawn",
      video: "videos/inferno/car-molotov.mp4",
      screenshots: ["images/screenshots/inferno/car-molotov.jpg"],
      mapMarker: { x: 55, y: 70 },
      tags: ["CT Side", "B Site", "Retake"]
    },

    // ── ANUBIS ────────────────────────────────────────────────────────────
    {
      id: 13,
      map: "anubis",
      type: "Smoke",
      title: "Bridge smoke",
      description: "Critical smoke for A site takes. From T mid, aim at the pillar corner and jump-throw.\nCuts off rotation from bridge.",
      from: "T Mid",
      video: "videos/anubis/bridge-smoke.mp4",
      screenshots: ["images/screenshots/anubis/bridge-smoke.jpg"],
      mapMarker: { x: 55, y: 42 },
      tags: ["Mid", "A Site", "Essential"]
    },

    {
      id: 14,
      map: "anubis",
      type: "Smoke",
      title: "Canal smoke",
      description: "From B main, throw at the arch above canal.\nSmokes off the water channel allowing safe passage without being spotted from CT.",
      from: "B Main",
      video: "videos/anubis/canal-smoke.mp4",
      screenshots: ["images/screenshots/anubis/canal-smoke.jpg"],
      mapMarker: { x: 35, y: 60 },
      tags: ["B Main", "B Site"]
    },

    {
      id: 15,
      map: "anubis",
      type: "Guide",
      title: "A site execute guide",
      description: "Anubis A site requires coordinated smokes and flashes.\n\n**Required smokes:** Bridge, CT, Connector.\n**Flash role:** One player throws pop flash from mid before entry.\n**Entry:** Two players push column side, one pushes platform.",
      from: "Multiple",
      video: "videos/anubis/a-execute.mp4",
      screenshots: ["images/screenshots/anubis/a-execute.jpg"],
      mapMarker: { x: 62, y: 35 },
      tags: ["A Site", "Strategy", "Execute"]
    }
  ]
};