const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {/* TODO Student data goes here! */ /* Task 5 */}
        <strong>{props.major}</strong>
        <p>{props.name.first} is taking {props.numCredits} credits and is {props.fromWisconsin ? "from" : "NOT from"} Wisconsin.</p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map(i => (<li key={i}>{i}</li>))}
        </ul>
    </div>
}

export default Student;