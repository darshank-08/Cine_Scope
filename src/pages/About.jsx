import styles from "./about.module.css";

const About = () => {
  return (
    <section className={styles.page}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>About CeneScope</h1>
          <p className={styles.text}>
            CeneScope is your cinematic companion — a place where movie lovers
            discover, discuss, and save their all-time favorites. Whether you're
            hunting for hidden gems or revisiting classics, CeneScope keeps your
            passion for film alive.
          </p>

          <p className={styles.text}>
            We curate data from reliable movie sources, blending artistry and technology
            to create an immersive movie-tracking experience that feels as good as the
            big-screen magic itself.
          </p>

          <div className={styles.signature}>🎥 Crafted with love for cinema. By a Cinephile ♥</div>
        </div>
      </div>
    </section>
  );
};

export default About;