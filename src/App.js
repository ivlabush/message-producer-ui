import styles from './App.css';

const App = () => {
    return (
        <div className="App">
            <span className={styles.span}>Paste message here</span>
            <textarea rows='3' cols='15' id='textarea'/>
            <button className={styles.button}
                    onClick={() => OnClick(document.getElementById('textarea').value)}>Send
            </button>
        </div>
    );
}

const OnClick = (message) => {
    const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain'
    }
    const body = message != null ? {message: message} : {message: "Empty message"}
    fetch('http://localhost:12000/produce', {
        mode: 'cors',
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    }).then(response => {
        if (response.ok) {
            console.log('Successfully sent message')
        } else {
            response.json().then((error) => {
                const e = Error('Something went wrong')
                e.data = error
                throw e
            })
        }
    })
}

export default App;
