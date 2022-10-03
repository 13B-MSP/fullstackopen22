const Input = ({ text, value, changeHandler }) =>
    <div>
        {text} <input value={value} onChange={changeHandler}/>
    </div>

const AddNewPerson = (props) =>
    <form onSubmit={props.addPerson}>
        <Input text='name: ' value={props.newName} changeHandler={props.handleNameChange}/>
        <Input text='phone nr.: ' value={props.newPhoneNr} changeHandler={props.handlePhoneNrChange}/>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

export default AddNewPerson