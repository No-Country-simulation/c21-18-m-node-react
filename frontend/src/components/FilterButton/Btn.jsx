import "./Btn.css"


const Btn = ({text, onClick}) => {
  console.log(text)
  return (
    <span onClick={onClick} style={{cursor: "pointer"}}>{text}</span>
  )
}

export default Btn