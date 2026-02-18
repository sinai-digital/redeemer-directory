import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

const sb = createClient(
  "https://fvmlpzfqdfdczdvcrxqp.supabase.co",
  "REMOVED_SERVICE_ROLE_KEY"
);

function slug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function run() {
  // --- 1. Create stub auth users + profiles ---
  const members = [
    { name: "Karen McCarthy", email: "karen.mccarthy@example.com" },
    { name: "Sarah Pike", email: "sarah.pike@example.com" },
    { name: "Grace Kim", email: "grace.kim@example.com" },
    { name: "William Davis", email: "william.davis@example.com" },
    { name: "Carlos Rivera", email: "carlos.rivera@example.com" },
    { name: "Patricia Henderson", email: "patricia.henderson@example.com" },
    { name: "Lisa Sanders", email: "lisa.sanders@example.com" },
    { name: "Raj Patel", email: "raj.patel@example.com" },
    { name: "Brian McCarthy", email: "brian.mccarthy@example.com" },
    { name: "Amanda Brooks", email: "amanda.brooks@example.com" },
    { name: "Thomas Mitchell", email: "thomas.mitchell@example.com" },
    { name: "Daniel Kim", email: "daniel.kim@example.com" },
    { name: "Marcus Williams", email: "marcus.williams@example.com" },
    { name: "Angela Thompson", email: "angela.thompson@example.com" },
    { name: "Robert Henderson", email: "robert.henderson@example.com" },
  ];

  const profileIds = {};
  profileIds["Matt Pike"] = "e52df578-34f0-482c-aee4-130617973357";

  for (const m of members) {
    const { data, error } = await sb.auth.admin.createUser({
      email: m.email,
      password: "seedpassword123!",
      email_confirm: true,
      user_metadata: { display_name: m.name },
    });
    if (error) {
      const { data: list } = await sb.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const existing = list?.users?.find((u) => u.email === m.email);
      if (existing) {
        profileIds[m.name] = existing.id;
        // Ensure profile exists
        await sb.from("profiles").upsert({
          id: existing.id,
          email: m.email,
          role: "member",
          display_name: m.name,
          is_onboarded: true,
        });
        console.log("Exists:", m.name);
      } else {
        console.error("FAIL creating", m.name, error.message);
      }
      continue;
    }
    profileIds[m.name] = data.user.id;
    await sb.from("profiles").upsert({
      id: data.user.id,
      email: m.email,
      role: "member",
      display_name: m.name,
      is_onboarded: true,
    });
    console.log("Created:", m.name);
  }

  console.log("\nTotal profiles:", Object.keys(profileIds).length);

  // --- 2. Clean up old posts/comments ---
  await sb.from("forum_comments").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await sb.from("forum_posts").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  console.log("Cleaned old posts/comments");

  // --- Category IDs ---
  const CAT = {
    general: "6883c2c8-8c34-4beb-ad8c-b496b9dfbc72",
    prayer: "15e0b6c8-c9b8-4c50-a1c7-bcf6e86ef1f9",
    bible: "305341ab-2c48-4e53-a54b-5c092f610c7e",
    announce: "e7225b77-c098-4345-afdd-5a8dac48c056",
    fellow: "ad01d0ae-e02f-4c65-a30c-eede8684c08e",
    serving: "ef517afa-cdf2-465a-a539-9d66876557e9",
    youth: "5d1a6c13-e80b-4eb9-a179-c0126373e05d",
    praise: "2f8783f8-6f56-4a08-a020-a20c80f6da1b",
  };

  const p = profileIds;

  // --- 3. Insert posts ---
  const posts = [
    // General Discussion
    {
      id: randomUUID(), cat: CAT.general, author: p["Matt Pike"],
      title: "Welcome to the New Church Directory!",
      body: `Hi everyone!\n\nWe're excited to launch our new online church directory and community forum. This is a place for our church family to stay connected, share prayer requests, discuss Scripture, and coordinate serving opportunities.\n\nPlease take a moment to update your profile and explore the different forum categories. If you have any questions or run into issues, feel free to post here or reach out to me directly.\n\nLooking forward to seeing this community grow!`,
      pinned: true,
    },
    {
      id: randomUUID(), cat: CAT.general, author: p["Brian McCarthy"],
      title: "Best local coffee shops for small group meetups?",
      body: `Our small group is looking for a good spot to meet on weekday evenings. Somewhere with decent seating for 8-10 people, not too loud, and ideally open until at least 9pm.\n\nWe've tried Starbucks on 301 but it gets pretty packed. Anyone have other suggestions in the Riverview/Brandon area?`,
      pinned: false,
    },
    {
      id: randomUUID(), cat: CAT.general, author: p["Amanda Brooks"],
      title: "Lost & Found - items left after Sunday service",
      body: `Found a few items after last Sunday's service:\n\n- A children's blue water bottle with dinosaur stickers\n- A black leather Bible with the name 'J. Thompson' inscribed\n- A set of car keys with a Tampa Bay Rays keychain\n\nThese are at the welcome desk. Please grab them next Sunday or let me know and I can hold them for you!`,
      pinned: false,
    },

    // Prayer Requests
    {
      id: randomUUID(), cat: CAT.prayer, author: p["Grace Kim"],
      title: "Praying for my mother's health",
      body: `Hi church family,\n\nI'm asking for prayer for my mother who lives in Ohio. She was recently diagnosed with early-stage breast cancer and will be starting treatment next month.\n\nPlease pray for:\n- **Wisdom** for her doctors as they develop a treatment plan\n- **Peace** for my mom as she processes everything\n- **Strength** for our family as we support her from a distance\n\nI'm so grateful for this church family. It means the world to us.\n\nWith love,\nGrace`,
      pinned: false,
    },
    {
      id: randomUUID(), cat: CAT.prayer, author: p["Karen McCarthy"],
      title: "Prayer for the Henderson family",
      body: `Dear church family,\n\nPlease keep the Henderson family in your prayers this week. Robert is having knee surgery on Thursday and will need several weeks of recovery.\n\nPatricia could also use encouragement as she takes on extra responsibilities during this time. If anyone is able to help with meals, that would be a tremendous blessing.\n\n> 'Cast all your anxiety on him because he cares for you.' - 1 Peter 5:7\n\nThank you for your faithful prayers!`,
      pinned: true,
    },
    {
      id: randomUUID(), cat: CAT.prayer, author: p["Angela Thompson"],
      title: "Job search - please pray for direction",
      body: `Hey everyone,\n\nAs some of you know, my company went through layoffs last month and I was affected. I'm actively looking for a new position in healthcare administration.\n\nI'd appreciate prayers for:\n- Doors to open for the right opportunity\n- Peace during this uncertain time\n- Financial provision for our family\n\nIf anyone has connections in healthcare in the Tampa Bay area, I'd welcome any leads. Thank you all so much.`,
      pinned: false,
    },

    // Bible Study
    {
      id: randomUUID(), cat: CAT.bible, author: p["William Davis"],
      title: "Romans 8 Discussion - Wednesday Night Study",
      body: `For those following along with our Wednesday night Romans study, this week we're diving into **Chapter 8** - one of the most powerful chapters in all of Scripture.\n\n## Key themes to discuss:\n1. Life in the Spirit vs. life in the flesh (v. 1-11)\n2. Our adoption as children of God (v. 12-17)\n3. Future glory and present suffering (v. 18-30)\n4. Nothing can separate us from God's love (v. 31-39)\n\n**Discussion question:** What does verse 28 ('all things work together for good') mean in the context of the whole chapter? How have you seen this truth play out in your own life?\n\nLooking forward to Wednesday!`,
      pinned: false,
    },
    {
      id: randomUUID(), cat: CAT.bible, author: p["Thomas Mitchell"],
      title: "Book recommendation: Knowing God by J.I. Packer",
      body: `I just finished re-reading **Knowing God** by J.I. Packer and wanted to recommend it to anyone looking for a deep but accessible theology book.\n\nPacker does an incredible job of making the attributes of God feel personal and practical rather than just academic. The chapters on God's wisdom and God's grace were especially impactful for me this time through.\n\nWould anyone be interested in doing an informal book study on this? Maybe meeting every other week over coffee to discuss a few chapters at a time?`,
      pinned: false,
    },

    // Announcements
    {
      id: randomUUID(), cat: CAT.announce, author: p["Matt Pike"],
      title: "Summer VBS Registration Now Open!",
      body: `# Vacation Bible School 2026\n\nWe're excited to announce that **VBS registration is now open!**\n\n**Dates:** June 15-19, 2026\n**Time:** 9:00 AM - 12:00 PM\n**Ages:** 4 years old through 5th grade\n\n## What to Expect\n- Bible stories and lessons\n- Worship and music\n- Crafts and games\n- Snacks provided daily\n\n## Volunteer Needs\nWe still need volunteers in the following areas:\n- Group leaders\n- Craft station helpers\n- Snack preparation\n- Registration desk\n\nPlease sign up at the welcome desk on Sunday or contact Sarah Pike for more information.\n\n*Let's make this the best VBS yet!*`,
      pinned: true,
    },
    {
      id: randomUUID(), cat: CAT.announce, author: p["Lisa Sanders"],
      title: "Church workday - Saturday March 7th",
      body: `Hey church family!\n\nWe're organizing a church workday on **Saturday, March 7th from 8am to noon**. We have several projects that need attention:\n\n- Pressure washing the sidewalks and portico\n- Mulching the flower beds\n- Painting the children's wing hallway\n- Deep cleaning the fellowship hall kitchen\n\nPlease bring work gloves and any tools you have. We'll provide coffee, donuts, and lunch for everyone who helps.\n\nSign up at the welcome desk or just reply here so we can plan accordingly!`,
      pinned: false,
    },

    // Fellowship
    {
      id: randomUUID(), cat: CAT.fellow, author: p["Carlos Rivera"],
      title: "Guys' fishing trip - Lake Tarpon, March 15th",
      body: `Calling all fishermen (and those who want to learn)!\n\nI'm organizing a men's fishing trip to **Lake Tarpon on Saturday, March 15th**. Planning to launch around 6:30 AM and fish until early afternoon.\n\nI have room for 2 more in my boat. If you have your own boat, even better - the more the merrier!\n\n**What to bring:**\n- Fishing gear (I have some extras if needed)\n- Sunscreen and hat\n- Drinks and snacks\n- Valid FL fishing license\n\nLet me know if you're interested!`,
      pinned: false,
    },
    {
      id: randomUUID(), cat: CAT.fellow, author: p["Sarah Pike"],
      title: "Ladies' brunch - Saturday February 28th",
      body: `Ladies! You're invited to our next women's brunch!\n\n**When:** Saturday, February 28th at 10:00 AM\n**Where:** First Watch in Brandon (Regency Square)\n**RSVP:** Please reply here or text me so I can make a reservation\n\nThis is just a casual time to eat good food and enjoy each other's company. All women of the church are welcome - and feel free to bring a friend!\n\nLast time we had such a wonderful turnout. Looking forward to seeing everyone!`,
      pinned: false,
    },

    // Serving Opportunities
    {
      id: randomUUID(), cat: CAT.serving, author: p["Patricia Henderson"],
      title: "Nursery volunteers needed for Sunday mornings",
      body: `We are in need of additional nursery volunteers for the **9:00 AM and 10:30 AM services**. We're looking for people willing to serve on a rotating basis - even once a month would be a huge help!\n\nAll volunteers will need to complete our child safety training (takes about an hour online). Background checks are handled by the church office.\n\nIf you love little ones and want to serve in this vital ministry, please reach out to me or sign up at the children's check-in desk.\n\nThank you for considering this!`,
      pinned: false,
    },
    {
      id: randomUUID(), cat: CAT.serving, author: p["Marcus Williams"],
      title: "Habitat for Humanity build day - volunteers needed",
      body: `Our church has committed to a **Habitat for Humanity build day on Saturday, April 5th** in Wimauma. We need 15-20 volunteers.\n\nNo construction experience necessary - Habitat provides all training on site. This is a great opportunity to serve our broader community and work alongside other local churches.\n\n**Details:**\n- Date: Saturday, April 5th\n- Time: 7:30 AM - 3:00 PM\n- Location: Wimauma (exact address TBD)\n- Lunch provided on site\n- Must be 16+ to participate\n\nSign up below!`,
      pinned: false,
    },

    // Youth & Families
    {
      id: randomUUID(), cat: CAT.youth, author: p["Daniel Kim"],
      title: "Youth group camping trip - April 18-19",
      body: `Attention parents and teens!\n\nWe're planning an overnight camping trip to **Hillsborough River State Park on April 18-19**. This will be a great time of fellowship, campfire worship, and outdoor fun.\n\n**Cost:** $25 per student (covers food and campsite fees)\n**What to bring:** Tent, sleeping bag, flashlight, bug spray, Bible\n\nPermission slips will be available at youth group starting this Wednesday. All forms and payment due by April 11th.\n\nParent chaperones welcome! We need at least 4 adults. Let me know if you can help.`,
      pinned: false,
    },
    {
      id: randomUUID(), cat: CAT.youth, author: p["Amanda Brooks"],
      title: "Recommendations for family devotionals?",
      body: `We're trying to be more intentional about doing devotionals as a family but we're struggling to find material that works for our age range (kids are 5, 8, and 11).\n\nAnything that's too simple bores the oldest, and anything too deep loses the youngest. Has anyone found a good resource that bridges that gap?\n\nWe've tried the Jesus Storybook Bible (great for the little one but the older two have outgrown it) and Long Story Short by Marty Machowski.\n\nOpen to any suggestions!`,
      pinned: false,
    },

    // Praise Reports
    {
      id: randomUUID(), cat: CAT.praise, author: p["Raj Patel"],
      title: "God is faithful - new job after months of searching",
      body: `I just wanted to share some wonderful news with our church family. After nearly four months of job searching, I received and accepted an offer last Friday!\n\nThe new role is exactly what I was hoping for - better hours, closer to home, and in a field I'm passionate about. God's timing was perfect, even when I couldn't see it.\n\nThank you to everyone who prayed for me during this season. Your encouragement meant more than you know. Special thanks to Thomas Mitchell for connecting me with his colleague - that introduction made all the difference.\n\n*'The LORD is my strength and my shield; my heart trusts in him, and he helps me.' - Psalm 28:7*`,
      pinned: false,
    },
    {
      id: randomUUID(), cat: CAT.praise, author: p["Robert Henderson"],
      title: "Surgery went well - thank you for the prayers!",
      body: `Just a quick update - my knee surgery went smoothly on Thursday! The surgeon said everything looked better than expected and recovery should be straightforward.\n\nI'm home resting now and already overwhelmed by the kindness of this church. We've received three meals already and so many encouraging texts and cards.\n\nThank you for lifting us up in prayer. Patricia and I are so grateful for this community. I should be back on my feet (slowly!) in a few weeks.\n\nGod is good!`,
      pinned: false,
    },
  ];

  const postMap = {};
  for (const post of posts) {
    const { error } = await sb.from("forum_posts").insert({
      id: post.id,
      category_id: post.cat,
      author_id: post.author,
      title: post.title,
      slug: slug(post.title),
      body: post.body,
      status: "published",
      is_pinned: post.pinned,
      is_locked: false,
      comment_count: 0,
    });
    if (error) console.error("Post fail:", post.title.slice(0, 40), error.message);
    else console.log("Post:", post.title.slice(0, 55));
    postMap[post.title] = post.id;
  }

  // --- 4. Insert comments ---
  const comments = [
    // Welcome post
    { post: "Welcome to the New Church Directory!", author: p["Karen McCarthy"],
      body: "This is wonderful, Matt! So much easier than the old paper directory. Thanks for putting this together." },
    { post: "Welcome to the New Church Directory!", author: p["Grace Kim"],
      body: "Love this! Already updated my profile. The forum is a great addition too." },
    { post: "Welcome to the New Church Directory!", author: p["Carlos Rivera"],
      body: "Great work! Quick question - is there a way to hide my phone number from the directory? I'd prefer just email." },

    // Coffee shops
    { post: "Best local coffee shops for small group meetups?", author: p["Lisa Sanders"],
      body: "We love **Buddy Brew** in Brandon! They have a back room area that's usually pretty quiet in the evenings. Highly recommend." },
    { post: "Best local coffee shops for small group meetups?", author: p["Daniel Kim"],
      body: "Seconding Buddy Brew. Also check out Foundation Coffee in Riverview - they close at 9 but the space is great for groups." },
    { post: "Best local coffee shops for small group meetups?", author: p["Amanda Brooks"],
      body: "Our small group actually meets at Panera on Bloomingdale. Not the coziest but the booth area works well and they don't mind us staying a while." },

    // Grace's prayer request
    { post: "Praying for my mother's health", author: p["Karen McCarthy"],
      body: "Praying for your mom and your whole family, Grace. Please keep us updated. We're here for you." },
    { post: "Praying for my mother's health", author: p["Patricia Henderson"],
      body: "Lifting your mother up in prayer right now. God is faithful and He is with her through this. Hugs to you, sweet friend." },
    { post: "Praying for my mother's health", author: p["William Davis"],
      body: "Praying for wisdom for the doctors and peace for your family. Don't hesitate to reach out if you need anything." },
    { post: "Praying for my mother's health", author: p["Sarah Pike"],
      body: "Grace, we love you and are praying. If you need to fly out to be with her, let us know - we can help coordinate things here." },

    // Henderson prayer
    { post: "Prayer for the Henderson family", author: p["Matt Pike"],
      body: "We're praying for Robert and Patricia! I can help coordinate a meal train - will set one up and share the link." },
    { post: "Prayer for the Henderson family", author: p["Grace Kim"],
      body: "Praying for a smooth surgery and quick recovery! We'd love to bring a meal - just let us know what day works." },
    { post: "Prayer for the Henderson family", author: p["Angela Thompson"],
      body: "We'll be praying! Robert, know that you're in good hands - both the surgeon's and the Lord's." },

    // Job search
    { post: "Job search - please pray for direction", author: p["Thomas Mitchell"],
      body: "Angela, I actually have a colleague at AdventHealth who mentioned they're hiring in their admin department. Let me get you connected. Praying for you!" },
    { post: "Job search - please pray for direction", author: p["Raj Patel"],
      body: "I went through a similar season last year. Praying for you and your family. God's timing is perfect even when it doesn't feel like it." },

    // Romans study
    { post: "Romans 8 Discussion - Wednesday Night Study", author: p["Grace Kim"],
      body: "Such a rich chapter! I think verse 28 is so often taken out of context. When you read it alongside v. 29 ('to be conformed to the image of his Son'), it becomes clear that the 'good' God works toward is our sanctification, not necessarily our comfort. Excited for Wednesday!" },
    { post: "Romans 8 Discussion - Wednesday Night Study", author: p["Thomas Mitchell"],
      body: "Great discussion prompts, William. I'd add verses 26-27 about the Spirit interceding for us. What a comfort to know that even when we don't know how to pray, the Spirit prays for us." },
    { post: "Romans 8 Discussion - Wednesday Night Study", author: p["Matt Pike"],
      body: `Can't wait for this one. Romans 8:1 alone is worth an entire evening - 'no condemnation for those in Christ Jesus.' What freedom!` },

    // Book recommendation
    { post: "Book recommendation: Knowing God by J.I. Packer", author: p["William Davis"],
      body: "One of my all-time favorites! I'd be interested in a book study. Tuesday evenings could work for me." },
    { post: "Book recommendation: Knowing God by J.I. Packer", author: p["Lisa Sanders"],
      body: "I've been meaning to read this for years. A group study would be the perfect motivation. Count me in!" },

    // VBS
    { post: "Summer VBS Registration Now Open!", author: p["Amanda Brooks"],
      body: "So excited! All three of my kids are already asking about it. Registered them this morning. I can also help with crafts!" },
    { post: "Summer VBS Registration Now Open!", author: p["Karen McCarthy"],
      body: "I'd love to help at the registration desk. I'll sign up on Sunday!" },
    { post: "Summer VBS Registration Now Open!", author: p["Daniel Kim"],
      body: "Our youth group students might be interested in volunteering as group leader helpers. I'll bring it up at youth group this week." },

    // Church workday
    { post: "Church workday - Saturday March 7th", author: p["Brian McCarthy"],
      body: "I'll be there! I have a pressure washer I can bring. Also have some extra paint rollers if we need them for the children's wing." },
    { post: "Church workday - Saturday March 7th", author: p["Carlos Rivera"],
      body: "Count me and my son in. We can help with the mulching. I have a truck so I can pick up mulch from Home Depot beforehand if needed." },

    // Fishing trip
    { post: "Guys' fishing trip - Lake Tarpon, March 15th", author: p["Brian McCarthy"],
      body: "I'm in! I have my own kayak I could bring too. Do they allow kayak fishing on Tarpon?" },
    { post: "Guys' fishing trip - Lake Tarpon, March 15th", author: p["Matt Pike"],
      body: "Sounds great, Carlos! I don't have gear but I'd love to come. Haven't fished since I was a kid." },
    { post: "Guys' fishing trip - Lake Tarpon, March 15th", author: p["William Davis"],
      body: "Count me in. I'll bring my boat - can fit 3 more. Between your boat and mine we should have plenty of room." },

    // Ladies brunch
    { post: "Ladies' brunch - Saturday February 28th", author: p["Grace Kim"],
      body: "I'll be there! Can I bring my friend from work? She's been wanting to visit our church." },
    { post: "Ladies' brunch - Saturday February 28th", author: p["Patricia Henderson"],
      body: "Count me in! First Watch has the best avocado toast. Looking forward to it!" },
    { post: "Ladies' brunch - Saturday February 28th", author: p["Angela Thompson"],
      body: "So fun! I'll be there. Love that spot." },

    // Nursery
    { post: "Nursery volunteers needed for Sunday mornings", author: p["Sarah Pike"],
      body: "I can help with the 10:30 service! I already have my background check on file from VBS last year - does that still count?" },
    { post: "Nursery volunteers needed for Sunday mornings", author: p["Amanda Brooks"],
      body: "I'd love to help once a month at the 9:00 service. Just signed up for the safety training online." },

    // Habitat
    { post: "Habitat for Humanity build day - volunteers needed", author: p["Carlos Rivera"],
      body: "I'm in! I did a Habitat build a few years ago and it was an amazing experience. Great team-building too." },
    { post: "Habitat for Humanity build day - volunteers needed", author: p["Daniel Kim"],
      body: "Can 16-year-old youth group students participate? I think several of them would be interested." },
    { post: "Habitat for Humanity build day - volunteers needed", author: p["Marcus Williams"],
      body: "Yes Daniel, 16+ can participate! That would be awesome. Have them sign the waiver and bring a parent signature." },

    // Youth camping
    { post: "Youth group camping trip - April 18-19", author: p["Brian McCarthy"],
      body: "Our daughter is so excited about this. I can chaperone! Happy to help with campfire setup too." },
    { post: "Youth group camping trip - April 18-19", author: p["Grace Kim"],
      body: "This sounds like so much fun. I know a few of the kids from children's ministry would love this when they age up. Great to see the youth program thriving!" },

    // Family devotionals
    { post: "Recommendations for family devotionals?", author: p["Karen McCarthy"],
      body: "We loved **The Ology** by Marty Machowski for that mixed-age range. It covers systematic theology in a way that's accessible for young kids but still substantive enough for older ones." },
    { post: "Recommendations for family devotionals?", author: p["Patricia Henderson"],
      body: "Have you tried **Thoughts to Make Your Heart Sing** by Sally Lloyd-Jones? It's from the same author as the Jesus Storybook Bible but a bit more mature. Good bridge for that in-between age." },
    { post: "Recommendations for family devotionals?", author: p["William Davis"],
      body: "At that age range, we started reading straight through a Gospel together - one short passage each night, then everyone shares one thing they noticed. Keeps it simple but lets each kid engage at their level." },

    // Raj praise report
    { post: "God is faithful - new job after months of searching", author: p["Thomas Mitchell"],
      body: "So glad the introduction worked out, Raj! God opened that door and you walked through it. Congratulations!" },
    { post: "God is faithful - new job after months of searching", author: p["Angela Thompson"],
      body: "This is such an encouragement to read, especially as I'm going through my own job search right now. Praising God with you!" },
    { post: "God is faithful - new job after months of searching", author: p["Karen McCarthy"],
      body: "Wonderful news! God is so good. Congratulations to you and your family, Raj!" },

    // Robert's recovery
    { post: "Surgery went well - thank you for the prayers!", author: p["Karen McCarthy"],
      body: "Praise the Lord! So glad it went well, Robert. Rest up and let us know if you need anything at all." },
    { post: "Surgery went well - thank you for the prayers!", author: p["Matt Pike"],
      body: "Great news, Robert! Take it easy and let the church family take care of you and Patricia for a change." },
    { post: "Surgery went well - thank you for the prayers!", author: p["Grace Kim"],
      body: "So thankful for good news! We're bringing dinner on Tuesday - Patricia, I'll text you to coordinate." },
  ];

  const commentCount = {};
  for (const c of comments) {
    const postId = postMap[c.post];
    if (!postId) {
      console.error("No post found for:", c.post.slice(0, 40));
      continue;
    }

    const { error } = await sb.from("forum_comments").insert({
      id: randomUUID(),
      post_id: postId,
      author_id: c.author,
      body: c.body,
      is_removed: false,
    });
    if (error) console.error("Comment fail on", c.post.slice(0, 30), error.message);

    commentCount[postId] = (commentCount[postId] || 0) + 1;
  }

  // Update comment counts on posts
  for (const [postId, count] of Object.entries(commentCount)) {
    await sb.from("forum_posts").update({ comment_count: count }).eq("id", postId);
  }

  console.log(`\nDone! Inserted ${posts.length} posts and ${comments.length} comments`);
}

run().catch((e) => console.error(e));
