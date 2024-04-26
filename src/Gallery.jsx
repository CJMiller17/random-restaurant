import caterpillar from "/src/hungy-logo.png";
import one from "/src/1.png";
import two from "/src/2.png";
import three from "/src/3.png";
import four from "/src/4.png";
import five from "/src/5.png";
import six from "/src/6.png";

function Gallery() {
  return (
    <div className="p-5">
      <h1>Cool Looking Photos</h1>
      <h2>Some are sent in from customers</h2>
      <p>Add your photo if you are so inclined.</p>
      <br />
      <img
        className="object-fit-scale border rounded p-2 me-5 mb-3"
        src={one}
        height={300}
      />
      <img
        className="object-fit-scale border rounded p-2 me-5 mb-3"
        src={six}
        height={300}
      />
      <img
        className="object-fit-scale border rounded p-2 me-5 mb-3"
        src={three}
        height={300}
      />
      <img
        className="object-fit-scale border rounded p-2 me-5 mb-3"
        src={four}
        height={300}
      />
      <img
        className="object-fit-scale border rounded p-2 me-5 mb-3"
        src={five}
        height={300}
      />
      <img
        className="object-fit-scale border rounded p-2 me-5 mb-3"
        src={two}
        height={300}
      />
    </div>
  );
}

export default Gallery;
