import { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  Play,
  X,
  RotateCcw,
  Check,
  Terminal,
  Code2,
  Award,
  Download,
  Printer,
  Menu,
} from "lucide-react";

/* ---------------------------------------------------------
   LEVEL UP :: LEARN HTML
   DevClub interactive course engine — JSON-driven lessons,
   live demo rendering, and a built-in code playground.
--------------------------------------------------------- */

const SECTIONS = [
  { id: "foundations", label: "Foundations" },
  { id: "content", label: "Content & Structure" },
  { id: "interaction", label: "Interaction" },
  { id: "advanced", label: "Level Up" },
  { id: "certification", label: "Certification" },
];

const PASS_PERCENT = 70;

const TOPICS = [
  {
    id: "intro",
    section: "foundations",
    title: "Document Structure",
    tagline: "The skeleton every page is built on",
    explanation:
      "Every HTML page starts with the same bones: a doctype that tells the browser which rules to follow, an <html> root, a <head> for metadata the visitor never sees, and a <body> for everything they do see. Get this shape right once and you'll never think about it again.",
    demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, DevClub!</h1>
  <p>This is the beginning of everything.</p>
</body>
</html>`,
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <!-- write something here -->
</body>
</html>`,
  },
  {
    id: "headings",
    section: "content",
    title: "Headings & Paragraphs",
    tagline: "Giving your content a voice",
    explanation:
      "Headings (<h1> through <h6>) rank your content by importance — one <h1> per page, ideally. Paragraphs (<p>) hold your body text. Browsers style these differently by default, and search engines and screen readers use them to understand your page's outline.",
    demoCode: `<h1>DevClub</h1>
<h2>Level Up 2.0</h2>
<p>A peer-to-peer program where seniors mentor juniors, one task at a time.</p>
<h3>This Week's Goal</h3>
<p>Finish the HTML basics and ship your first mini project.</p>`,
    starterCode: `<h1>Your name here</h1>
<h2>Your goal for this month</h2>
<p>Write a short paragraph about why you joined DevClub.</p>`,
  },
  {
    id: "formatting",
    section: "content",
    title: "Text Formatting",
    tagline: "Emphasis, structure, and small details",
    explanation:
      "Tags like <strong> and <em> add meaning, not just style — strong text matters more, emphasized text changes tone. <br> breaks a line, <hr> draws a divider, and <mark> highlights text like a highlighter pen.",
    demoCode: `<p><strong>Important:</strong> Submit your task before Saturday's meeting.</p>
<p>This project is <em>genuinely</em> fun once it clicks.</p>
<p>Status: <mark>In Review</mark></p>
<hr>
<p>Line one<br>Line two</p>`,
    starterCode: `<p>Make one word <strong>bold</strong> and one word <em>italic</em> in this sentence.</p>
<hr>
<p>First line<br>Second line</p>`,
  },
  {
    id: "links",
    section: "content",
    title: "Links & Navigation",
    tagline: "Connecting one page to another",
    explanation:
      "The <a> tag turns text or elements into clickable links using the href attribute. Add target=\"_blank\" to open a link in a new tab — useful for sending someone off-site without losing your page.",
    demoCode: `<a href="https://github.com">Visit GitHub</a>
<br>
<a href="https://github.com" target="_blank">Open in a new tab</a>
<br>
<a href="#top">Jump to top of page</a>`,
    starterCode: `<a href="">Link to your favorite website</a>`,
  },
  {
    id: "images",
    section: "content",
    title: "Images & Media",
    tagline: "Making the page visual",
    explanation:
      "The <img> tag embeds images using src for the file path and alt for a text description — required for accessibility and shown if the image fails to load. Wrap an image in <figure> with a <figcaption> when it needs a caption.",
    demoCode: `<figure>
  <img src="https://placehold.co/300x150" alt="DevClub banner" width="300">
  <figcaption>DevClub Level Up 2.0 banner</figcaption>
</figure>`,
    starterCode: `<img src="https://placehold.co/200x120" alt="describe the image here">`,
  },
  {
    id: "lists",
    section: "content",
    title: "Lists",
    tagline: "Ordering and grouping information",
    explanation:
      "Use <ul> for unordered (bulleted) lists and <ol> for ordered (numbered) lists. Every item goes inside an <li>. Lists can nest inside each other to show hierarchy, like a syllabus with sub-topics.",
    demoCode: `<h3>Level Up Roadmap</h3>
<ol>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript
    <ul>
      <li>DOM basics</li>
      <li>Events</li>
    </ul>
  </li>
</ol>`,
    starterCode: `<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>`,
  },
  {
    id: "tables",
    section: "content",
    title: "Tables",
    tagline: "Rows, columns, and real data",
    explanation:
      "Tables organize data in rows and columns using <table>, <tr> for each row, <th> for header cells, and <td> for data cells. They're for tabular data only — not for page layout.",
    demoCode: `<table border="1">
  <tr>
    <th>Week</th>
    <th>Topic</th>
  </tr>
  <tr>
    <td>1</td>
    <td>HTML</td>
  </tr>
  <tr>
    <td>2</td>
    <td>CSS</td>
  </tr>
</table>`,
    starterCode: `<table border="1">
  <tr>
    <th>Name</th>
    <th>Role</th>
  </tr>
  <tr>
    <td>Your name</td>
    <td>Mentee</td>
  </tr>
</table>`,
  },
  {
    id: "forms",
    section: "interaction",
    title: "Forms & Inputs",
    tagline: "Letting users send you something",
    explanation:
      "Forms collect input. <label> ties text to an <input> for accessibility, input type controls the kind of field (text, email, password...), and <button> submits or triggers an action. Every input a user can fill deserves a matching label.",
    demoCode: `<form>
  <label for="name">Name</label>
  <input type="text" id="name" placeholder="Your name">
  <br>
  <label for="email">Email</label>
  <input type="email" id="email" placeholder="you@example.com">
  <br>
  <button type="button">Submit</button>
</form>`,
    starterCode: `<form>
  <label for="task">Task</label>
  <input type="text" id="task" placeholder="This week's task">
  <br>
  <button type="button">Submit</button>
</form>`,
  },
  {
    id: "divspan",
    section: "interaction",
    title: "Div, Span & Block vs Inline",
    tagline: "Grouping content for styling",
    explanation:
      "<div> is a block-level container — it stacks and takes full width. <span> is inline — it sits within text without breaking the line. Neither means anything on their own; they exist purely to group content so CSS or JavaScript can target it.",
    demoCode: `<div style="border:1px solid gray; padding:8px;">
  This whole block is a div.
  <span style="color:crimson;">This part is a span</span>
  inside a sentence.
</div>`,
    starterCode: `<div>
  Put a <span>highlighted word</span> inside this sentence.
</div>`,
  },
  {
    id: "attributes",
    section: "interaction",
    title: "Attributes: id, class, data-*",
    tagline: "Labels that make elements targetable",
    explanation:
      "id gives one element a unique name (use once per page). class can be reused across many elements to group them for styling. data-* attributes store custom information a script can read later — invisible to the visitor, useful to your code.",
    demoCode: `<p id="intro">Unique — only one #intro exists.</p>
<p class="note">Reusable class</p>
<p class="note">Same class, different element</p>
<button data-action="submit-task">Submit Task</button>`,
    starterCode: `<p id="my-id">An element with a unique id</p>
<p class="highlight">An element with a class</p>`,
  },
  {
    id: "semantic",
    section: "advanced",
    title: "Semantic HTML5",
    tagline: "Tags that describe meaning, not just boxes",
    explanation:
      "Semantic tags like <header>, <nav>, <main>, <section>, <article>, and <footer> describe what content is, not just how it looks. Search engines, screen readers, and other developers can understand your page's structure at a glance instead of guessing from a pile of divs.",
    demoCode: `<header>
  <h1>DevClub</h1>
  <nav>Home | Events | Team</nav>
</header>
<main>
  <section>
    <h2>Level Up 2.0</h2>
    <p>Peer-led learning, one task at a time.</p>
  </section>
</main>
<footer>© DevClub</footer>`,
    starterCode: `<header>
  <h1>Your club or project name</h1>
</header>
<main>
  <section>
    <p>Write something inside a section</p>
  </section>
</main>`,
  },
  {
    id: "embeds",
    section: "advanced",
    title: "Iframes & Embeds",
    tagline: "Bringing in content from elsewhere",
    explanation:
      "<iframe> embeds another page inside yours — maps, videos, forms. <video> and <audio> embed media files directly, with the controls attribute adding play/pause/volume without any JavaScript.",
    demoCode: `<video controls width="260">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>
<p>Iframes work the same way, just pointed at a webpage URL instead.</p>`,
    starterCode: `<video controls width="260">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>`,
  },
  {
    id: "meta",
    section: "advanced",
    title: "Meta Tags & Basic SEO",
    tagline: "What the browser and Google see first",
    explanation:
      "Meta tags live in <head> and never render visually. charset sets text encoding, viewport controls mobile scaling, and description is what shows up under your link in Google search results.",
    demoCode: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="DevClub's peer-mentored learning program.">
  <title>Level Up 2.0 — DevClub</title>
</head>`,
    starterCode: `<head>
  <meta charset="UTF-8">
  <title>Give this page a title</title>
</head>`,
  },
  {
    id: "a11y",
    section: "advanced",
    title: "Accessibility Basics",
    tagline: "Building pages that work for everyone",
    explanation:
      "Accessible HTML costs almost nothing extra: alt text on every image, labels on every input, and semantic tags instead of divs for everything. aria-label fills the gap when visible text isn't enough for a screen reader to describe an element.",
    demoCode: `<button aria-label="Close this dialog">✕</button>
<img src="https://placehold.co/100x60" alt="Team photo from the last DevClub meetup">
<label for="q">Search</label>
<input type="text" id="q">`,
    starterCode: `<img src="https://placehold.co/100x60" alt="describe this image">
<label for="search">Search</label>
<input type="text" id="search">`,
  },
];

const ASSESSMENT_ITEM = {
  id: "quiz",
  section: "certification",
  title: "Final Assessment",
  tagline: `${PASS_PERCENT}% to pass · certificate on completion`,
};

const SIDEBAR_ITEMS = [...TOPICS, ASSESSMENT_ITEM];

const QUIZ_QUESTIONS = [
  { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language", "Home Tool Markup Language"], correct: 0 },
  { q: "Which tag defines the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], correct: 2 },
  { q: "Which tag is used to define a paragraph?", options: ["<para>", "<p>", "<text>", "<pg>"], correct: 1 },
  { q: "Which attribute provides alternate text for an image?", options: ["title", "alt", "src", "desc"], correct: 1 },
  { q: "Which tag creates a hyperlink?", options: ["<link>", "<href>", "<a>", "<nav>"], correct: 2 },
  { q: "Which attribute of <a> sets the link's destination?", options: ["src", "href", "link", "target"], correct: 1 },
  { q: "Which tag creates an unordered (bulleted) list?", options: ["<ol>", "<list>", "<ul>", "<li>"], correct: 2 },
  { q: "Which tag defines a table row?", options: ["<td>", "<tr>", "<th>", "<row>"], correct: 1 },
  { q: "Which tag defines a table header cell?", options: ["<th>", "<td>", "<head>", "<tr>"], correct: 0 },
  { q: "Which input type creates a password field?", options: ["hidden", "secure", "password", "text"], correct: 2 },
  { q: "Which tag is an inline container with no default styling?", options: ["<div>", "<span>", "<section>", "<block>"], correct: 1 },
  { q: "Which tag is a block-level container with no default styling?", options: ["<div>", "<span>", "<inline>", "<p>"], correct: 0 },
  { q: "Which attribute must be unique to a single element on the page?", options: ["class", "id", "name", "data-id"], correct: 1 },
  { q: "Which attribute can be applied to many elements at once for shared styling?", options: ["id", "class", "unique", "style-group"], correct: 1 },
  { q: "Which HTML5 tag represents the main content of a page?", options: ["<content>", "<body>", "<main>", "<primary>"], correct: 2 },
  { q: "Which tag is used for a group of navigation links?", options: ["<nav>", "<links>", "<menu>", "<route>"], correct: 0 },
  { q: "Which tag represents independent, self-contained content?", options: ["<section>", "<article>", "<div>", "<block>"], correct: 1 },
  { q: "Which tag defines a page or section footer?", options: ["<bottom>", "<end>", "<footer>", "<foot>"], correct: 2 },
  { q: "Which meta tag correctly sets the character encoding?", options: ["<meta encoding=\"UTF-8\">", "<meta charset=\"UTF-8\">", "<meta chars=\"UTF-8\">", "<charset>UTF-8</charset>"], correct: 1 },
  { q: "Which tag embeds a video directly on the page?", options: ["<media>", "<embed>", "<video>", "<movie>"], correct: 2 },
  { q: "What does the 'controls' attribute add to a <video> tag?", options: ["Subtitles", "Play/pause/volume controls", "A download button", "Autoplay"], correct: 1 },
  { q: "Which tag inserts a single line break?", options: ["<break>", "<lb>", "<br>", "<newline>"], correct: 2 },
  { q: "Which tag draws a horizontal divider line?", options: ["<line>", "<hr>", "<divider>", "<rule>"], correct: 1 },
  { q: "How do you make a link open in a new browser tab?", options: ["target=\"_blank\"", "new=\"tab\"", "open=\"new\"", "rel=\"new_tab\""], correct: 0 },
  { q: "Which tag semantically emphasizes text (usually italic)?", options: ["<i>", "<em>", "<italic>", "<stress>"], correct: 1 },
  { q: "Which tag semantically marks strong importance (usually bold)?", options: ["<b>", "<strong>", "<bold>", "<important>"], correct: 1 },
  { q: "Which <label> attribute links it to a specific input's id?", options: ["target", "for", "ref", "input"], correct: 1 },
  { q: "Which tag creates a dropdown selection list?", options: ["<dropdown>", "<options>", "<select>", "<list>"], correct: 2 },
  { q: "Which tag embeds another full HTML page inside the current page?", options: ["<embed>", "<iframe>", "<frame-in>", "<include>"], correct: 1 },
  { q: "What is the correct HTML5 doctype declaration?", options: ["<!DOCTYPE HTML5>", "<!DOCTYPE html>", "<DOCTYPE html5>", "<!html>"], correct: 1 },
];

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Shuffles question order AND each question's option order (correct index
// is remapped so scoring stays accurate). Called once per mount/retake so
// every refresh and every retake gets a fresh arrangement.
function buildShuffledQuestions() {
  const shuffledQuestions = shuffleArray(QUIZ_QUESTIONS);
  return shuffledQuestions.map((q) => {
    const optionIndices = shuffleArray(q.options.map((_, i) => i));
    const options = optionIndices.map((i) => q.options[i]);
    const correct = optionIndices.indexOf(q.correct);
    return { q: q.q, options, correct };
  });
}

function buildPreviewDoc(bodyCode) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body {
    margin: 0;
    padding: 16px;
    font-family: -apple-system, Segoe UI, Roboto, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.5;
  }
  img { max-width: 100%; }
  table { border-collapse: collapse; }
  th, td { padding: 6px 10px; }
</style>
</head>
<body>
${bodyCode}
</body>
</html>`;
}

export default function LearnHTML() {
  const [screen, setScreen] = useState("intro");
  const [activeId, setActiveId] = useState(TOPICS[0].id);
  const [completed, setCompleted] = useState(new Set([TOPICS[0].id]));
  const [experimentOpen, setExperimentOpen] = useState(false);
  const [code, setCode] = useState(TOPICS[0].starterCode);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Quiz + certificate state
  const [questions, setQuestions] = useState(() => buildShuffledQuestions());
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [certName, setCertName] = useState("");
  const [certGenerated, setCertGenerated] = useState(false);

  const isQuizView = activeId === "quiz";
  const activeTopic = TOPICS.find((t) => t.id === activeId);
  const activeIndex = TOPICS.findIndex((t) => t.id === activeId);
  const allTopicsDone = TOPICS.every((t) => completed.has(t.id));
  const quizPassed =
    quizSubmitted && Math.round((quizScore / questions.length) * 100) >= PASS_PERCENT;

  function selectTopic(id) {
    setActiveId(id);
    setMobileNavOpen(false);
    if (id !== "quiz") {
      const topic = TOPICS.find((t) => t.id === id);
      setCode(topic.starterCode);
      setCompleted((prev) => new Set(prev).add(id));
    }
  }

  function goNext() {
    if (activeIndex < TOPICS.length - 1) {
      selectTopic(TOPICS[activeIndex + 1].id);
    } else {
      selectTopic("quiz");
    }
  }

  function openExperiment() {
    setExperimentOpen(true);
  }

  function resetCode() {
    setCode(activeTopic.starterCode);
  }

  function answerQuestion(qIndex, optionIndex) {
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  }

  function submitQuiz() {
    let score = 0;
    questions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) score += 1;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  }

  function retakeQuiz() {
    setQuestions(buildShuffledQuestions());
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setCertGenerated(false);
  }

  const progress = Math.round((completed.size / TOPICS.length) * 100);

  return (
    <div style={styles.app}>
      <style>{globalCss}</style>

      {screen === "intro" ? (
        <IntroScreen onStart={() => setScreen("app")} />
      ) : (
        <div style={styles.shell} className="lu-shell">
          <MobileTopBar
            title={isQuizView ? "Final Assessment" : activeTopic.title}
            onMenuClick={() => setMobileNavOpen(true)}
          />
          {mobileNavOpen && (
            <div style={styles.backdrop} className="lu-backdrop" onClick={() => setMobileNavOpen(false)} />
          )}
          <Sidebar
            activeId={activeId}
            completed={completed}
            onSelect={selectTopic}
            progress={progress}
            quizPassed={quizPassed}
            allTopicsDone={allTopicsDone}
            mobileOpen={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />
          {isQuizView ? (
            <QuizPanel
              questions={questions}
              answers={quizAnswers}
              onAnswer={answerQuestion}
              submitted={quizSubmitted}
              score={quizScore}
              passed={quizPassed}
              onSubmit={submitQuiz}
              onRetake={retakeQuiz}
              certName={certName}
              setCertName={setCertName}
              certGenerated={certGenerated}
              setCertGenerated={setCertGenerated}
            />
          ) : (
            <MainPanel
              topic={activeTopic}
              index={activeIndex}
              onOpenExperiment={openExperiment}
              onNext={goNext}
              isLast={activeIndex === TOPICS.length - 1}
            />
          )}
        </div>
      )}

      {experimentOpen && !isQuizView && (
        <Experiment
          topic={activeTopic}
          code={code}
          setCode={setCode}
          onReset={resetCode}
          onClose={() => setExperimentOpen(false)}
        />
      )}
    </div>
  );
}

function IntroScreen({ onStart }) {
  return (
    <div style={styles.intro}>
      <div style={styles.introGlow} />
      <div style={styles.introContent}>
        <div style={styles.introEyebrow}>
          <Terminal size={14} />
          <span>DEVCLUB · LEVEL UP 2.0</span>
        </div>
        <h1 style={styles.introTitle}>
          Let's learn <span style={styles.introAccent}>HTML</span>.
        </h1>
        <p style={styles.introSub}>
          14 topics. Short explanations, live demos, and a real code
          playground for every single one. No lectures — just you, the tags,
          and the instant feedback loop.
        </p>
        <button style={styles.introButton} onClick={onStart}>
          Get Started <ChevronRight size={18} />
        </button>
        <div style={styles.introFooter}>
          Built by DevClub for the Level Up program
        </div>
      </div>
    </div>
  );
}

function MobileTopBar({ title, onMenuClick }) {
  return (
    <div style={styles.mobileTopBar} className="lu-mobile-topbar">
      <button style={styles.mobileMenuButton} onClick={onMenuClick} aria-label="Open topic menu">
        <Menu size={20} />
      </button>
      <span style={styles.mobileTopBarTitle}>{title}</span>
      <span style={{ width: 36 }} />
    </div>
  );
}

function Sidebar({
  activeId,
  completed,
  onSelect,
  progress,
  quizPassed,
  allTopicsDone,
  mobileOpen,
  onClose,
}) {
  return (
    <aside
      style={styles.sidebar}
      className={`lu-sidebar${mobileOpen ? " lu-sidebar-open" : ""}`}
    >
      <div style={styles.sidebarHeader}>
        <div style={styles.sidebarTitleRow}>
          <Code2 size={16} color="#22d3ee" />
          <span style={styles.sidebarTitle}>learn-html/</span>
          <button
            style={styles.mobileCloseButton}
            className="lu-sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
        <div style={styles.progressLabel}>{progress}% explored</div>
      </div>

      <div style={styles.sidebarList}>
        {SECTIONS.map((section) => (
          <div key={section.id} style={{ marginBottom: 18 }}>
            <div style={styles.sectionLabel}>{section.label}</div>
            {SIDEBAR_ITEMS.filter((t) => t.section === section.id).map((topic) => {
              const isActive = topic.id === activeId;
              const isDone = completed.has(topic.id);
              const isQuiz = topic.id === "quiz";
              return (
                <button
                  key={topic.id}
                  onClick={() => onSelect(topic.id)}
                  style={{
                    ...styles.navItem,
                    ...(isActive ? styles.navItemActive : {}),
                    ...(isQuiz && !allTopicsDone ? styles.navItemMuted : {}),
                  }}
                >
                  <span style={styles.navIndex}>
                    {isQuiz ? (
                      <Award size={13} color={quizPassed ? "#facc15" : "#475569"} />
                    ) : isDone && !isActive ? (
                      <Check size={12} color="#34d399" />
                    ) : (
                      String(TOPICS.indexOf(topic) + 1).padStart(2, "0")
                    )}
                  </span>
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}

function MainPanel({ topic, index, onOpenExperiment, onNext, isLast }) {
  return (
    <main style={styles.main} className="lu-main">
      <div style={styles.mainHeader}>
        <div>
          <div style={styles.mainEyebrow}>
            TOPIC {String(index + 1).padStart(2, "0")} / {TOPICS.length}
          </div>
          <h2 style={styles.mainTitle}>{topic.title}</h2>
          <p style={styles.mainTagline}>{topic.tagline}</p>
        </div>
        <button style={styles.experimentButton} onClick={onOpenExperiment}>
          <Play size={14} fill="#0a0e17" />
          Experiment
        </button>
      </div>

      <p style={styles.explanation}>{topic.explanation}</p>

      <div style={styles.demoBlock}>
        <div style={styles.demoLabelRow}>
          <span style={styles.demoLabel}>DEMO</span>
        </div>
        <div style={styles.demoGrid} className="lu-demo-grid">
          <pre style={styles.codeBlock}>
            <code>{topic.demoCode}</code>
          </pre>
          <div style={styles.previewBlock}>
            <div style={styles.previewChrome}>
              <span style={styles.dot} />
              <span style={{ ...styles.dot, background: "#fbbf24" }} />
              <span style={{ ...styles.dot, background: "#34d399" }} />
              <span style={styles.previewUrl}>output</span>
            </div>
            <iframe
              title="demo-preview"
              srcDoc={buildPreviewDoc(topic.demoCode)}
              style={styles.iframe}
              sandbox=""
            />
          </div>
        </div>
      </div>

      <div style={styles.mainFooter}>
        <button style={styles.nextButton} onClick={onNext}>
          {isLast ? "Take the Final Assessment" : "Next Topic"}
          <ChevronRight size={16} />
        </button>
      </div>
    </main>
  );
}

function Experiment({ topic, code, setCode, onReset, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.overlayPanel} className="lu-overlay-panel">
        <div style={styles.overlayHeader}>
          <div style={styles.overlayHeaderLeft}>
            <Terminal size={16} color="#22d3ee" />
            <span style={styles.overlayTitle}>{topic.title} — Playground</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.iconButton} onClick={onReset} title="Reset">
              <RotateCcw size={15} />
            </button>
            <button style={styles.iconButton} onClick={onClose} title="Close">
              <X size={16} />
            </button>
          </div>
        </div>
        <div style={styles.overlayGrid} className="lu-overlay-grid">
          <div style={styles.editorPane}>
            <div style={styles.paneLabel}>YOUR CODE</div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              style={styles.textarea}
            />
          </div>
          <div style={styles.editorPane}>
            <div style={styles.paneLabel}>LIVE OUTPUT</div>
            <div style={styles.livePreviewWrap}>
              <iframe
                title="live-preview"
                srcDoc={buildPreviewDoc(code)}
                style={styles.iframe}
                sandbox=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizPanel({
  questions,
  answers,
  onAnswer,
  submitted,
  score,
  passed,
  onSubmit,
  onRetake,
  certName,
  setCertName,
  certGenerated,
  setCertGenerated,
}) {
  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const percent = Math.round((score / total) * 100);

  if (certGenerated) {
    return (
      <main style={styles.main} className="lu-main">
        <Certificate name={certName} score={score} total={total} percent={percent} />
        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button style={styles.nextButton} onClick={() => window.print()}>
            <Printer size={16} /> Print / Save as PDF
          </button>
          <button style={styles.ghostButton} onClick={() => setCertGenerated(false)}>
            Back to results
          </button>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main style={styles.main} className="lu-main">
        <div style={styles.mainEyebrow}>FINAL ASSESSMENT · RESULTS</div>
        <h2 style={styles.mainTitle}>{passed ? "You passed! 🎉" : "Not quite there yet"}</h2>
        <p style={styles.mainTagline}>
          You scored {score} / {total} ({percent}%) · {PASS_PERCENT}% required to pass
        </p>

        <div style={styles.resultBar}>
          <div
            style={{
              ...styles.resultBarFill,
              width: `${percent}%`,
              background: passed
                ? "linear-gradient(90deg,#22d3ee,#34d399)"
                : "linear-gradient(90deg,#f87171,#fb923c)",
            }}
          />
        </div>

        {passed ? (
          <div style={styles.certForm}>
            <p style={styles.explanation}>
              Enter your name exactly as you'd like it to appear on your certificate.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input
                style={styles.certInput}
                placeholder="Your full name"
                value={certName}
                onChange={(e) => setCertName(e.target.value)}
              />
              <button
                style={{ ...styles.experimentButton, opacity: certName.trim() ? 1 : 0.4 }}
                disabled={!certName.trim()}
                onClick={() => setCertGenerated(true)}
              >
                <Award size={15} /> Generate Certificate
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 24 }}>
            <p style={styles.explanation}>
              Review the topics you're unsure about, then retake the assessment whenever
              you're ready — there's no limit on attempts. Questions reshuffle every retake.
            </p>
            <button style={styles.nextButton} onClick={onRetake}>
              <RotateCcw size={15} /> Retake Assessment
            </button>
          </div>
        )}

        <div style={styles.reviewList}>
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const correct = userAnswer === q.correct;
            return (
              <div key={i} style={styles.reviewItem}>
                <span style={{ color: correct ? "#34d399" : "#f87171" }}>
                  {correct ? "✓" : "✕"}
                </span>
                <div>
                  <div style={styles.reviewQ}>{i + 1}. {q.q}</div>
                  <div style={styles.reviewA}>
                    Correct answer: {q.options[q.correct]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    );
  }

  return (
    <main style={styles.main} className="lu-main">
      <div style={styles.mainEyebrow}>FINAL ASSESSMENT</div>
      <h2 style={styles.mainTitle}>HTML Certification Test</h2>
      <p style={styles.mainTagline}>
        {total} questions · {PASS_PERCENT}% ({Math.ceil((total * PASS_PERCENT) / 100)}/{total}) required to pass · answered {answeredCount}/{total} · order shuffles every attempt
      </p>

      <div style={styles.quizList}>
        {questions.map((q, i) => (
          <div key={i} style={styles.quizCard}>
            <div style={styles.quizQuestion}>
              <span style={styles.quizIndex}>{String(i + 1).padStart(2, "0")}</span>
              {q.q}
            </div>
            <div style={styles.quizOptions}>
              {q.options.map((opt, oi) => {
                const isSelected = answers[i] === oi;
                return (
                  <button
                    key={oi}
                    onClick={() => onAnswer(i, oi)}
                    style={{
                      ...styles.quizOption,
                      ...(isSelected ? styles.quizOptionSelected : {}),
                    }}
                  >
                    <span style={styles.quizRadio}>{isSelected && <span style={styles.quizRadioDot} />}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.mainFooter}>
        <button
          style={{ ...styles.experimentButton, opacity: answeredCount === total ? 1 : 0.4 }}
          disabled={answeredCount !== total}
          onClick={onSubmit}
        >
          Submit Assessment
        </button>
      </div>
    </main>
  );
}

function Certificate({ name, score, total, percent }) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div style={styles.certWrap} className="certificate-print-area">
      <div style={styles.certBorder}>
        <div style={styles.certEyebrow}>
          <Terminal size={14} color="#22d3ee" />
          DEVCLUB · LEVEL UP 2.0
        </div>
        <div style={styles.certHeading}>Certificate of Completion</div>
        <div style={styles.certSub}>This certifies that</div>
        <div style={styles.certName}>{name}</div>
        <div style={styles.certSub}>
          has successfully completed the <strong>HTML</strong> module of the DevClub
          Level Up 2.0 program, passing the final assessment with a score of{" "}
          <strong>{score}/{total} ({percent}%)</strong>.
        </div>
        <div style={styles.certFooterRow}>
          <div style={styles.certSignBlock}>
            <div style={styles.certSignLine} />
            <div style={styles.certSignLabel}>President, DevClub</div>
          </div>
          <div style={styles.certSeal}>
            <Award size={30} color="#0a0e17" />
          </div>
          <div style={styles.certSignBlock}>
            <div style={styles.certSignLine} />
            <div style={styles.certSignLabel}>{today}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   STYLES
--------------------------------------------------------- */

const globalCss = `
  * { box-sizing: border-box; }
  ::selection { background: rgba(34, 211, 238, 0.3); }
  button { font-family: inherit; cursor: pointer; }
  textarea:focus, button:focus-visible {
    outline: 2px solid #22d3ee;
    outline-offset: 2px;
  }
  @media (max-width: 900px) {
    .lu-shell { flex-direction: column !important; }
    .lu-mobile-topbar { display: flex !important; }
    .lu-sidebar-close { display: flex !important; }
    .lu-sidebar {
      position: fixed !important;
      top: 0 !important;
      left: -100% !important;
      height: 100vh !important;
      width: 82% !important;
      max-width: 320px !important;
      max-height: none !important;
      background: #0f1521 !important;
      z-index: 70 !important;
      transition: left 0.28s ease !important;
      box-shadow: 0 0 40px rgba(0,0,0,0.5) !important;
    }
    .lu-sidebar-open {
      left: 0 !important;
    }
    .lu-backdrop { display: block !important; }
    .lu-main { padding: 20px 18px !important; }
    .lu-demo-grid { grid-template-columns: 1fr !important; }
    .lu-overlay-grid { grid-template-columns: 1fr !important; }
    .lu-overlay-panel { height: 94vh !important; width: 100% !important; }
  }
  @media (max-width: 520px) {
    .lu-main { padding: 16px 14px !important; }
  }
  @media print {
    body * { visibility: hidden; }
    .certificate-print-area, .certificate-print-area * { visibility: visible; }
    .certificate-print-area {
      position: absolute; top: 0; left: 0; width: 100%; margin: 0;
    }
  }
`;

const FONT_DISPLAY = "'Space Grotesk', 'Segoe UI', sans-serif";
const FONT_MONO = "'JetBrains Mono', 'Fira Code', monospace";
const FONT_BODY = "'Inter', 'Segoe UI', sans-serif";

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0a0e17",
    color: "#e2e8f0",
    fontFamily: FONT_BODY,
    position: "relative",
  },

  /* Intro */
  intro: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: 24,
  },
  introGlow: {
    position: "absolute",
    top: "-20%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 700,
    height: 700,
    background:
      "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(10,14,23,0) 70%)",
    pointerEvents: "none",
  },
  introContent: {
    position: "relative",
    maxWidth: 560,
    textAlign: "center",
  },
  introEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: FONT_MONO,
    fontSize: 12,
    letterSpacing: 1.5,
    color: "#22d3ee",
    border: "1px solid rgba(34,211,238,0.3)",
    borderRadius: 999,
    padding: "6px 14px",
    marginBottom: 24,
  },
  introTitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: "clamp(36px, 6vw, 56px)",
    fontWeight: 700,
    margin: "0 0 16px",
    lineHeight: 1.1,
  },
  introAccent: {
    color: "#22d3ee",
    textShadow: "0 0 24px rgba(34,211,238,0.5)",
  },
  introSub: {
    fontSize: 16,
    color: "#94a3b8",
    lineHeight: 1.6,
    marginBottom: 32,
  },
  introButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#22d3ee",
    color: "#0a0e17",
    border: "none",
    borderRadius: 10,
    padding: "14px 28px",
    fontSize: 15,
    fontWeight: 700,
    boxShadow: "0 0 30px rgba(34,211,238,0.35)",
  },
  introFooter: {
    marginTop: 40,
    fontFamily: FONT_MONO,
    fontSize: 11,
    color: "#475569",
    letterSpacing: 0.5,
  },

  /* Shell */
  shell: {
    display: "flex",
    minHeight: "100vh",
  },

  /* Sidebar */
  sidebar: {
    width: 260,
    flexShrink: 0,
    borderRight: "1px solid rgba(148,163,184,0.12)",
    background: "rgba(19,26,41,0.5)",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "sticky",
    top: 0,
  },
  mobileTopBar: {
    display: "none",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    borderBottom: "1px solid rgba(148,163,184,0.12)",
    background: "rgba(15,21,33,0.9)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 40,
  },
  mobileMenuButton: {
    background: "rgba(148,163,184,0.1)",
    border: "none",
    borderRadius: 8,
    color: "#e2e8f0",
    padding: 8,
    display: "flex",
  },
  mobileTopBarTitle: {
    fontFamily: FONT_MONO,
    fontSize: 13,
    fontWeight: 600,
    color: "#e2e8f0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "70%",
  },
  mobileCloseButton: {
    display: "none",
    background: "rgba(148,163,184,0.1)",
    border: "none",
    borderRadius: 6,
    color: "#94a3b8",
    padding: 6,
    marginLeft: "auto",
  },
  backdrop: {
    display: "none",
    position: "fixed",
    inset: 0,
    background: "rgba(5,7,12,0.6)",
    zIndex: 65,
  },
  sidebarHeader: {
    padding: "20px 18px 16px",
    borderBottom: "1px solid rgba(148,163,184,0.1)",
  },
  sidebarTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sidebarTitle: {
    fontFamily: FONT_MONO,
    fontSize: 13,
    color: "#e2e8f0",
    fontWeight: 600,
  },
  progressTrack: {
    height: 4,
    background: "rgba(148,163,184,0.15)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #22d3ee, #34d399)",
    borderRadius: 4,
    transition: "width 0.3s ease",
  },
  progressLabel: {
    fontFamily: FONT_MONO,
    fontSize: 10,
    color: "#64748b",
    marginTop: 6,
  },
  sidebarList: {
    overflowY: "auto",
    padding: "16px 12px",
    flex: 1,
  },
  sectionLabel: {
    fontFamily: FONT_MONO,
    fontSize: 10,
    letterSpacing: 1.2,
    color: "#475569",
    padding: "0 10px",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  navItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "transparent",
    border: "none",
    borderLeft: "2px solid transparent",
    color: "#94a3b8",
    textAlign: "left",
    padding: "8px 10px",
    fontSize: 13.5,
    borderRadius: 6,
    marginBottom: 2,
  },
  navItemActive: {
    background: "rgba(34,211,238,0.08)",
    borderLeft: "2px solid #22d3ee",
    color: "#e2e8f0",
    fontWeight: 600,
  },
  navItemMuted: {
    opacity: 0.55,
  },
  navIndex: {
    fontFamily: FONT_MONO,
    fontSize: 10,
    color: "#475569",
    width: 16,
    display: "inline-flex",
    justifyContent: "center",
  },

  /* Main panel */
  main: {
    flex: 1,
    padding: "36px 48px",
    maxWidth: 980,
  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 20,
    flexWrap: "wrap",
  },
  mainEyebrow: {
    fontFamily: FONT_MONO,
    fontSize: 11,
    color: "#22d3ee",
    letterSpacing: 1,
    marginBottom: 8,
  },
  mainTitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: 32,
    fontWeight: 700,
    margin: "0 0 6px",
  },
  mainTagline: {
    color: "#64748b",
    fontSize: 15,
    margin: 0,
  },
  experimentButton: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#22d3ee",
    color: "#0a0e17",
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    fontWeight: 700,
    fontSize: 13.5,
    boxShadow: "0 0 20px rgba(34,211,238,0.3)",
    flexShrink: 0,
  },
  explanation: {
    fontSize: 15.5,
    lineHeight: 1.7,
    color: "#cbd5e1",
    maxWidth: 720,
    marginBottom: 28,
  },
  demoBlock: {
    border: "1px solid rgba(148,163,184,0.15)",
    borderRadius: 14,
    background: "rgba(19,26,41,0.4)",
    backdropFilter: "blur(8px)",
    padding: 4,
  },
  demoLabelRow: {
    padding: "12px 16px 4px",
  },
  demoLabel: {
    fontFamily: FONT_MONO,
    fontSize: 10,
    letterSpacing: 1.5,
    color: "#475569",
  },
  demoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    padding: 12,
  },
  codeBlock: {
    fontFamily: FONT_MONO,
    fontSize: 13.5,
    lineHeight: 1.7,
    color: "#a5f3fc",
    background: "#0a0e17",
    borderRadius: 10,
    padding: 20,
    overflowX: "auto",
    margin: 0,
    border: "1px solid rgba(148,163,184,0.1)",
    minHeight: 320,
  },
  previewBlock: {
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid rgba(148,163,184,0.1)",
    minHeight: 320,
    display: "flex",
    flexDirection: "column",
  },
  previewChrome: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#1e293b",
    padding: "8px 10px",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#f87171",
    display: "inline-block",
  },
  previewUrl: {
    marginLeft: 8,
    fontFamily: FONT_MONO,
    fontSize: 10,
    color: "#64748b",
  },
  iframe: {
    width: "100%",
    flex: 1,
    border: "none",
    background: "#fff",
    minHeight: 280,
  },
  mainFooter: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 28,
  },
  nextButton: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "transparent",
    border: "1px solid rgba(34,211,238,0.4)",
    color: "#22d3ee",
    borderRadius: 8,
    padding: "10px 20px",
    fontWeight: 600,
    fontSize: 13.5,
  },

  /* Experiment overlay */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(5,7,12,0.75)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    padding: 24,
  },
  overlayPanel: {
    width: "min(1100px, 100%)",
    height: "min(680px, 90vh)",
    background: "#0f1521",
    border: "1px solid rgba(148,163,184,0.15)",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 0 60px rgba(34,211,238,0.1)",
  },
  overlayHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    borderBottom: "1px solid rgba(148,163,184,0.12)",
  },
  overlayHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  overlayTitle: {
    fontFamily: FONT_MONO,
    fontSize: 13,
    fontWeight: 600,
  },
  iconButton: {
    background: "rgba(148,163,184,0.1)",
    border: "none",
    borderRadius: 6,
    color: "#94a3b8",
    padding: 7,
    display: "flex",
  },
  overlayGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 1,
    background: "rgba(148,163,184,0.12)",
    overflow: "hidden",
  },
  editorPane: {
    background: "#0f1521",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  paneLabel: {
    fontFamily: FONT_MONO,
    fontSize: 10,
    letterSpacing: 1.2,
    color: "#475569",
    padding: "10px 14px",
    borderBottom: "1px solid rgba(148,163,184,0.08)",
  },
  textarea: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "#e2e8f0",
    fontFamily: FONT_MONO,
    fontSize: 13,
    lineHeight: 1.6,
    padding: 16,
    resize: "none",
  },
  livePreviewWrap: {
    flex: 1,
    display: "flex",
  },

  /* Quiz */
  ghostButton: {
    background: "transparent",
    border: "1px solid rgba(148,163,184,0.25)",
    color: "#94a3b8",
    borderRadius: 8,
    padding: "10px 20px",
    fontWeight: 600,
    fontSize: 13.5,
  },
  resultBar: {
    height: 8,
    borderRadius: 6,
    background: "rgba(148,163,184,0.15)",
    overflow: "hidden",
    margin: "18px 0 24px",
    maxWidth: 480,
  },
  resultBarFill: {
    height: "100%",
    borderRadius: 6,
    transition: "width 0.4s ease",
  },
  certForm: {
    background: "rgba(19,26,41,0.5)",
    border: "1px solid rgba(148,163,184,0.15)",
    borderRadius: 12,
    padding: 20,
    maxWidth: 560,
    marginBottom: 32,
  },
  certInput: {
    flex: 1,
    minWidth: 220,
    background: "#0a0e17",
    border: "1px solid rgba(148,163,184,0.25)",
    borderRadius: 8,
    padding: "11px 14px",
    color: "#e2e8f0",
    fontSize: 14,
  },
  reviewList: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: 720,
  },
  reviewItem: {
    display: "flex",
    gap: 12,
    fontSize: 13.5,
    padding: "10px 12px",
    borderRadius: 8,
    background: "rgba(19,26,41,0.35)",
  },
  reviewQ: { color: "#cbd5e1", marginBottom: 2 },
  reviewA: { color: "#64748b", fontSize: 12.5 },

  quizList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginTop: 8,
    marginBottom: 24,
  },
  quizCard: {
    border: "1px solid rgba(148,163,184,0.15)",
    borderRadius: 12,
    background: "rgba(19,26,41,0.4)",
    padding: 16,
  },
  quizQuestion: {
    display: "flex",
    gap: 10,
    fontSize: 14.5,
    color: "#e2e8f0",
    marginBottom: 12,
    fontWeight: 600,
  },
  quizIndex: {
    fontFamily: FONT_MONO,
    fontSize: 12,
    color: "#22d3ee",
    flexShrink: 0,
  },
  quizOptions: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  quizOption: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textAlign: "left",
    background: "transparent",
    border: "1px solid rgba(148,163,184,0.15)",
    borderRadius: 8,
    padding: "9px 12px",
    color: "#94a3b8",
    fontSize: 13.5,
  },
  quizOptionSelected: {
    borderColor: "#22d3ee",
    background: "rgba(34,211,238,0.08)",
    color: "#e2e8f0",
  },
  quizRadio: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "1.5px solid #475569",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  quizRadioDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#22d3ee",
  },

  /* Certificate */
  certWrap: {
    background:
      "radial-gradient(circle at top, rgba(34,211,238,0.08), transparent 60%)",
    padding: "10px 0 20px",
  },
  certBorder: {
    maxWidth: 720,
    margin: "0 auto",
    border: "1.5px solid rgba(34,211,238,0.4)",
    outline: "1px solid rgba(148,163,184,0.15)",
    outlineOffset: 6,
    borderRadius: 16,
    padding: "40px 44px",
    textAlign: "center",
    background: "rgba(19,26,41,0.6)",
  },
  certEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: FONT_MONO,
    fontSize: 11,
    letterSpacing: 1.5,
    color: "#22d3ee",
    marginBottom: 18,
  },
  certHeading: {
    fontFamily: FONT_DISPLAY,
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 18,
  },
  certSub: {
    color: "#94a3b8",
    fontSize: 14.5,
    lineHeight: 1.7,
    maxWidth: 520,
    margin: "0 auto 10px",
  },
  certName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 30,
    color: "#22d3ee",
    textShadow: "0 0 24px rgba(34,211,238,0.4)",
    margin: "10px 0 18px",
    fontWeight: 700,
  },
  certFooterRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    marginTop: 36,
  },
  certSignBlock: {
    textAlign: "center",
  },
  certSignLine: {
    width: 130,
    borderTop: "1px solid rgba(148,163,184,0.3)",
    marginBottom: 6,
  },
  certSignLabel: {
    fontFamily: FONT_MONO,
    fontSize: 11,
    color: "#64748b",
  },
  certSeal: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#22d3ee,#34d399)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
};