import React, {useState, useEffect} from "react";
import "./SplashPage.css";

const SplashPage = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  
  useEffect(async () => {
    const res = await fetch("/api/quotes/")
    const data = await res.json()
    setQuote(data.quote);
    setAuthor(data.author);
  }, []);

  return (
    <div className="splash-container">
      <div className="splash-description">
        <pre>Journal.   Draw.   Repeat.</pre>
      </div>
      <div className="splash-quote-container">
        <div className="splash-quote">{quote}</div>
        <div className="splash-author">— {author} —</div>
      </div>
    </div>
  )
};

export default SplashPage;