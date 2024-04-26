const Title = () => {
  return (
    <>
      <div className="container">
        <h1 className="text-center">The Chompy Cocoon Café</h1>
        <h2 className="text-center mb-5">We have a bug problem</h2>
        <p className="text-center text-decoration-underline mb-4">
          {" "}
          Located At{" "}
        </p>
        <p className="text-center mb-2">5982 Metamorphosis Meadows</p>
        <p className="text-center mb-5">Gardenia Grove, AL</p>
        <p className="text-center text-decoration-underline mb-4">
          {" "}
          Hours of Operation{" "}
        </p>
        <p className="text-center mb-2">Monday: 8am - 5pm</p>
        <p className="text-center mb-2">Tuesday: 8am - 5pm</p>
        <p className="text-center mb-2">Wednesday: 8am - 5pm</p>
        <p className="text-center mb-2">Thursday: 8am - 5pm</p>
        <p className="text-center mb-2">Friday: 8am - 7pm</p>
        <p className="text-center mb-2">Saturday: 10am - 4pm</p>
        <p className="text-center mb-2">Sunday: Closed cuz' we be flyin'</p>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="p-5">
      <Title />
    </div>
  )
}


export default App
