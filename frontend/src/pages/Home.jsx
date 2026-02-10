import heroImg from "../assets/hero.jpg";

export default function Home() {
  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <div className="home-hero">
        <style>
          {`
            .home-hero::before {
              background-image: url(${heroImg});
            }
          `}
        </style>

        <div
          className="home-hero-content"
          style={{
            textAlign: "center",
            color: "white",
            background: "rgba(0,0,0,0.65)",
            padding: "40px",
            borderRadius: "10px"
          }}
        >
          <h4>SHAPE YOUR BODY</h4>

          <h1 style={{ fontSize: "55px", fontWeight: "bold" }}>
            BE <span style={{ color: "#ff512f" }}>STRONG</span>
          </h1>

          <h2 style={{ fontSize: "45px" }}>TRAINING HARD</h2>

          <br />

          <button
            onClick={() =>
              document
                .getElementById("about")
                .scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "linear-gradient(to right, #ff512f, #dd2476)",
              border: "none",
              color: "white",
              padding: "10px 25px",
              fontSize: "18px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            GET INFO
          </button>
        </div>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <div
        id="about"
        style={{
          padding: "60px",
          background: "#111",
          color: "white",
          textAlign: "center"
        }}
      >
        <h2>About Our Gym</h2>
        <p style={{ maxWidth: "700px", margin: "auto", fontSize: "18px" }}>
          Our Gym Management System helps members achieve their fitness goals
          with expert trainers, personalized workout plans, and modern facilities.
          We believe in strength, discipline, and transformation.
        </p>
      </div>

      {/* ===== REVIEWS SECTION ===== */}
      <div
        style={{
          padding: "60px",
          background: "#1c1c1c",
          color: "white",
          textAlign: "center"
        }}
      >
        <h2>Member Reviews</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "20px",
            flexWrap: "wrap"
          }}
        >
          <div style={{ background: "#222", padding: "20px", borderRadius: "8px", width: "250px" }}>
            <p>"Best gym experience ever! Trainers are supportive."</p>
            <strong>- Rahul</strong>
          </div>

          <div style={{ background: "#222", padding: "20px", borderRadius: "8px", width: "250px" }}>
            <p>"Amazing equipment and motivating environment."</p>
            <strong>- Priya</strong>
          </div>

          <div style={{ background: "#222", padding: "20px", borderRadius: "8px", width: "250px" }}>
            <p>"Perfect place to transform your body."</p>
            <strong>- Aman</strong>
          </div>
        </div>
      </div>

      {/* ===== CONTACT SECTION ===== */}
      <div
        style={{
          padding: "60px",
          background: "#111",
          color: "white",
          textAlign: "center"
        }}
      >
        <h2>Contact Us</h2>
        <p>Email: stronggym@gmail.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Location: Navi Mumbai</p>
      </div>

      {/* ===== FOOTER (RESTORED SOCIAL ICONS) ===== */}
      <div
        style={{
          background: "#000",
          color: "white",
          textAlign: "center",
          padding: "25px",
          fontSize: "14px"
        }}
      >
        <p>© 2026 FitnessHub. All Rights Reserved.</p>

        <div style={{ marginTop: "10px" }}>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <i
              className="fab fa-facebook"
              style={{ margin: "0 12px", cursor: "pointer", fontSize: "20px", color: "white" }}
            />
          </a>

          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <i
              className="fab fa-instagram"
              style={{ margin: "0 12px", cursor: "pointer", fontSize: "20px", color: "white" }}
            />
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i
              className="fab fa-twitter"
              style={{ margin: "0 12px", cursor: "pointer", fontSize: "20px", color: "white" }}
            />
          </a>

          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            <i
              className="fab fa-youtube"
              style={{ margin: "0 12px", cursor: "pointer", fontSize: "20px", color: "white" }}
            />
          </a>
        </div>
      </div>

    </div>
  );
}