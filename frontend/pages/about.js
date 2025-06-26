export default function About() {
  return (
    <div style={pageStyle}>
      <h1>About Chainsaw Price Hunter</h1>
      <p>
        Chainsaw Price Hunter is your go-to app for finding the best chainsaw deals across online marketplaces.
        We aggregate listings from multiple sources to help you make smarter buying decisions faster.
      </p>
      <p>
        Built for reliability and speed, our app filters listings by region, price, brand, and more —
        making it easy to find what you’re looking for, whether you're a weekend warrior or a seasoned pro.
      </p>
    </div>
  );
}

const pageStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  fontFamily: "sans-serif",
  lineHeight: "1.6",
};
