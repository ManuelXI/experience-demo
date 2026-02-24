import { useRef, useEffect } from 'react';
import { getExperience, embed, unmount } from '@monterosa/sdk-launcher-kit';
import './App.css';

interface MonterosaExperienceProps {
  eventId: string;
}

function MonterosaExperience({ eventId }: MonterosaExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isCancelled = false;

    try {
      const experience = getExperience({ eventId });
      if (!isCancelled) {
        embed(experience, container);
      }
    } catch (error) {
      console.error('Failed to embed Monterosa experience', { eventId, error });
    }

    return () => {
      isCancelled = true;
      try {
        if (container) {
          unmount(container);
        }
      } catch (error) {
        console.error('Failed to unmount Monterosa experience', { eventId, error });
      }
    };
  }, [eventId]);

  return (
    <div
      className="monterosa-experience-container"
      ref={containerRef}
      style={{ width: '100%', height: 600 }}
    />
  );
}

function App() {
  return (
    <div className="album-page">
      <header className="album-hero">
        <div className="album-hero-content">
          <div className="album-artwork-container">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Baby_Keem_-_Casino.png/250px-Baby_Keem_-_Casino.png" 
              alt="Casino Album Cover" 
              className="album-artwork"
            />
          </div>
          <div className="album-info">
            <p className="album-tagline">PGLang × Columbia</p>
            <h1 className="album-title">Ca$ino</h1>
            <h2 className="artist-name">Baby Keem</h2>
            <p className="album-meta">
              Released February 20, 2026
            </p>
            <p className="album-description">
              Baby Keem's highly anticipated second studio album—five years after The Melodic Blue. 
              Ca$ino leans into a Las Vegas mood: dim lights, high stakes, and no security. 
              Features from Kendrick Lamar, Too Short, Momo Boyd, and Che Ecru. 
              Roll the dice and see what hits.
            </p>
          </div>
        </div>
      </header>

      {/* Tracklist Section */}
      <section className="tracklist-section">
        <span className="section-badge">The Set</span>
        <h2 className="section-title">Tracklist</h2>
        <p className="section-intro">
          11 tracks. No skips. From the opener "No Security" through "Good Flirts" with Kendrick and Momo Boyd, 
          to the closer "No Blame." House money only.
        </p>
        <div className="tracklist">
          <div className="track">1. No Security</div>
          <div className="track">2. Casino</div>
          <div className="track">3. Birds & the Bees</div>
          <div className="track">4. Good Flirts (feat. Kendrick Lamar & Momo Boyd)</div>
          <div className="track">5. House Money</div>
          <div className="track">6. I am not a Lyricist</div>
          <div className="track">7. Sex Appeal (feat. Too Short)</div>
          <div className="track">8. Highway 95 Pt. 2</div>
          <div className="track">9. Circus Circus Freestyle</div>
          <div className="track">10. Dramatic Girl (feat. Che Ecru)</div>
          <div className="track">11. No Blame</div>
        </div>
      </section>

      <div className="experiences-intro">
        <p>
          The house is open. Vote, rate, predict, and test yourself—then see how your picks compare to the rest of the room.
        </p>
      </div>

      {/* Experience 1: Track Ranking - Podium Predictor */}
      {/* 
        EXPERIENCE TYPE: Podium Predictor
        DESCRIPTION: Fans rank their top 3 favorite tracks from the album. 
        This will reveal the community's consensus on the best songs after voting.
        ELEMENTS: 1x Podium Predictor (Top 3 tracks)
        USE CASE: Post-release engagement to see which tracks resonate most with fans
      */}
      <section className="experience-section experience-section--gold">
        <span className="section-badge">Vote</span>
        <h2 className="section-title">Rank Your Top 3 Tracks</h2>
        <p className="section-intro">
          Everybody's got a different hand. Which songs from Ca$ino hit the hardest for you? 
          Rank your top three—then see how the room votes. We'll reveal the house favorites.
        </p>
        <p className="experience-description">
          Which songs from Ca$ino hit the hardest? Rank your top 3 favorites and see how the community votes.
        </p>
        <MonterosaExperience 
          eventId="f746ca56-c9ee-40d4-8a84-ec238df18108" 
        />
      </section>

      {/* Experience 2: Album Rating - Image Rater or Poll */}
      {/* 
        EXPERIENCE TYPE: Image Rater or Poll
        DESCRIPTION: Rate the overall album on a scale (e.g., 1-10) or vote on overall quality.
        This captures fan sentiment about the album as a whole.
        ELEMENTS: 1x Image Rater (album cover) OR 1x Poll (rating options)
        USE CASE: Quick sentiment check on the album release
      */}
      <section className="experience-section">
        <span className="section-badge">Rate</span>
        <h2 className="section-title">Rate the Album</h2>
        <p className="section-intro">
          The table's open. How does Ca$ino stack up for you? Drop your rating and see where the crowd stands— 
          from "all in" to "fold."
        </p>
        <p className="experience-description">
          How would you rate Ca$ino overall? Share your thoughts on Baby Keem's latest work.
        </p>
        <MonterosaExperience
          eventId="8a7cdc83-59ea-4d5b-8ea8-c1dafc9c8fb0" 
        />
      </section>

      {/* Experience 3: Favorite Track Poll - Category Vote or Poll */}
      {/* 
        EXPERIENCE TYPE: Category Vote or Poll
        DESCRIPTION: Vote for your single favorite track from the album. 
        Can be structured as a poll with all tracks as options, or category-based voting.
        ELEMENTS: 1x Poll (all tracks as options) OR 1x Category Vote
        USE CASE: Identify the standout track according to the fanbase
      */}
      <section className="experience-section experience-section--red">
        <span className="section-badge">One Pick</span>
        <h2 className="section-title">What's Your Favorite Track?</h2>
        <p className="section-intro">
          If you had to bet on one song—the one you're playing on repeat—which is it? 
          No Security, Good Flirts, Circus Circus Freestyle? Make your pick.
        </p>
        <p className="experience-description">
          Pick your absolute favorite song from Ca$ino. Which track are you playing on repeat?
        </p>
        <MonterosaExperience
          eventId="41ec15d5-7e1c-4e1f-8a88-8d4bab5e556f" 
        />
      </section>

      {/* Experience 4: Album Trivia - Multiple Choice Trivia */}
      {/* 
        EXPERIENCE TYPE: Trivia (Multiple Choice)
        DESCRIPTION: Test fans' knowledge about the album, its production, features, and background.
        Questions about release date, featured artists, producers, samples, etc.
        ELEMENTS: 1x Quiz wrapper with Multiple Choice Trivia questions
        USE CASE: Engage superfans and reward deep knowledge of the album
      */}
      <section className="experience-section">
        <span className="section-badge">Trivia</span>
        <h2 className="section-title">Test Your Knowledge</h2>
        <p className="section-intro">
          Think you know every sample, feature, and move behind Ca$ino? 
          Prove you're a real fan—answer the questions below and see how you stack up.
        </p>
        <p className="experience-description">
          How well do you know Ca$ino? Prove you're a true fan with this album trivia.
        </p>
        <MonterosaExperience
          eventId="28296454-874c-4d93-9636-dbecba3260af" 
        />
      </section>

      {/* Experience 5: Chart Performance Prediction - Number Predictor */}
      {/* 
        EXPERIENCE TYPE: Number Predictor
        DESCRIPTION: Predict where the album will chart on the Billboard 200 in its first week.
        Fans can input their prediction for the chart position (e.g., 1-200).
        ELEMENTS: 1x Number Predictor (Billboard 200 position)
        USE CASE: Create anticipation and engagement around chart performance, reveal actual position later
      */}
      <section className="experience-section experience-section--gold">
        <span className="section-badge">Predict</span>
        <h2 className="section-title">Predict the Chart Position</h2>
        <p className="section-intro">
          Where does Ca$ino land on the Billboard 200 in week one? 
          Place your bet—we'll reveal the real number when it's in. High risk, high reward.
        </p>
        <p className="experience-description">
          Where do you think Ca$ino will debut on the Billboard 200? Make your prediction!
        </p>
        <MonterosaExperience
          eventId="0d12b977-bcdd-4950-9200-d8fa91d5cb3e" 
        />
      </section>

      {/* Experience 6: Feature Ranking - Podium Predictor */}
      {/* 
        EXPERIENCE TYPE: Podium Predictor
        DESCRIPTION: Rank the featured artists/collaborations (Kendrick Lamar, Too Short, Momo Boyd, Che Ecru).
        See which features fans think delivered the best verses.
        ELEMENTS: 1x Podium Predictor (Top 3 features)
        USE CASE: Compare and celebrate the different collaborations on the album
      */}
      {/* <section className="experience-section">
        <span className="section-badge">Features</span>
        <h2 className="section-title">Rank the Features</h2>
        <p className="section-intro">
          Kendrick on "Good Flirts," Too Short on "Sex Appeal," Momo Boyd, Che Ecru—every feature brought something. 
          Rank your top three collabs and see who the room favors.
        </p>
        <p className="experience-description">
          Ca$ino features some incredible collaborations. Rank your top 3 favorite features.
        </p>
        <MonterosaExperience 
          eventId="dummy-event-id-feature-ranking" 
        />
      </section> */}
    </div>
  );
}

export default App;
