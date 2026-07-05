/* TradeWise — homepage content & interactions */
(function () {
  "use strict";
  var TG = "https://telegram.me/TradesWise";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Duplicate marquee for seamless loop */
  var mq = $("#marquee");
  if (mq) mq.innerHTML += mq.innerHTML;

  /* ============ PLANS ============ */
  var plans = [
    { name: "Plan 1", price: "₹99",  ret: "₹5,999",  feats: ["Professional trade analysis", "Daily market coverage", "Telegram community access"] },
    { name: "Plan 2", price: "₹199", ret: "₹14,999", feats: ["Everything in Plan 1", "Technical analysis insights", "Entry & exit guidance"] },
    { name: "Plan 3", price: "₹299", ret: "₹25,999", feats: ["Everything in Plan 2", "Trend identification", "Risk management insights"], featured: true },
    { name: "Plan 4", price: "₹399", ret: "₹36,999", feats: ["Everything in Plan 3", "Priority Telegram updates", "Extended market coverage"] },
    { name: "Plan 5", price: "₹499", ret: "₹49,999", feats: ["Everything in Plan 4", "Premium priority support", "Full analyst insights"] }
  ];
  var check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  var plansGrid = $("#plansGrid");
  if (plansGrid) {
    plansGrid.innerHTML = plans.map(function (p) {
      return '<div class="plan' + (p.featured ? " featured" : "") + '">' +
        '<div class="plan-name">' + p.name + '</div>' +
        '<div class="plan-price">' + p.price + ' <small>/ plan</small></div>' +
        '<div class="plan-return"><span class="lbl">Return Text</span><span class="amt">' + p.ret + '</span></div>' +
        '<ul class="plan-list">' + p.feats.map(function (f) { return '<li>' + check + '<span>' + f + '</span></li>'; }).join("") + '</ul>' +
        '<a href="' + TG + '" target="_blank" rel="noopener" class="btn ' + (p.featured ? "btn-gold" : "btn-primary") + ' btn-block">Join on Telegram</a>' +
      '</div>';
    }).join("");
  }

  /* ============ FEATURES ============ */
  var featIcon = {
    market: '<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/>',
    tech: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
    trend: '<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',
    entry: '<path d="M9 11l3 3 8-8"/><path d="M21 12a9 9 0 1 1-6.2-8.5"/>',
    risk: '<path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
    fast: '<path d="M13 2 3 14h7l-1 8 10-12h-7z"/>',
    daily: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    community: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'
  };
  var features = [
    ["market", "Professional Market Analysis", "In-depth study of market conditions and price action by experienced analysts."],
    ["tech", "Technical Analysis", "Charts, patterns and indicators broken down into clear, actionable insights."],
    ["trend", "Trend Identification", "Spot bullish and bearish trends early so you're never trading blind."],
    ["entry", "Entry & Exit Guidance", "Structured levels for entries, targets and stop-losses on every setup."],
    ["risk", "Risk Management Insights", "Protect your capital with disciplined, risk-first analysis."],
    ["fast", "Fast Telegram Updates", "Real-time alerts delivered the moment opportunities appear."],
    ["daily", "Daily Market Coverage", "Consistent morning-to-close coverage across major markets."],
    ["community", "Community Support", "Join an active community of traders learning and growing together."]
  ];
  var featuresGrid = $("#featuresGrid");
  if (featuresGrid) {
    featuresGrid.innerHTML = features.map(function (f) {
      return '<div class="feature reveal">' +
        '<div class="feature-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + featIcon[f[0]] + '</svg></div>' +
        '<h3>' + f[1] + '</h3><p>' + f[2] + '</p></div>';
    }).join("");
  }

  /* ============ STATS (animated counters) ============ */
  var stats = [
    { n: 25000, suffix: "+", label: "Members" },
    { n: 120000, suffix: "+", label: "Trades Analyzed" },
    { n: 15, suffix: "+", label: "Daily Signals" },
    { n: 98, suffix: "%", label: "Customer Satisfaction" },
    { n: 7, suffix: "+", label: "Years of Experience" }
  ];
  var fmt = function (n) { return n >= 1000 ? Math.round(n).toLocaleString("en-IN") : Math.round(n); };
  var statsGrid = $("#statsGrid");
  if (statsGrid) {
    statsGrid.innerHTML = stats.map(function (s) {
      return '<div class="stat"><div class="num" data-target="' + s.n + '" data-suffix="' + s.suffix + '">0<span class="suffix">' + s.suffix + '</span></div><div class="lbl">' + s.label + '</div></div>';
    }).join("");
  }
  function animateCount(el) {
    var target = +el.dataset.target, suffix = el.dataset.suffix, dur = 1600, start = performance.now();
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = fmt(target * eased) + '<span class="suffix">' + suffix + '</span>';
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ============ FAQ ============ */
  var faqs = [
    ["How does TradeWise work?", "Our experienced analysts study market trends, price action and technical indicators, then share high-quality trading insights, setups and daily coverage directly inside our Telegram channel."],
    ["How do I get Telegram access?", "Simply tap any “Join on Telegram” button on this page. It opens our official Telegram channel in a new tab where you can join instantly and start receiving analysis."],
    ["How does payment work?", "Choose a plan that fits your goals and complete the process shared inside Telegram. Prices shown here are placeholders and may be updated. Reach out on Telegram for current pricing and payment details."],
    ["What do the different plans include?", "Each higher plan builds on the previous one — adding deeper analysis, more guidance, priority updates and premium support. All plans include full access to our Telegram channel."],
    ["What kind of support do you offer?", "Members get community support and priority assistance on higher plans. You can always reach us directly through our Telegram channel for help."],
    ["What is your refund policy?", "[Placeholder] Please see our Refund Policy page for full details. Contact us on Telegram for the latest information before purchasing any plan."],
    ["Are there risks involved in trading?", "Yes. Trading in financial markets carries substantial risk of loss and is not suitable for everyone. TradeWise provides educational analysis and insights only — not financial advice. Always trade responsibly and do your own research."]
  ];
  var faqWrap = $("#faqWrap");
  if (faqWrap) {
    faqWrap.innerHTML = faqs.map(function (f) {
      return '<div class="faq-item reveal">' +
        '<button class="faq-q">' + f[0] + '<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></button>' +
        '<div class="faq-a"><p>' + f[1] + '</p></div></div>';
    }).join("");
    $$(".faq-item").forEach(function (item) {
      var q = $(".faq-q", item), a = $(".faq-a", item);
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        $$(".faq-item").forEach(function (o) { o.classList.remove("open"); $(".faq-a", o).style.maxHeight = null; });
        if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
      });
    });
  }

  /* ============ TESTIMONIALS (lazy-loaded, up to 1000) ============ */
  var grid = $("#tstGrid");
  if (grid) {
    var first = ["Aarav","Vivaan","Aditya","Diego","Sofia","Liam","Noah","Emma","Olivia","Mohammed","Fatima","Chen","Wei","Hiroshi","Yuki","Lucas","Mateo","Isabella","James","Amara","Kwame","Priya","Rohan","Ananya","Ethan","Mia","Omar","Layla","Santiago","Valentina","Nikolai","Anastasia","Sven","Ingrid","Thabo","Zanele","Arjun","Kavya","Daniel","Hannah"];
    var last = ["Sharma","Patel","Kumar","Garcia","Rodriguez","Smith","Johnson","Williams","Al-Farsi","Hassan","Wang","Li","Tanaka","Sato","Silva","Santos","Brown","Okafor","Mensah","Nair","Reddy","Iyer","Miller","Davis","Khan","Ahmed","Fernandez","Torres","Petrov","Ivanova","Larsson","Nielsen","Dlamini","Mokoena","Gupta","Rao","Wilson","Taylor"];
    var countries = [
      ["India","🇮🇳"],["United States","🇺🇸"],["United Kingdom","🇬🇧"],["Canada","🇨🇦"],["Australia","🇦🇺"],
      ["Germany","🇩🇪"],["France","🇫🇷"],["Spain","🇪🇸"],["Brazil","🇧🇷"],["Mexico","🇲🇽"],
      ["UAE","🇦🇪"],["Saudi Arabia","🇸🇦"],["Singapore","🇸🇬"],["Japan","🇯🇵"],["China","🇨🇳"],
      ["Nigeria","🇳🇬"],["South Africa","🇿🇦"],["Kenya","🇰🇪"],["Netherlands","🇳🇱"],["Sweden","🇸🇪"]
    ];
    var reviews = [
      "The analysis is clear and easy to follow. The entry and exit guidance has genuinely improved how I approach my trades.",
      "Really impressed with the daily market coverage. I feel far more informed before I place any trade now.",
      "The risk management insights alone are worth it. I've learned to protect my capital much better.",
      "Fast Telegram updates mean I never miss a setup. The team is responsive and professional.",
      "Trend identification is spot on. As a beginner this community has taught me so much.",
      "Technical analysis breakdowns are simple to understand even without a finance background.",
      "Great community — supportive members and quality insights every single day.",
      "I appreciate how disciplined and structured the analysis is. No hype, just solid research.",
      "The signals are well explained with proper reasoning. That transparency builds real trust.",
      "Been following for a while and the consistency of the coverage stands out the most.",
      "Professional, reliable and easy to follow. Exactly what I was looking for as a busy trader.",
      "The Telegram channel is active and the updates are genuinely timely. Highly recommend giving it a try.",
      "Clear setups, clear risk levels, clear communication. Everything a trader needs in one place.",
      "The educational value here is excellent. I'm learning to read the market for myself.",
      "Love the daily coverage and the calm, no-nonsense approach to analysis."
    ];
    var RATINGS = [5,5,5,5,4,5,5,4,5,5,4,5];
    // seeded pseudo-random (deterministic, avoids Math.random)
    var seed = 987654321;
    var rnd = function () { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    var pick = function (arr) { return arr[Math.floor(rnd() * arr.length)]; };
    var avatarColors = ["#10b981","#059669","#d4af37","#0ea5e9","#8b5cf6","#f59e0b","#ec4899","#14b8a6"];

    var TOTAL = 1000;
    var dataset = [];
    var startDate = Date.UTC(2025, 0, 1);
    for (var i = 0; i < TOTAL; i++) {
      var fn = pick(first), ln = pick(last), c = pick(countries);
      var r = RATINGS[Math.floor(rnd() * RATINGS.length)];
      var d = new Date(startDate + Math.floor(rnd() * 550) * 86400000);
      dataset.push({
        name: fn + " " + ln,
        country: c[0], flag: c[1],
        rating: r,
        text: pick(reviews),
        date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        ts: d.getTime(),
        color: avatarColors[i % avatarColors.length],
        initials: (fn[0] + ln[0]).toUpperCase()
      });
    }
    dataset.sort(function (a, b) { return b.ts - a.ts; });

    var countrySel = $("#tstCountry");
    countries.map(function (c) { return c[0]; }).sort().forEach(function (c) {
      var o = document.createElement("option"); o.value = c; o.textContent = c; countrySel.appendChild(o);
    });

    var sentinel = $("#tstSentinel"), loader = $(".tst-loader", sentinel), countEl = $("#tstCount");
    var PAGE = 12;
    var filtered = dataset, rendered = 0;
    var star = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z"/></svg>';

    function cardHTML(t) {
      var stars = "";
      for (var k = 0; k < 5; k++) stars += k < t.rating ? star : star.replace('fill="currentColor"', 'fill="currentColor" opacity="0.2"');
      return '<div class="tst-card">' +
        '<div class="tst-head">' +
          '<div class="tst-avatar" style="background:linear-gradient(135deg, ' + t.color + ', ' + t.color + 'bb)">' + t.initials + '</div>' +
          '<div class="tst-info">' +
            '<div class="tst-name">' + t.name + ' <span class="tst-flag" title="' + t.country + '">' + t.flag + '</span></div>' +
            '<div class="tst-sub"><span class="tst-stars">' + stars + '</span> · ' + t.date + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="tst-text">"' + t.text + '"</div>' +
        '<span class="tst-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Verified member · ' + t.country + '</span>' +
      '</div>';
    }

    function renderMore() {
      if (rendered >= filtered.length) { loader.style.display = "none"; return; }
      var next = filtered.slice(rendered, rendered + PAGE);
      var frag = document.createElement("div");
      frag.innerHTML = next.map(cardHTML).join("");
      while (frag.firstChild) grid.appendChild(frag.firstChild);
      rendered += next.length;
      loader.style.display = rendered >= filtered.length ? "none" : "block";
    }

    function applyFilter() {
      var q = $("#tstSearch").value.trim().toLowerCase();
      var c = countrySel.value;
      filtered = dataset.filter(function (t) {
        return (!c || t.country === c) &&
          (!q || t.name.toLowerCase().indexOf(q) > -1 || t.text.toLowerCase().indexOf(q) > -1 || t.country.toLowerCase().indexOf(q) > -1);
      });
      grid.innerHTML = "";
      rendered = 0;
      countEl.textContent = filtered.length.toLocaleString("en-IN") + " review" + (filtered.length === 1 ? "" : "s") + " · showing demo data";
      if (!filtered.length) { grid.innerHTML = '<div class="tst-empty">No reviews match your search.</div>'; loader.style.display = "none"; return; }
      renderMore();
    }

    var searchTimer;
    $("#tstSearch").addEventListener("input", function () { clearTimeout(searchTimer); searchTimer = setTimeout(applyFilter, 180); });
    countrySel.addEventListener("change", applyFilter);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) renderMore(); });
      }, { rootMargin: "300px" }).observe(sentinel);
    } else {
      window.addEventListener("scroll", function () {
        if (sentinel.getBoundingClientRect().top < window.innerHeight + 300) renderMore();
      }, { passive: true });
    }
    applyFilter();
  }

  /* ============ SCROLL REVEAL + counters ============ */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          if (e.target.id === "performance") $$(".num", e.target).forEach(animateCount);
          if (e.target.classList.contains("reveal")) obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
    var perf = $("#performance");
    if (perf) io.observe(perf);
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
    $$(".num").forEach(animateCount);
  }
})();
