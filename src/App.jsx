import NavBar from "./Navbar"

const Title = () => {
  return (
    <h1>
      Hello World!
    </h1>
  )
}

function App() {
  return (
    <div className="p-5">
      <Navbar />
      <Title />
    </div>
  )
}


export default App
