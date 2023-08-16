import React from 'react'
import github from "../../images/pngwing.com.png"
import linkedin from "../../images/pngwing.com2.png"
import "./About.css"

function About() {
  return (
    <div className='about-container'>


          <div className='about-square'>
              <div className='icon-container'>
                  <a href="https://github.com/MattDavid99" target="_blank" rel="noopener noreferrer">
                    <div className='github'><img className="github-img" src={github} alt='Github Link'/></div>
                  </a>
                  <a href="https://www.linkedin.com/in/matthew-david-b58a49189/" target="_blank" rel="noopener noreferrer">
                    <div className='linkedin'><img className="linkedin-img" src={linkedin} alt='LinkedIn Link'/></div>
                  </a>
              </div>

              <div className='about-info'>
                <p className='about-info-p'>Hi, I'm Matthew, a 24-year-old software engineer with a passion for crafting innovative and user-friendly software. My professional journey began in college, where I was initially pursuing a degree in finance. While I was drawn to the financial aspects of the field, I found myself yearning for greater control and influence over the products I would manage. This curiosity led me to the exciting world of software engineering. As I delved into web development fundamentals, I became captivated. Today, I'm a full-stack engineer who's driven by my love for what I do, and I eagerly look forward to the future and where this path will lead me. Feel free to connect with me on LinkedIn and GitHub!</p>
              </div>
          </div>

    </div>
  );
}

export default About
